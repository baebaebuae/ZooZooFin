import styled from 'styled-components';

import ReactApexChart from 'react-apexcharts';
import useStockStore from '@components/stock/common/store/StockStore';
import { useEffect, useState } from 'react';

const GraphWrapper = styled.div`
    padding-top: 10px;
`;

export const LineGraph = ({ turn }) => {
    const { clickedStockDetail } = useStockStore();
    // turn 연결 후 그래프 처리하기

    const [stockData, setStockData] = useState(0);
    const [data, setData] = useState(null);
    const [closePrices, setClosePrices] = useState(null);

    useEffect(() => {
        if (clickedStockDetail) {
            setStockData(clickedStockDetail.chartDetail);
        }
    }, [clickedStockDetail]);

    useEffect(() => {
        if (stockData) {
            setData(getNowStockData(turn));
        }
    }, [stockData]);

    useEffect(() => {
        if (data) {
            setClosePrices(Object.values(data).map((item) => item.close));
        }
    }, [data]);

    // 현재 turn 까지의 데이터 가져오기
    const getNowStockData = (turn) => {
        // const now = turn + 25;
        const now = turn;
        const entries = Object.entries(stockData).slice(0, now);
        const NowData = Object.fromEntries(entries);
        return NowData;
    };

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
            dropShadow: {
                enabled: true,
                top: 0,
                left: 0,
                blur: 3,
                color: ['#ff6a00'],
                opacity: 0.5,
            },
        },
        title: {
            text: '주식차트',
            align: 'left',
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            style: {
                fontSize: '15px',
                fontWeight: 'bold',
            },
        },
        dataLabels: {
            enabled: false,
        },
        colors: ['#FF3E3E'],
        stroke: {
            curve: 'smooth',
            width: [4],
        },
        grid: {
            show: false,
        },
        xaxis: {
            labels: {
                show: false,
            },
            // categories: dates,
        },
        yaxis: {
            show: false,
        },
    };

    const series = [
        {
            name: '🥕',
            data: closePrices,
        },
    ];

    // JSX를 반환하여 차트 렌더링
    return (
        <>
            <GraphWrapper>
                {data && <ReactApexChart options={options} series={series} />}
            </GraphWrapper>
        </>
    );
};

export default LineGraph;
