import {RealTimeTemperature} from '@/components/real-time-temperature';
import {TemperatureHistoryGraph} from '@/components/temperature-history-graph';
import {ThresholdConfiguration} from '@/components/threshold-configuration';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          TempCast
        </h1>

        <p className="mt-3 text-2xl">
          Real-time Temperature Monitoring and Prediction
        </p>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <RealTimeTemperature />
          <TemperatureHistoryGraph />
          <ThresholdConfiguration />
        </div>
      </main>
    </div>
  );
}
