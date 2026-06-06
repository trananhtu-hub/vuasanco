import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import fs from "fs"
import path from "path"

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
) {
  try {
    const query = req.scope.resolve("query");
    const { data: keys } = await query.graph({
      entity: "api_key",
      fields: ["id", "title", "token", "type"],
    });
    res.json({ keys });
  } catch (err: any) {
    try {
      const logPath = path.join(process.cwd(), "static", "error-log.txt")
      fs.appendFileSync(logPath, `[/debug-keys Error]: ${err?.stack || err}\n`)
    } catch (e) {}
    res.status(500).json({ error: err.message });
  }
}
