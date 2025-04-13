"use client";

import {useState, useEffect} from 'react';
import {AlertCircle} from 'lucide-react';

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Slider} from '@/components/ui/slider';

export function ThresholdConfiguration() {
  const [threshold, setThreshold] = useState<number>(30);
  const [temperature, setTemperature] = useState<number | null>(null);
  const [alert, setAlert] = useState<boolean>(false);

  useEffect(() => {
    const fetchTemperature = async () => {
      // TODO: Fetch real-time temperature from an API endpoint or sensor
      setTemperature(28);
    };

    fetchTemperature();
  }, [temperature]);

  useEffect(() => {
    if (temperature !== null) {
      setAlert(temperature > threshold);
    }
  }, [temperature, threshold]);

  const handleThresholdChange = (value: number[]) => {
    setThreshold(value[0]);
  };

  return (
    <Card className="w-full max-w-sm rounded-lg shadow-md p-4">
      <CardHeader>
        <CardTitle className="flex items-center justify-center space-x-2 text-2xl font-bold">
          <AlertCircle className="h-6 w-6 text-destructive" />
          <span>Threshold Configuration</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground text-center">Set the threshold for temperature alerts</p>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <label htmlFor="threshold" className="block text-sm font-medium text-gray-700">
            Threshold:
          </label>
          <span>{threshold}°C</span>
        </div>
        <Slider
          defaultValue={[threshold]}
          max={50}
          min={10}
          step={1}
          onValueChange={handleThresholdChange}
        />
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
