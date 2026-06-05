import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
) {
  try {
    const query = req.scope.resolve("query");
    const { data: keys } = await query({
      entity: "publishable_api_key",
      fields: ["id", "title"],
    });
    res.json({ keys });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
