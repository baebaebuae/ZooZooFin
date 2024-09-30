import styled from 'styled-components';
import ReactApexChart from 'react-apexcharts';
import StockData from '@components/stock/TestStock';

export const MovingAverage = ({ turn }) => {
    const getNowStockData = (turn) => {
        const now = turn + 25;
        const entries = Object.entries(StockData.data).slice(0, now);
        const NowData = Object.fromEntries(entries);
        return NowData;
    };
    const data = getNowStockData(turn);
    const dataPrices = Object.values(data).map((price) => [
        price.open,
        price.high,
        price.low,
        price.close,
    ]);

    const calculateMovingAverage = (data, windowSize) => {
        return data.map((_, idx, arr) => {
            if (idx < windowSize - 1) return null;
            const window = arr.slice(idx - windowSize + 1, idx + 1);
            const sum = window.reduce((acc, val) => acc + val[3], 0);

            return sum / windowSize;
        });
    };

    // 단기 이동평균선 (5턴 :  7*5 = 35일 )
    const shortTermMA = calculateMovingAverage(dataPrices, 5);
    // 장기 이동 평균선 (10턴 : 7*10 = 70일)
    const longTermMA = calculateMovingAverage(dataPrices, 10);
    console.log(shortTermMA);

    const options = {
        chart: {
            type: 'line',
            width: 500,
            height: 350,
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: true,
            },
            pan: {
                enabled: true,
            },
        },
        colors: ['#ff6a00', '#67EB00', '#08B9FF'],
        dataLabels: {
            enabled: false,
        },
        plotOptions: {
            candlestick: {
                wick: {
                    useFillColor: true,
                },
            },
        },
        grid: {
            show: false,
        },
        xaxis: {
            type: 'numeric',
            labels: {
                show: false,
            },
        },
        yaxis: {
            show: false,
        },
        legend: {
            position: 'top',
        },
    };
    const series = [
        {
            name: '단기 이동평균선',
            type: 'line',
            data: shortTermMA.map((price, index) => ({ x: index, y: price })),
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            color: '#ff6a00',
        },
        {
            name: '장기 이동평균선',
            type: 'line',
            data: longTermMA.map((price, index) => ({ x: index, y: price })),
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            color: '#67EB00',
        },
        {
            name: '캔들차트',
            type: 'candlestick',
            data: dataPrices.map((price, index) => ({
                x: index,
                y: price,
            })),
        },
    ];

    return <ReactApexChart type="candlestick" options={options} series={series} />;
};
