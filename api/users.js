import { neon } from "@neondatabase/serverless";
import { cors, runMiddleware } from "../middleware/middleware";

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  const sql = neon(process.env.DATABASE_URL);

  switch (req.method) {
    case "GET":
      get(req, res, sql);
      break;
    case "POST":
      post(req, res, sql);
      break;
    default:
      return res.status(400).json({ message: "Method is not supported." });
  }
}

const get = async (req, res, sql) => {
  const { id } = req.query;

  try {
    const users = await sql`SELECT * FROM USERS`;

    if (id) {
      const user = users.find((user) => user.id === parseInt(id, 10));

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: `User with id ${id} not found.` });
      }
    } else {
      res.status(200).json(users);
    }
  } catch (error) {
    res.status(500).json({ error: `Could not fetch users: ${error.message}` });
  }
};

const post = async (req, res, sql) => {
  const { username, email, password } = req.body;

  // Validate required fields
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "Username, email, and password are required." });
  }

  try {
    // Insert user into the database
    const result = await sql`
      INSERT INTO users (username, email, password)
      VALUES (${username}, ${email}, ${password})
      RETURNING id, username, email;
    `;

    // Respond with success
    return res.status(200).json({
      message: "User added successfully.",
      user: result[0], // Include the newly created user details
    });
  } catch (error) {
    // Handle database errors
    return res.status(500).json({
      error: `There was an issue adding the user: ${error.message}`,
    });
  }
};
