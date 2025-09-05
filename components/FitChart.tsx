
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const FitChart = () => {
  const data = {
    labels: ['Technology Moat', 'Market Position', 'Financial Health', 'Management Team', 'Synergy Potential', 'Integration Risk'],
    datasets: [{
        label: 'Ideal Target Profile',
        data: [90, 85, 80, 85, 90, 80],
        borderColor: '#059669',
        backgroundColor: 'rgba(5, 150, 105, 0.2)',
        pointBackgroundColor: '#059669'
    }, {
        label: 'Minimum Threshold',
        data: [60, 60, 70, 65, 60, 60],
        borderColor: '#dc2626',
        backgroundColor: 'rgba(220, 38, 38, 0.1)',
        pointBackgroundColor: '#dc2626'
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        r: {
            beginAtZero: true,
            max: 100,
            ticks: {
                callback: function(value) {
                    return value + '%';
                }
            }
        }
    }
  };

  return <Radar data={data} options={options} />;
};

export default FitChart;
