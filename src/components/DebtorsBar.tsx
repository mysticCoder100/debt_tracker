"use client"

import {Bar} from "react-chartjs-2";

import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function DebtorBar({label, data}: { label: string[], data: number[] }) {
    return (
        <Bar
            data={{
                labels: label,
                datasets: [{
                    label: "counts",
                    data: data,
                    borderColor: '#36A2EB',
                    backgroundColor: ['#8f0a32', '#9BD0F5'],
                    barThickness: 18,
                    borderRadius: 10,
                }]
            }}
        />
    )
}