
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ValuationChart = () => {
  const data = {
    labels: ['SaaS Diagnostics', 'Device + Software', 'Specialty Pharma', 'Data Platform', 'Healthcare Average'],
    datasets: [{
        label: 'EV/Revenue Multiple',
        data: [6.0, 4.5, 7.5, 5.5, 4.8],
        backgroundColor: '#3730a3',
        yAxisID: 'y'
    }, {
        label: 'EV/EBITDA Multiple',
        data: [20.0, 16.0, 14.0, 18.0, 14.9],
        backgroundColor: '#1e3a8a',
        yAxisID: 'y1'
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            type: 'linear' as const,
            display: true,
            position: 'left' as const,
            title: {
                display: true,
                text: 'Revenue Multiple'
            }
        },
        y1: {
            type: 'linear' as const,
            display: true,
            position: 'right' as const,
            title: {
                display: true,
                text: 'EBITDA Multiple'
            },
            grid: {
                drawOnChartArea: false,
            }
        }
    }
  };

  return <Bar data={data} options={options} />;
};

export default ValuationChart;
