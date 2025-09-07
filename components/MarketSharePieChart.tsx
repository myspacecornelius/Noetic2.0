import React, { useState, useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const initialData = {
  labels: ['Big Pharma', 'Biotech Innovation', 'Digital Health', 'Research Institutions'],
  datasets: [
    {
      label: 'Market Share',
      data: [40, 35, 15, 10],
      backgroundColor: [
        'rgba(102, 126, 234, 0.8)', // primary
        'rgba(74, 222, 128, 0.8)', // success
        'rgba(251, 191, 36, 0.8)', // warning
        'rgba(56, 189, 248, 0.8)', // info
      ],
      borderColor: [
        'rgba(102, 126, 234, 1)',
        'rgba(74, 222, 128, 1)',
        'rgba(251, 191, 36, 1)',
        'rgba(56, 189, 248, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: '#e4e4e7',
      }
    },
    title: {
      display: true,
      text: 'Market Share Distribution',
      color: '#e4e4e7',
    },
  },
};

export const MarketSharePieChart = () => {
  const [visibleData, setVisibleData] = useState(initialData.labels.reduce((acc, label) => ({ ...acc, [label]: true }), {}));

  const handleVisibilityChange = (label: string) => {
    setVisibleData(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const filteredData = useMemo(() => {
    const labels = initialData.labels.filter(label => visibleData[label]);
    const data = initialData.datasets[0].data.filter((_, i) => visibleData[initialData.labels[i]]);
    const backgroundColor = initialData.datasets[0].backgroundColor.filter((_, i) => visibleData[initialData.labels[i]]);
    const borderColor = initialData.datasets[0].borderColor.filter((_, i) => visibleData[initialData.labels[i]]);

    return {
      labels,
      datasets: [{ ...initialData.datasets[0], data, backgroundColor, borderColor }],
    };
  }, [visibleData]);

  return (
    <div>
      <Pie data={filteredData} options={options} />
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {initialData.labels.map(label => (
          <div key={label} className="flex items-center">
            <input
              type="checkbox"
              id={label}
              checked={visibleData[label]}
              onChange={() => handleVisibilityChange(label)}
              className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
            />
            <label htmlFor={label} className="ml-2 text-sm font-medium text-gray-300">{label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};