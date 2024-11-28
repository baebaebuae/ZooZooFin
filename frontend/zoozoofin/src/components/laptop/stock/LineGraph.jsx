import styled from 'styled-components';

import ReactApexChart from 'react-apexcharts';
import useStockStore from '@components/stock/common/store/StockStore';
import { useEffect, useState } from 'react';
import useUserStore from '../../../stores/useUserStore';

const GraphWrapper = styled.div`
    padding-top: 10px;
`;

export const LineGraph = ({ stockData }) => {
    // turn 연결 후 그래프 처리하기
    const [data, setData] = useState(null);
    const { turn } = useUserStore();
    const [closePrices, setClosePrices] = useState(null);

    // const categories = Array.from({ length: turn + 2 }, (_, index) => index - 1);

    useEffect(() => {
        const nowTurn = stockData.slice(0, turn + 25);
        setData(nowTurn);
    }, [turn]);

    // -25부터 turn까지의 카테고리 생성
    const categories = Array.from({ length: turn + 26 }, (_, index) => index - 24);
    // 주식 데이터에서 endPrice만 추출
    useEffect(() => {
        if (data) {
            const prices = Object.values(data).map((item) => (item ? item['price'] : 0));
            console.log(prices);
            setClosePrices(prices);
        }
    }, [data, turn]);

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
                // 주식 차트 그래프에서만 사용하는 색상 적용
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
            categories: categories,
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
                {closePrices && <ReactApexChart options={options} series={series} />}
            </GraphWrapper>
        </>
    );
};

export default LineGraph;
