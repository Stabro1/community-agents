import { Hono } from "hono";
import { cors } from 'hono/cors';

export const app = new Hono();

// Enable CORS for Warden Studio
app.use('/*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
  exposeHeaders: ['Content-Length', 'X-Request-Id'],
  credentials: true,
}));

app.get("/.well-known/agent-card.json", (c) => {
  return c.json({
    name: "Weather Agent Pro",
    description: "Get real-time weather information for any location worldwide. This agent provides current conditions and forecasts.",
    url: "https://community-agents-production-b102.up.railway.app",
    version: "1.0.0",
    capabilities: {
      streaming: true,
      pushNotifications: false,
      stateTransitionHistory: true,
    },
    defaultInputModes: ["text"],
    defaultOutputModes: ["text"],
    skills: [
      {
        name: "get_weather",
        description: "Get current weather for any location",
        inputModes: ["text"],
        outputModes: ["text"],
      },
      {
        name: "weather_forecast",
        description: "Get weather forecast for multiple days",
        inputModes: ["text"],
        outputModes: ["text"],
      },
    ],
    pricing: {
      model: "per_inference",
      price: 0.01,
      currency: "USDC"
    },
  });
});

app.get("/", (c) => {
  return c.json({
    message: "Weather Agent Pro API",
    status: "active",
    version: "1.0.0"
  });
});
