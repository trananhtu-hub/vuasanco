import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
) {
  try {
    const query = req.scope.resolve("query");
    const keys = await query({
      entity: "api_key",
      fields: ["id", "title", "token", "type"],
    });
    res.json({ keys });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
