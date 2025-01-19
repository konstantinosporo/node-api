# 🚀 Node.js API

This repository contains a custom Node.js API deployed on Vercel. The primary motivation behind creating this API was to have a custom solution for local development. By using this API, I can avoid restrictions imposed by other services and have the flexibility to define and test all the entities I want in a local environment.

## 📦 Features

- **Vercel Deployment**: Deployed as serverless functions on Vercel for scalability and ease of use.

## Getting Started

### ☑️ Prerequisites

- [Node.js](https://nodejs.org/) installed on your local machine.
- [Vercel CLI](https://vercel.com/download) for development & deployment (optional).

### 🔻 Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/konstantinosporo/node-api.git
   cd node-api

   ```

2. **Find path with fs**:

- const filepath = path.join(process.cwd(), `/db/users.json`);

3. **Import cors and run**:

- import { cors, runMiddleware } from '../middleware/middleware';

