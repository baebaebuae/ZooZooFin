import styled from 'styled-components';
import ReactApexChart from 'react-apexcharts';
import { useEffect, useState } from 'react';
import useStockStore from '@components/stock/common/store/StockStore';

const GraphWrapper = styled.div`
    padding-top: 10px;
`;

// 임시 데이터
const tempData = [
    {
        name: '테스트 기업1',
        percentage: 7.15,
    },
    {
        name: '테스트 기업2',
        percentage: 5.97,
    },
    {
        name: '테스트 기업3',
        percentage: 5.26,
    },
    {
        name: '테스트 기업4',
        percentage: 4.78,
    },
    {
        name: '테스트 기업5',
        percentage: 4.7,
    },
    {
        name: '테스트 기업6',
        percentage: 4.4,
    },
    {
        name: '테스트 기업7',
        percentage: 4.21,
    },
    {
        name: '테스트 기업8',
        percentage: 4.2,
    },
    {
        name: '테스트 기업9',
        percentage: 4.18,
    },
    {
        name: '테스트 기업10',
        percentage: 4.13,
    },
];

export const ETFGraph = () => {
    const { clickedStockDetail } = useStockStore();

    const [stockData, setStockData] = useState(tempData);
    const [componentItem, setComponentItem] = useState([]);

    useEffect(() => {
        if (clickedStockDetail && Object.keys(clickedStockDetail).length > 0) {
            setStockData(clickedStockDetail.elements);
        } else {
            setStockData(tempData);
        }
    }, [clickedStockDetail]);

    useEffect(() => {
        if (stockData) {
            setComponentItem(stockData);
        }
    }, [stockData]);

    const options = {
        chart: {
            type: 'bar',
            height: 150,
            stacked: true,
            stackType: '100%',
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: true,
            },
        },
        title: {
            text: '구성 종목 바 차트',
            align: 'left',
            style: {
                fontSize: '15px',
                fontWeight: 'bold',
            },
        },
        xaxis: {
            categories: ['구성 종목 비율'],
        },
        yaxis: {
            show: false,
        },

        legend: {
            position: 'bottom',
            horizontalAlign: 'center',
        },
    };

    const series =
        componentItem.length > 0
            ? componentItem.map((item) => ({
                  name: item.name,
                  data: [item.percentage],
              }))
            : [];
    if (componentItem.length > 0) {
        return (
            <GraphWrapper>
                <ReactApexChart options={options} series={series} type="bar" height={350} />
            </GraphWrapper>
        );
    }

    return null;
};

export default ETFGraph;
