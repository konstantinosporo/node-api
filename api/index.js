import { neon } from "@neondatabase/serverless";
import { cors, runMiddleware } from "../middleware/middleware";

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  const sql = neon(process.env.DATABASE_URL);

  try {
    const result = await sql`SELECT version()`;
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
