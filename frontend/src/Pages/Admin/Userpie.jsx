import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';

const Userpie = () => {
    const [result, setResult] = useState({});
    const chartRef = useRef(null);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (result.users !== undefined && result.sellers !== undefined) {
            createChart();
        }
    }, [result]);

    const fetchData = async () => {
        try {
            const resp = await axios.get("/backend/counter/getUsers");
            const data = resp.data.results;
            setResult(data);
            console.log("Fetched data:", data);
        } catch (error) {
            console.log(error);
        }
    };

    const createChart = () => {
        const ctx = chartRef.current;
        if (!ctx) {
            console.log("Canvas context not found");
            return;
        }

        const labels = ['Users', 'Sellers',];
        const data = [result.users, result.sellers];
        const backgroundColors = [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            
        ];

        if (ctx.chart) {
            ctx.chart.destroy();
        }
        
        ctx.chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: backgroundColors
                }]
            }
        });
    };

    return (
        <div className='m-2'>
       
            <canvas id="user-pie-chart"  ref={chartRef}></canvas>
            total Count:{result.total}
        </div>
       
    );
};

export default Userpie;
