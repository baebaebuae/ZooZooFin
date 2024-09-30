import styled from 'styled-components';

import ReactApexChart from 'react-apexcharts';
import StockData from '@components/stock/TestStock';

const GraphWrapper = styled.div`
    padding-top: 10px;
`;

export const LineGraph = ({ turn }) => {
    // 현재 turn 까지의 데이터 가져오기
    const getNowStockData = (turn) => {
        const now = turn + 25;
        const entries = Object.entries(StockData.data).slice(0, now);
        const NowData = Object.fromEntries(entries);
        return NowData;
    };

    const data = getNowStockData(turn);
    const dates = Object.keys(data);

    const closePrices = Object.values(data).map((item) => item.close);

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
        <GraphWrapper>
            <ReactApexChart options={options} series={series} />
        </GraphWrapper>
    );
};

export default LineGraph;
