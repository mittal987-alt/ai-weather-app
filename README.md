🌦️ AI Weather App

A modern AI-powered Weather Application built with Next.js + TypeScript, providing real-time weather data, air quality insights (AQI), 5-day forecasts, and on-demand AI-generated advice.

🔗 Live Demo: (add your Vercel link here)

✨ Features

🌍 Global Location Search

Search any city, area, village, or country

Smart suggestions with popular & nearby places

Enter-key search support

📍 Auto-Detect User Location

Uses browser geolocation to fetch local weather automatically

🌡️ Real-Time Weather

Current temperature (actual + feels like)

Humidity, wind speed, weather condition icons

📅 5-Day Weather Forecast

Daily forecast cards with min/max temperature

🫁 Air Quality Index (AQI)

AQI levels (1–5) based on OpenWeather (WHO standard)

Color-coded AQI meter

Short health descriptions for each level

🧠 AI Weather Insight (On Demand)

AI-generated health, clothing, and outdoor activity advice

Loads only when user clicks “Get AI Insight”

Cached responses to reduce API cost

⚡ Optimized & User Friendly

Loading skeletons

Recent searches saved in localStorage

Clean glassmorphism UI

🛠️ Tech Stack

Frontend: Next.js (App Router), React, TypeScript

Styling: Tailwind CSS

APIs:

OpenWeather API (Weather, Forecast, AQI, Geocoding)

OpenAI API (AI insights)

Deployment: Vercel

🔑 APIs Used
🌦 OpenWeather API

Current Weather

5-Day Forecast

Air Pollution (AQI)

Geocoding (location search)

🤖 OpenAI API

On-demand AI weather insights

Cost-optimized using short prompts, caching, and user-triggered calls