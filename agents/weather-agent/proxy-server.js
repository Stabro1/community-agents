const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8000;
const LANGGRAPH_PORT = process.env.LANGGRAPH_PORT || 2024;

// Serve agent-card.json publicly without authentication
app.get('/.well-known/agent-card.json', (req, res) => {
  const cardPath = path.join(__dirname, '.well-known', 'agent-card.json');
  res.sendFile(cardPath);
});

// Proxy all other requests to LangGraph
app.use('/', createProxyMiddleware({
  target: `http://localhost:${LANGGRAPH_PORT}`,
  changeOrigin: true,
}));

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
  console.log(`Proxying to LangGraph on port ${LANGGRAPH_PORT}`);
});
