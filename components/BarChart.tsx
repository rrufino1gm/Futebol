import React from 'react';

interface BarChartProps {
  data: {
    label: string;
    value: number;
  }[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const maxValue = React.useMemo(() => Math.max(...data.map(d => d.value), 0), [data]);

  const colors = [
    '#4ade80', '#38bdf8', '#fbbf24', '#f87171', '#818cf8',
    '#a78bfa', '#f472b6', '#2dd4bf', '#a3e635', '#fb923c'
  ];

  return (
    <div className="w-full h-full p-4 space-y-4">
      {data.map((item, index) => (
        <div key={item.label} className="flex items-center group">
          <div className="w-28 text-sm text-gray-600 dark:text-gray-300 text-right pr-4 truncate" title={item.label}>
            {item.label}
          </div>
          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-6 relative">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out flex items-center pr-2 justify-end"
              style={{
                width: `${(item.value / maxValue) * 100}%`,
                backgroundColor: colors[index % colors.length]
              }}
            >
              <span className="text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                {item.value}
              </span>
            </div>
          </div>
           <div className="w-10 text-sm font-semibold text-gray-800 dark:text-white text-left pl-2">
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BarChart;
