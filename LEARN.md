# How to Build an Express TypeScript Netlify Functions Template

This guide walks you through building a serverless Express.js application with TypeScript that runs on Netlify Functions from scratch.

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Initial Setup](#initial-setup)
3. [TypeScript Configuration](#typescript-configuration)
4. [Express Server Setup](#express-server-setup)
5. [Netlify Configuration](#netlify-configuration)
6. [Testing Locally](#testing-locally)
7. [Deployment](#deployment)
8. [Common Issues & Solutions](#common-issues--solutions)

## 🎯 Project Overview

We're building a serverless API using:

- **Express.js** - Web framework
- **TypeScript** - Type safety and better DX
- **Netlify Functions** - Serverless hosting
- **serverless-http** - Adapter for Express on serverless

## 🚀 Initial Setup

### Step 1: Create Project Directory

```bash
mkdir express-ts-netlify-template
cd express-ts-netlify-template
```

### Step 2: Initialize NPM Project

```bash
npm init -y
```

This creates a basic `package.json` file.

### Step 3: Install Dependencies

Install production dependencies:

```bash
npm install express serverless-http
```

Install development dependencies:

```bash
npm install -D typescript @types/express @netlify/functions
```

**Why these packages?**

- `express` - Our web framework
- `serverless-http` - Converts Express app to work with AWS Lambda/Netlify Functions
- `typescript` - TypeScript compiler
- `@types/express` - TypeScript definitions for Express
- `@netlify/functions` - Netlify Functions types and utilities

### Step 4: Update package.json

Update the scripts section in `package.json`:

```json
{
  "scripts": {
    "build": "tsc",
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "netlify dev"
  }
}
```

## ⚙️ TypeScript Configuration

### Step 5: Create tsconfig.json

Create `tsconfig.json` in the project root:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "outDir": "dist",
    "esModuleInterop": true,
    "strict": true,
    "moduleResolution": "node",
    "skipLibCheck": true,
    "allowSyntheticDefaultImports": true
  },
  "include": ["netlify/functions"],
  "exclude": ["node_modules", "dist"]
}
```

**Key configurations explained:**

- `target: "ES2020"` - Use modern JavaScript features
- `module: "CommonJS"` - Required for Node.js/Netlify Functions
- `outDir: "dist"` - Compiled files go here
- `esModuleInterop: true` - Better import/export handling
- `strict: true` - Enable all strict type checking
- `include: ["netlify/functions"]` - Only compile our functions

## 🌐 Express Server Setup

### Step 6: Create Directory Structure

```bash
mkdir -p netlify/functions
mkdir public
```

### Step 7: Create the API Function

Create `netlify/functions/api.ts`:

```typescript
import express from 'express';
import serverless from 'serverless-http';

const app = express();
const router = express.Router();

// Define your API routes
router.get('/hello', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

// Mount the router
app.use('/.netlify/functions/api', router);

// Export the handler
module.exports.handler = serverless(app);
```

**Code breakdown:**

1. Import Express and serverless-http
2. Create Express app and router
3. Define routes using the router
4. Mount router at the Netlify Functions path
5. Export serverless-wrapped handler

### Step 8: Create a Simple HTML Page

Create `public/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Express TypeScript Netlify Template</title>
  </head>
  <body>
    <h1>Express TypeScript Netlify Template</h1>
    <p>
      Your API is running! Try accessing <a href="/api/hello">/api/hello</a>
    </p>
  </body>
</html>
```

## 🔧 Netlify Configuration

### Step 9: Create netlify.toml

Create `netlify.toml` in the project root:

```toml
[build]
  publish = "public"
  functions = "netlify/functions"

[functions]
  external_node_modules = ["express"]
  node_bundler = "esbuild"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/api/:splat"
```

**Configuration explained:**

- `publish = "public"` - Static files directory
- `functions = "netlify/functions"` - Functions directory
- `external_node_modules = ["express"]` - Don't bundle Express (performance)
- `node_bundler = "esbuild"` - Fast bundler
- `redirects` - Simplify API URLs (only works for GET requests)

### Step 10: Create \_redirects File

Create `_redirects` in the project root:

```plaintext
/api/*  /.netlify/functions/api/:splat
```

This provides an alternative redirect configuration.

## 🧪 Testing Locally

### Step 11: Install Netlify CLI

```bash
npm install -g netlify-cli
```

### Step 12: Build and Test

Build the TypeScript:

```bash
npm run build
```

Start the development server:

```bash
npm run dev
```

Test the endpoints:

- Open `http://localhost:8888` for the HTML page
- Visit `http://localhost:8888/api/hello` for the API

## 🚀 Deployment

### Step 13: Deploy to Netlify

**Option 1: Using Netlify CLI**

```bash
# Build first
npm run build

# Deploy
netlify deploy --prod
```

**Option 2: Git-based Deployment**

1. Push your code to GitHub/GitLab
2. Connect repository in Netlify dashboard
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `public`
   - Functions directory: `netlify/functions`

## ⚠️ Common Issues & Solutions

### Issue 1: Import/Export Errors

**Problem:** Module import errors in TypeScript
**Solution:** Ensure `esModuleInterop: true` in tsconfig.json

### Issue 2: POST/PUT Requests Not Working with /api/\* URLs

**Problem:** Non-GET requests return 404
**Solution:** Use full URL `/.netlify/functions/api/endpoint` for non-GET requests

### Issue 3: Express Not Found During Build

**Problem:** Build fails with Express module errors
**Solution:** Add `external_node_modules = ["express"]` to netlify.toml

### Issue 4: Function Timeout

**Problem:** Function execution timeout
**Solution:**

- Optimize your code
- Consider breaking large operations into smaller chunks
- Use async/await properly

## 📁 Final Project Structure

```
express-ts-netlify-template/
├── netlify/
│   └── functions/
│       └── api.ts              # Main API function
├── public/
│   └── index.html             # Static HTML page
├── dist/                      # Compiled TypeScript (auto-generated)
├── node_modules/              # Dependencies
├── package.json               # Project configuration
├── tsconfig.json             # TypeScript configuration
├── netlify.toml              # Netlify configuration
├── _redirects                # URL redirects
├── README.md                 # Project documentation
└── LEARN.md                  # This tutorial file
```

## 🎉 Next Steps

Now you can:

1. Add more API routes in `api.ts`
2. Add middleware (CORS, authentication, etc.)
3. Connect to databases
4. Add environment variables
5. Implement error handling
6. Add request validation

## 📚 Additional Resources

- [Netlify Functions Documentation](https://docs.netlify.com/functions/overview/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [serverless-http Documentation](https://github.com/dougmoscrop/serverless-http)

---

**Built with ❤️ by argf013**
