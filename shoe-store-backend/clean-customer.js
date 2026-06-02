const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

async function main() {
  // Lấy email từ tham số dòng lệnh, mặc định là email của bạn
  const email = process.argv[2] || 'trananhtu25012004@gmail.com';
  console.log(`Bắt đầu dọn dẹp dữ liệu của tài khoản: ${email}...`);

  // Đọc file .env để lấy DATABASE_URL tự động
  let databaseUrl = 'postgres://postgres:123@localhost/medusa-shoe-store-backend';
  try {
    const envPath = path.join(__dirname, '.env');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      const match = envContent.match(/^DATABASE_URL=(.+)$/m);
      if (match && match[1]) {
        databaseUrl = match[1].trim();
      }
    }
  } catch (err) {
    console.log('Không thể đọc file .env, sử dụng kết nối mặc định.');
  }

  const client = new Client({
    connectionString: databaseUrl,
  });

  try {
    await client.connect();
    console.log('Kết nối cơ sở dữ liệu thành công.');

    // Bắt đầu transaction
    await client.query('BEGIN');

    // 1. Xóa thông tin email_verification
    const deleteVerification = `
      DELETE FROM email_verification 
      WHERE customer_id IN (SELECT id FROM customer WHERE email = $1);
    `;
    const res1 = await client.query(deleteVerification, [email]);
    console.log(`- Đã xóa ${res1.rowCount} bản ghi trong bảng email_verification.`);

    // 2. Lấy danh sách auth_identity_id tương ứng
    const getAuthIdentity = `
      SELECT auth_identity_id FROM provider_identity WHERE entity_id = $1;
    `;
    const authRes = await client.query(getAuthIdentity, [email]);
    const authIdentityIds = authRes.rows.map(row => row.auth_identity_id);

    // 3. Xóa provider_identity
    const deleteProviderIdentity = `
      DELETE FROM provider_identity WHERE entity_id = $1;
    `;
    const res2 = await client.query(deleteProviderIdentity, [email]);
    console.log(`- Đã xóa ${res2.rowCount} bản ghi trong bảng provider_identity.`);

    // 4. Xóa auth_identity
    if (authIdentityIds.length > 0) {
      const deleteAuthIdentity = `
        DELETE FROM auth_identity WHERE id = ANY($1);
      `;
      const res3 = await client.query(deleteAuthIdentity, [authIdentityIds]);
      console.log(`- Đã xóa ${res3.rowCount} bản ghi trong bảng auth_identity.`);
    } else {
      console.log('- Không tìm thấy thông tin đăng nhập trong bảng auth_identity.');
    }

    // 5. Xóa customer
    const deleteCustomer = `
      DELETE FROM customer WHERE email = $1;
    `;
    const res4 = await client.query(deleteCustomer, [email]);
    console.log(`- Đã xóa ${res4.rowCount} bản ghi trong bảng customer.`);

    // Commit transaction
    await client.query('COMMIT');
    console.log('Dọn dẹp dữ liệu hoàn tất thành công!');

  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Lỗi khi thực hiện dọn dẹp dữ liệu:', err.message);
  } finally {
    await client.end();
  }
}

main();
