# **App Name**: TempCast

## Core Features:

- Real-Time Display: Display real-time temperature readings from the sensor(s).
- Temperature History: Show a historical graph of temperature trends over time.
- Threshold Configuration: Allow setting a temperature threshold and trigger alerts.
- Temperature Prediction: Use an AI tool to predict potential temperature fluctuations based on historical data.

## Style Guidelines:

- Primary color: Teal (#008080) for a calm and clean feel.
- Secondary color: Light gray (#F0F0F0) for backgrounds.
- Accent: Turquoise (#40E0D0) for highlights and interactive elements.
- Clean and modern card-based layout.
- Use simple, outlined icons for temperature and alerts.

## Original User Request:
Project Goal:

Use an ESP32 board with a DS18B20 sensor to read temperature data.

Implement data collection with MicroPython (or Arduino C++).

Send readings over Wi-Fi to Firebase.

Store them in either Firebase Realtime Database or Firestore.

Display real-time temperature on a simple user interface.

Desired Architecture Steps:

Device Layer

Connect DS18B20 to ESP32 with a 4.7kΩ pull-up resistor on DATA line

Read sensor values every ~10 seconds

Connectivity & Data Transfer

Connect ESP32 to Wi-Fi

Push data to Firebase via REST or the Realtime Database SDK

Upload sensor value under “temperature” field

Cloud (Firebase) Configuration

Create a project in Firebase Studio

Set up a Realtime Database or Firestore

Implement security rules so only authorized writes are allowed

Frontend Layer

Use Firebase Studio’s auto-generated template or a small React/Vue web app

Show the real-time “temperature” value on screen

Example Code & Details

Use “ds18b20” library in MicroPython or “OneWire” + “DallasTemperature” in Arduino C++

Sample POST or PUT to Firebase’s REST endpoint

Request:

Generate a complete project outline based on these steps.

Include code snippets, config files, and sample security rules.

The final result: a real-time temperature readout in the web UI.

Extra Note:

Possibly multiple DS18B20 sensors on one 1-wire bus.

Optional: add authentication with an API key or keep it simple.
  