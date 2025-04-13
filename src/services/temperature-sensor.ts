/**
 * Represents a temperature reading with a timestamp.
 */
export interface TemperatureReading {
  /**
   * The temperature in Celsius.
   */
  celsius: number;
  /**
   * The timestamp of the reading.
   */
  timestamp: number;
}

/**
 * Asynchronously retrieves the latest temperature reading from the sensor.
 *
 * @returns A promise that resolves to a TemperatureReading object containing the temperature and timestamp.
 */
export async function getLatestTemperature(): Promise<TemperatureReading> {
  // TODO: Implement this by calling an API.

  return {
    celsius: 25.5,
    timestamp: Date.now(),
  };
}

/**
 * Asynchronously retrieves historical temperature readings within a specified time range.
 *
 * @param startTime The start timestamp of the time range (inclusive).
 * @param endTime The end timestamp of the time range (inclusive).
 * @returns A promise that resolves to an array of TemperatureReading objects within the specified time range.
 */
export async function getTemperatureHistory(
  startTime: number,
  endTime: number
): Promise<TemperatureReading[]> {
  // TODO: Implement this by calling an API.

  const mockData: TemperatureReading[] = [];
  const now = Date.now();
  for (let i = 0; i < 10; i++) {
    mockData.push({
      celsius: 20 + Math.random() * 5,
      timestamp: now - i * 1000 * 60 * 60, // mock hourly data
    });
  }

  return mockData;
}
