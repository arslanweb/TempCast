"use client";

import {useState, useEffect} from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {getTemperatureHistory} from '@/services/temperature-sensor';

export function TemperatureHistoryGraph() {
  const [temperatureData, setTemperatureData] = useState([]);
  const [threshold, setThreshold] = useState<number>(30); // Default threshold value

  useEffect(() => {
    const fetchTemperatureHistory = async () => {
      const now = Date.now();
      const startTime = now - 24 * 60 * 60 * 1000; // 24 hours ago
      const history = await getTemperatureHistory(startTime, now);

      // Format the data for recharts
      const formattedData = history.map((item) => ({
        time: new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        temperature: item.celsius,
      }));

      setTemperatureData(formattedData);
    };

    fetchTemperatureHistory();
  }, []);

  return (
    <Card className="w-full rounded-lg shadow-md p-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Temperature History
        </CardTitle>
        <p className="text-sm text-muted-foreground text-center">Temperature trends over time</p>
      </CardHeader>
      <CardContent className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={temperatureData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="temperature" stroke="#8884d8" fill="#d3d3d3" />
             <ReferenceLine y={threshold} stroke="red" strokeDasharray="3 3" label={{ position: 'top', value: 'Threshold', fill: 'red' }} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
