# Express TypeScript Netlify Template

A serverless Express.js application built with TypeScript, designed to run on Netlify Functions.

## Features

- 🚀 Express.js with TypeScript
- 🌐 Serverless deployment on Netlify
- 🔧 Hot reload development with Netlify CLI
- 📦 Pre-configured build pipeline
- 🎯 API routing with Express Router

## Prerequisites

- Node.js (version 16 or higher)
- **NPM (Required)** - This project must use NPM as the package manager
- Netlify CLI (optional, for local development)

> ⚠️ **Important**: This project requires NPM as the package manager. Using pnpm may cause errors. Other package managers have not been tested.

## Installation

1. Clone or download this template
2. Navigate to the project directory
3. Install dependencies using NPM:

```bash
npm install
```

## Development

### Local Development

Install Netlify CLI globally (if not already installed):

```bash
npm install -g netlify-cli
```

Start the development server:

```bash
npm run dev
```

The development server will start at `http://localhost:8888`

### Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run dev` - Start local development server with Netlify CLI
- `npm test` - Run tests (currently not configured)

## API Endpoints

The template includes a sample API endpoint:

- `GET /api/hello` - Returns a JSON greeting message

Example response:

```json
{
  "message": "Hello, world!"
}
```

## Redirects and HTTP Methods

This template uses Netlify redirects to simplify API URLs. However, there are important limitations:

### GET Requests

✅ **Works with shortened URL:**

```bash
# Both work for GET requests
curl https://yoursite.netlify.app/api/hello
curl https://yoursite.netlify.app/.netlify/functions/api/hello
```

### Other HTTP Methods (POST, PUT, DELETE, etc.)

❌ **Requires full URL:**

```bash
# This WON'T work for non-GET methods
curl -X POST https://yoursite.netlify.app/api/endpoint

# This WILL work
curl -X POST https://yoursite.netlify.app/.netlify/functions/api/endpoint
```

### Why This Happens

Netlify redirects only apply to GET requests. For other HTTP methods (POST, PUT, DELETE, PATCH), you must use the full `/.netlify/functions/api/` path.

## Project Structure

```
├── netlify/
│   └── functions/
│       └── api.ts          # Main API function
├── public/
│   └── index.html          # Static files
├── dist/                   # Compiled JavaScript (generated)
├── netlify.toml           # Netlify configuration
├── _redirects             # Netlify redirects
├── tsconfig.json          # TypeScript configuration
└── package.json           # Project dependencies
```

## Deployment

### Deploy to Netlify

1. Build the project:

```bash
npm run build
```

2. Deploy using Netlify CLI:

```bash
netlify deploy --prod
```

Or connect your repository to Netlify for automatic deployments.

### Environment Variables

Add any required environment variables in your Netlify dashboard under Site Settings > Environment Variables.

## Adding New API Routes

To add new API endpoints, modify `netlify/functions/api.ts`:

```typescript
// Add new routes to the router
router.get('/new-endpoint', (req, res) => {
  res.json({ message: 'New endpoint response' });
});

router.post('/create-something', (req, res) => {
  // Handle POST request
  res.json({ success: true });
});
```

## Configuration

### TypeScript Configuration

The project uses `tsconfig.json` with the following key settings:

- Target: ES2020
- Module: CommonJS
- Strict mode enabled
- Output directory: `dist/`

### Netlify Configuration

Key settings in `netlify.toml`:

- Build directory: `public`
- Functions directory: `netlify/functions`
- External modules: `express`
- Bundler: `esbuild`

## License

MIT License - see package.json for details.

## Author

argf013
