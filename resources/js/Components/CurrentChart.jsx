// import { useEffect, useRef } from "react";
import { Heading, Box } from '@chakra-ui/react';
import { 
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js'
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
            labels: {
                filter: item => ['Rounds', 'Average'].includes(item.text)
            }
        }
    },
    scales: {
        x: {
            title: {
                text: 'Rounds',
                display: true
            },
        },
        y: {
            beginAtZero: true,
            title: {
                text: 'Time (s)',
                display: true    
            }
        }
    }
}

function CurrentChart({roundTimes}) {
    
    const avgTime = roundTimes.length > 0 ? roundTimes.reduce((t, i) => t + i, 0) / roundTimes.length / 1000 : 0;
    const maxTime = roundTimes.length > 0 ? Math.ceil(Math.max(...roundTimes) / 1000) : 0;

    const data = {
        labels: roundTimes.map((_, index) => index + 1),
        datasets: [
            {
                label: 'Rounds',
                data: roundTimes.map(rt => (rt / 1000).toFixed(3)),
                borderColor:  getComputedStyle( document.querySelector(":root")).getPropertyValue('--chakra-colors-blue-500'),
                backgroundColor: getComputedStyle( document.querySelector(":root")).getPropertyValue('--chakra-colors-blue-500'),
                borderWidth: 2,
                radius: 2
            },
            {
                label: 'Average',
                data: roundTimes.map((_) => avgTime.toFixed(3)),
                borderColor: getComputedStyle( document.querySelector(":root")).getPropertyValue('--chakra-colors-red-500'),
                backgroundColor: getComputedStyle( document.querySelector(":root")).getPropertyValue('--chakra-colors-red-500'),
                pointStyle: false,
                borderWidth: 1
            }
        ]
    }

    const level = Math.floor(roundTimes.length / 20);
    for(let i = 1; i <= Math.min(5, level); i++) {
        const dataset = {
            label: `Level ${i}`,
            data: [{x: i*20, y: 0}, {x: i*20, y:Math.max(6, maxTime)}],
            borderColor: 'black',
            backgroundColor: 'black',
            pointStyle: false,
            borderWidth: 1
        };
        data.datasets.push(dataset);
    }

    return (
        <Box w='full'>
            <Heading as='h5' size='md'>Time per round (s)</Heading>
            <Line options={options} data={data} title="Time per round" />
        </Box>
    );
}

export default CurrentChart;