import { Box } from '@chakra-ui/react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
);

const options = {
    responsive: true,
    maintainAspectRatio: false,
    events: [],
    animations: null,
    plugins: {
        legend: {
            display: false,
            labels: {
                display: false
            }
        },
        tooltips: {
            display: false
        }
    },
    scales: {
        x: {
            display: false,
        },
        y: {
            display: false,
        }
    }
}

function SparkLine({ roundTimes, maxRound }) {
    const dataPoints = roundTimes.concat(new Array(maxRound - roundTimes.length));
    const data = {
        labels: Array.from({ length: dataPoints.length}, (_, idx) => ''),
        datasets: [
            {
                data: dataPoints,
                borderColor:  getComputedStyle( document.querySelector(":root")).getPropertyValue('--chakra-colors-blue-500'),
                borderWidth: 1,
                fill: false,
                pointRadius: 0,
                spanGaps: true,
                tension: 0.1
            }
        ]
    }

    return (
        <Box w='95%' h={'8'}>
            <Line options={options} data={data} title='Time per round' />
        </Box>
    );
}

export default SparkLine;