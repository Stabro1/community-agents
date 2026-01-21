import { Hono } from "hono";
import { cors } from "hono/cors";

export const app = new Hono();

app.use("/*", cors());

app.get("/.well-known/agent-card.json", (c) => {
  return c.json({
    name: "Weather Agent Pro",
    description: "Advanced weather intelligence agent providing current weather conditions, detailed forecasts, and weather analysis for any location worldwide. Professional-grade weather data for informed decision-making.",
    url: "https://weather-agent-pro-production.up.railway.app",
    version: "1.0.0",
    capabilities: {
      streaming: false,
      async: true
    },
    defaultInputModes: ["text"],
    defaultOutputModes: ["text", "json"],
    skills: [
      {
        id: "get_weather",
        name: "Get Current Weather",
        description: "Get current weather conditions for any location",
        input: {
          type: "object",
          properties: {
            location: {
              type: "string",
              description: "City name, zip code, or coordinates"
            }
          },
          required: ["location"]
        }
      },
      {
        id: "weather_forecast",
        name: "Get Weather Forecast",
        description: "Get detailed weather forecast for the next 5 days",
        input: {
          type: "object",
          properties: {
            location: {
              type: "string",
              description: "City name, zip code, or coordinates"
            },
            days: {
              type: "number",
              description: "Number of days to forecast (1-5)",
              default: 3
            }
          },
          required: ["location"]
        }
      }
    ],
    pricing: {
      model: "per_inference",
      price: 0.01,
      currency: "USDC"
    }
  });
});

app.get("/", (c) => {
  return c.json({ 
    message: "Weather Agent Pro API",
    status: "active",
    version: "1.0.0"
  });
});
