"use client";

import {useState, useEffect} from 'react';
import {Thermometer} from 'lucide-react';

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {getLatestTemperature} from '@/services/temperature-sensor';

export function RealTimeTemperature() {
  const [temperature, setTemperature] = useState<number | null>(null);

  useEffect(() => {
    const fetchTemperature = async () => {
      const latestTemperature = await getLatestTemperature();
      setTemperature(latestTemperature.celsius);
    };

    // Fetch temperature every 5 seconds
    fetchTemperature();
    const intervalId = setInterval(fetchTemperature, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Card className="w-full max-w-sm rounded-lg shadow-md p-4">
      <CardHeader>
        <CardTitle className="flex items-center justify-center space-x-2 text-2xl font-bold">
          <Thermometer className="h-6 w-6 text-primary" />
          <span>Real-Time Temperature</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-4xl font-bold text-center">
        {temperature !== null ? `${temperature}°C` : "Loading..."}
      </CardContent>
    </Card>
  );
}
