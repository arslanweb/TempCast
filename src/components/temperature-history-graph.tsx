"use client";

import {useState, useEffect} from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {getTemperatureHistory} from '@/services/temperature-sensor';

export function TemperatureHistoryGraph() {
  const [temperatureData, setTemperatureData] = useState([]);

  useEffect(() => {
    const fetchTemperatureHistory = async () => {
      const now = Date.now();
      const startTime = now - 24 * 60 * 60 * 1000; // 24 hours ago
      const history = await getTemperatureHistory(startTime, now);

      // Format the data for recharts
      const formattedData = history.map((item) => ({
        time: new Date(item.timestamp).toLocaleTimeString(),
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
      </CardHeader>
      <CardContent className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
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
            <Legend />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#008080"
              activeDot={{r: 8}}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
