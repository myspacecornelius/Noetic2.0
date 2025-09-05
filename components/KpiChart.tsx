
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const KpiChart = () => {
  const data = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [{
        label: 'Targets Screened',
        data: [25, 30, 28, 35],
        borderColor: '#3730a3',
        tension: 0.4
    }, {
        label: 'LOIs Signed',
        data: [3, 5, 4, 8],
        borderColor: '#059669',
        tension: 0.4
    }, {
        label: 'Deals Closed',
        data: [0, 1, 1, 2],
        borderColor: '#dc2626',
        tension: 0.4
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            beginAtZero: true
        }
    }
  };

  return <Line data={data} options={options} />;
};

export default KpiChart;
