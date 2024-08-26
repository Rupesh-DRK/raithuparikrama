import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { useCategory } from '../../middleware/Hooks';

const Catpie = () => {
    const [categoryCount, setCategoryCount] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [displayLabels, setDisplayLabels] = useState(true); // State to toggle label display
    const chartRef = useRef(null);
    const [category, setCategory] = useCategory();

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (categoryCount.length > 0 && category.length > 0) {
            createChart();
        }
    }, [categoryCount, category, displayLabels]); // Recreate chart when labels toggle

    const fetchData = async () => {
        try {
            const response = await axios.get('/backend/counter/getcount');
            setCategoryCount(response.data.results.categoryCount);
            setTotalCount(response.data.results.total);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const getCategoryNames = () => {
        return categoryCount.map(c => {
            const matchedCategory = category.find(cat => cat._id === c._id);
            return matchedCategory ? matchedCategory.name : 'Unknown';
        });
    };

    const generateColors = (numColors) => {
        const colors = [];
        const step = Math.floor(255 / Math.cbrt(numColors));
        for (let r = 0; r < 255; r += step) {
            for (let g = 0; g < 255; g += step) {
                for (let b = 0; b < 255; b += step) {
                    if (colors.length < numColors) {
                        colors.push(`rgba(${r}, ${g}, ${b}, 0.6)`);
                    }
                }
            }
        }
        return colors;
    };

    const createChart = () => {
        const ctx = chartRef.current;
        const categoryNames = getCategoryNames();
        const backgroundColors = generateColors(categoryNames.length);

        if (ctx) {
            if (chartRef.current.chart) {
                chartRef.current.chart.destroy();
            }
            chartRef.current.chart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: displayLabels ? categoryNames : [], // Conditionally show labels
                    datasets: [{
                        data: categoryCount.map(category => category.count),
                        backgroundColor: backgroundColors
                    }]
                },
                options: {
                    plugins: {
                        legend: {
                            display: displayLabels // Conditionally display legend
                        }
                    }
                }
            });
        }
    };

    return (
        <div className='' style={{width:'100%',height:'100%'}}>
            <canvas onClick={() => setDisplayLabels(!displayLabels)} id="doughnut-chart" ref={chartRef}></canvas>
        </div>
    );
};

export default Catpie;
