import styled from 'styled-components';
import ReactApexChart from 'react-apexcharts';
import useStockStore from '@components/stock/common/store/StockStore';
import { useEffect, useState } from 'react';
const GraphWrapper = styled.div`
    padding-top: 10px;
`;

export const MovingAverage = () => {
    const { clickedStockCharts } = useStockStore();
    const [stockData, setStockData] = useState(0);
    const [turns, setTurns] = useState([]);
    const [dataPrices, setdataPrices] = useState([]);
    // 클릭된 주식 차트를 상태에 저장
    useEffect(() => {
        if (clickedStockCharts) {
            setStockData(clickedStockCharts);
        }
    }, [clickedStockCharts]);

    // 주식 데이터에서 endPrice만 추출
    useEffect(() => {
        if (stockData) {
            const prices = Object.values(stockData).map((price) => [
                price['startPrice'],
                price['highPrice'],
                price['lowPrice'],
                price['endPrice'],
            ]);
            setdataPrices(prices);
        }
    }, [stockData]);

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

    return (
        <>{dataPrices && <ReactApexChart type="candlestick" options={options} series={series} />}</>
    );
};
