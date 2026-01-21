import { Hono } from "hono";

export const app = new Hono();

app.get("/.well-known/agent-card.json", (c) => {
  return c.json({
    name: "Weather Agent Pro",
    description: "Get real-time weather information for any location worldwide. This agent provides current conditions and forecasts.",
    url: "https://community-agents-production.up.railway.app",
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
