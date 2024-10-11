import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Chart from 'react-apexcharts';
import { X } from 'lucide-react';
import IconCarrot from '@assets/images/icons/icon_carrot.png';
import { NormalIcon } from '@components/root/icon';
import { getApiClient } from "@/stores/apiClient";

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background-color: #f4f4f4;
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow:
        0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);
    max-width: 80vw;
    max-height: 430px;
    overflow-y: auto;
    position: relative;
    top: 50px; 
`;

const CloseButton = styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
`;

const Title = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    text-align: center;
`;

const Subtitle = styled.p`
    font-size: 1.2rem;
    color: #333;
    margin-top: 1rem;
    font-weight: 400;
`;

const Section = styled.div`
    margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
    font-size: 1.3rem;
    font-weight: bold;
    margin-bottom: 1rem;
`;

const ChartContainer = styled.div`
    margin-bottom: 1.3rem;
    width: 100%;
`;

const HighlightText = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    color: ${({ color }) => color || '#000'};
    margin-top: 0.5rem;
`;

const TextContent = styled.p`
    font-size: 1.2rem;
    margin-bottom: 1rem;
`;

const NewsSection = styled.div`
    margin-top: 1.5rem;
`;

const NewsContent = styled.p`
    font-size: 1.2rem;
    margin-left: 1.5rem;
`;

const LoadingModalContent = styled(ModalContent)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 200px;
`;

const LoadingText = styled.p`
    font-size: 1.5rem;
    margin-bottom: 1rem;
`;

const LoadingSpinner = styled.div`
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

const LoadingModal = ({ onClose }) => (
    <ModalOverlay onClick={onClose}>
        <LoadingModalContent onClick={(e) => e.stopPropagation()}>
            <LoadingText>주가 예측중...</LoadingText>
            <LoadingSpinner />
        </LoadingModalContent>
    </ModalOverlay>
);

const Modal = ({ onClose, data }) => {
    if (!data || !data.price || !Array.isArray(data.price)) {
        console.error('Invalid data structure:', data);
        return <div>Error: Invalid data structure</div>;
    }

    const formattedPrice = data.price.map((price) => Math.floor(price));
    const formattedPredictedPrice = Math.floor(data.predictedPrice || 0);

    const maxSentiment = Math.max(
        data.positiveRatio || 0,
        data.negativeRatio || 0,
        data.neutralRatio || 0
    );
    const maxSentimentLabel =
        maxSentiment === (data.positiveRatio || 0)
            ? '긍정적'
            : maxSentiment === (data.negativeRatio || 0)
              ? '부정적'
              : '중립적';

    const pieOptions = {
        labels: ['부정적', '중립적', '긍정적'],
        colors: ['#FF6347', '#FFD700', '#32CD32'],
        legend: { show: false },
        plotOptions: {
            pie: {
                donut: {
                    size: '70%',
                },
            },
        },
    };

    const pieSeries = [data.negativeRatio || 0, data.neutralRatio || 0, data.positiveRatio || 0];

    const lineOptions = {
        chart: {
            id: 'price-chart',
            toolbar: { show: false },
        },
        xaxis: {
            categories: ['1', '2', '3', '4', '5', '6', '7'],
        },
        stroke: { curve: 'smooth' },
        annotations: {
            points: [
                {
                    x: '7',
                    y: formattedPredictedPrice,
                    marker: {
                        size: 6,
                        fillColor: '#FF4560',
                        strokeColor: '#FF4560',
                        shape: 'circle',
                    },
                    label: {
                        borderColor: '#FF4560',
                        offsetY: -10,
                        style: {
                            color: '#fff',
                            background: '#FF4560',
                        },
                        text: '예상 주가',
                    },
                },
            ],
        },
    };

    const lineSeries = [
        {
            name: '주가 데이터',
            data: [...formattedPrice, formattedPredictedPrice],
        },
    ];

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={onClose}>
                    <X size={24} />
                </CloseButton>
                <Title>{data.newsTitle}</Title>
                <hr />
                <ChartContainer>
                    <Chart options={pieOptions} series={pieSeries} type="donut" height={300} />
                </ChartContainer>
                <HighlightText color={maxSentimentLabel === '긍정적' ? '#32CD32' : '#FF6347'}>
                    {maxSentimentLabel} {maxSentiment.toFixed(2)}%
                </HighlightText>
                <Subtitle>{data.summary}</Subtitle>
                <hr />
                <Section>
                    <SectionTitle>주가 예상 그래프</SectionTitle>
                    <TextContent>예상 주가: {formattedPredictedPrice}<NormalIcon icon={IconCarrot}/></TextContent>
                    <ChartContainer>
                        <Chart options={lineOptions} series={lineSeries} type="line" height={300} />
                    </ChartContainer>
                </Section>
                <hr />
                <NewsSection>
                    <div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>긍정적인 문장</h3>
                        {data.positiveSentences.map((sentence, index) => (
                            <NewsContent key={index}>
                                {index + 1}. {sentence.sentence}
                            </NewsContent>
                        ))}
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>부정적인 문장</h3>
                        {data.negativeSentences.map((sentence, index) => (
                            <NewsContent key={index}>
                                {index + 1}. {sentence.sentence}
                            </NewsContent>
                        ))}
                    </div>
                </NewsSection>
            </ModalContent>
        </ModalOverlay>
    );
};

const StockHint = ({ isOpen, onClose, stockId }) => {
    const [stockData, setStockData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const defaultData = {
        newsTitle: '지분 860억 받고…개굴전자 기술 해외에 빼돌린 전 직원들 구속 기소',
        negativeRatio: 0.0,
        negativeSentences: [],
        neutralRatio: 80.94051214325934,
        positiveRatio: 19.059487856740652,
        positiveSentences: [
            {
                score: 0.9985945820808411,
                sentence: "매 터는 인터넷 프로 토 콜 (IP) 기반 스마트 홈 통신 표준 기술이다."
            },
            {
                score: 0.9985324144363403,
                sentence: "개굴 전자가 1년에 공급하는 제품만 5억대다."
            },
            {
                score: 0.9906037449836731,
                sentence: "스마트 홈 기기를 위한 개방형 통신 프로 토 콜 규격을 개발하고 표준화하는 단체인 글로벌 표준 연합 (CSA ·Connectivity Standards Alliance) 이 주도하고 있다."
            }
        ],
        predictedPrice: 61560.33793501819,
        summary: "한 부회장은 앱으로 제어할 수 있는 기기 표준을 다른 기업들과 협업해서 만들겠다는 구상이며 스마트싱스 원년 선언한 부회장은 독일 베를린에서 국내 기자간담회를 열고 스마트싱스",
        price: [61545, 61560, 61550, 61565, 61560],
    };

    useEffect(() => {
        const fetchStockData = async () => {
            if (!isOpen) return;
    
            setIsLoading(true);
            try {
                const apiClient = getApiClient();
                const response = await apiClient.get(`/stock/hint/${stockId}`);
                const data = response.data.body;
                console.log('API response:', data);
                if (data && Object.keys(data).length > 0 && data.price && Array.isArray(data.price)) {
                    setStockData(data);
                } else {
                    console.log('Using default data due to invalid API response');
                    setStockData(defaultData);
                }
            } catch (err) {
                console.error('Error fetching stock data:', err);
                setError(err);
                console.log('Using default data due to API error');
                setStockData(defaultData);
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchStockData();
    }, [isOpen, stockId]);

    if (!isOpen) return null;
    
    if (isLoading) {
        return <LoadingModal onClose={onClose} />;
    }
    
    if (error) console.error('Error occurred, using default data');

    return stockData ? <Modal onClose={onClose} data={stockData} /> : null;
};

export default StockHint;