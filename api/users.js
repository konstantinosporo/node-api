import fs from 'fs';
import path from 'path';
import { cors, runMiddleware } from '../middleware/middleware';

const filepath = path.join(process.cwd(), `/db/users.json`);

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  switch (req.method) {
    case 'GET':
      get(req, res);
      break;
    case 'POST':
      post(req, res);
      break;
    default:
      return res.status(400).json({ message: 'Method is not supported.' });
  }
}

const get = (req, res) => {
  const { id } = req.query;

  try {
    const data = fs.readFileSync(filepath, 'utf-8');
    const users = JSON.parse(data);

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
}

const post = (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) return res.status(400).json({ error: 'Name and email are required.' });

  try {
    const data = fs.readFileSync(filepath, 'utf-8');
    const users = JSON.parse(data);

    const newUser = { id: users.length + 1, name, email };

    users.push(newUser);

    fs.writeFileSync(filepath, JSON.stringify(users, null, 2));

    return res.status(200).json({ message: "User added successfully.", user: newUser });

  } catch (error) {
    res.status(400).json({ error: `There was an issue adding the user: ${error.message}` });
  }
}


