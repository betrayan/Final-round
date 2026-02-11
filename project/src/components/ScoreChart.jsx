import React from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const data = {
        labels: ['Tech', 'Comm', 'Confidence', 'Problem', 'Lead'],
        datasets: [
            {
                label: 'You',
                data: [8, 9, 7, 8, 8],
                backgroundColor: 'rgba(99, 102, 241, 0.2)', // Indigo
                borderColor: '#818cf8', // Indigo-400
                borderWidth: 2,
                pointBackgroundColor: '#818cf8',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#818cf8',
            },
            {
                label: 'Avg',
                data: [6, 7, 6, 5, 6],
                backgroundColor: 'rgba(148, 163, 184, 0.1)', // Slate
                borderColor: '#475569', // Slate-600
                borderWidth: 1,
                pointBackgroundColor: 'transparent',
                pointBorderColor: 'transparent',
            },
        ],
    };

    const options = {
        scales: {
            r: {
                angleLines: {
                    display: true,
                    color: 'rgba(255, 255, 255, 0.05)'
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)'
                },
                pointLabels: {
                    font: {
                        size: 10,
                        family: 'Inter, sans-serif',
                        weight: '600'
                    },
                    color: '#94a3b8' // Slate-400
                },
                suggestedMin: 0,
                suggestedMax: 10,
                ticks: {
                    stepSize: 2,
                    display: false,
                    backdropColor: 'transparent'
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    color: '#cbd5e1',
                    font: {
                        family: 'Inter, sans-serif',
                        size: 10
                    },
                    usePointStyle: true,
                    boxWidth: 6,
                    padding: 10
                }
            },
            tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                titleColor: '#e2e8f0',
                bodyColor: '#cbd5e1',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1,
                padding: 8,
                displayColors: true,
                cornerRadius: 8,
            }
        },
        maintainAspectRatio: false
    };

    return (
        <div className="h-full w-full">
            <Radar data={data} options={options} />
        </div>
    );
};

export default Dashboard;
