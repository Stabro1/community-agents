from fastapi import FastAPI
from fastapi.responses import JSONResponse

app = FastAPI()

@app.get("/.well-known/agent-card.json")
async def get_agent_card():
    """Agent Card endpoint required by Warden Studio"""
    return JSONResponse({
        "name": "Weather Agent",
        "description": "Get real-time weather information for any location worldwide. This agent provides current conditions and forecasts.",
        "url": "https://community-agents-production.up.railway.app",
        "version": "1.0.0",
        "capabilities": {
            "streaming": True,
            "pushNotifications": False,
            "stateTransitionHistory": True
        },
        "defaultInputModes": ["text"],
        "defaultOutputModes": ["text"],
        "skills": [
            {
                "name": "get_weather",
                "description": "Get current weather for any location",
                "inputModes": ["text"],
                "outputModes": ["text"]
            },
            {
                "name": "weather_forecast",
                "description": "Get weather forecast for multiple days",
                "inputModes": ["text"],
                "outputModes": ["text"]
            }
        ]
    })
