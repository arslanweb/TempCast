"use client";

import {useState, useEffect} from 'react';
import {AlertCircle} from 'lucide-react';

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {getLatestTemperature} from '@/services/temperature-sensor';

export function ThresholdConfiguration() {
  const [threshold, setThreshold] = useState<number>(25);
  const [temperature, setTemperature] = useState<number | null>(null);
  const [alert, setAlert] = useState<boolean>(false);

  useEffect(() => {
    const fetchTemperature = async () => {
      const latestTemperature = await getLatestTemperature();
      setTemperature(latestTemperature.celsius);
    };

    fetchTemperature();
  }, [temperature]);

  useEffect(() => {
    if (temperature !== null) {
      setAlert(temperature > threshold);
    }
  }, [temperature, threshold]);

  const handleThresholdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setThreshold(Number(event.target.value));
  };

  return (
    <Card className="w-full max-w-sm rounded-lg shadow-md p-4">
      <CardHeader>
        <CardTitle className="flex items-center justify-center space-x-2 text-2xl font-bold">
          <AlertCircle className="h-6 w-6 text-destructive" />
          <span>Threshold Configuration</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        <div>
          <label htmlFor="threshold" className="block text-sm font-medium text-gray-700">
            Temperature Threshold (°C):
          </label>
          <Input
            type="number"
            id="threshold"
            className="mt-1 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300"
            value={threshold}
            onChange={handleThresholdChange}
          />
        </div>
        <div>
          {alert ? (
            <div className="text-red-500 font-bold">
              Alert: Temperature is above threshold!
            </div>
          ) : (
            <div className="text-green-500 font-bold">
              Temperature is within safe limits.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
