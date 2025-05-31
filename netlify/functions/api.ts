import express from 'express'
import serverless from 'serverless-http'

const app = express()
const router = express.Router()

router.get('/hello', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

app.use('/.netlify/functions/api', router);

export const handler = serverless(app);