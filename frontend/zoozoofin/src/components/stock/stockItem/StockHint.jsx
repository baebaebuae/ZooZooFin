import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Chart from 'react-apexcharts';
import { X } from 'lucide-react';
import IconCarrot from '@assets/images/icons/icon_carrot.png';
import { NormalIcon } from '@components/root/icon';

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
    max-height: 80vh;
    overflow-y: auto;
    position: relative;
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

const Modal = ({ onClose, data }) => {
    const formattedPrice = data.price.map((price) => Math.floor(price));
    const formattedPredictedPrice = Math.floor(data.predicted_price);

    const maxSentiment = Math.max(data.positive_ratio, data.negative_ratio, data.neutral_ratio);
    const maxSentimentLabel =
        maxSentiment === data.positive_ratio
            ? '긍정적'
            : maxSentiment === data.negative_ratio
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

    const pieSeries = [data.negative_ratio, data.neutral_ratio, data.positive_ratio];

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
                <Title>{data.news_title}</Title>
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
                        {data.positive_sentences.map((sentence, index) => (
                            <NewsContent key={index}>
                                {index + 1}. {sentence.sentence}
                            </NewsContent>
                        ))}
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>부정적인 문장</h3>
                        {data.negative_sentences.map((sentence, index) => (
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
        news_title: '지분 860억 받고…개굴전자 기술 해외에 빼돌린 전 직원들 구속 기소',
        negative_ratio: 46.58,
        neutral_ratio: 44.17,
        positive_ratio: 9.25,
        negative_sentences: [
            {
                score: 0.9997,
                sentence:
                    '개굴전자가 약 4조 원을 투입해 개발한 반도체 핵심 기술을 해외에 빼돌린 혐의를 받는 개굴전자 전 직원들이 구속 상태로 재판에 넘겨졌다.',
            },
            {
                score: 0.9996,
                sentence:
                    '서울 중앙 지검 정보기술범죄 수사부는 해외 반도체 회사 청두가 오전(CHJS) 대표 최 모 씨와 개발실장 오 모 씨를 구속 기소했다.',
            },
            {
                score: 0.9994,
                sentence: '개굴전자가 독자 개발한 20 나노급 D램 기술을 부정 사용한 혐의를 받는다.',
            },
        ],
        positive_sentences: [
            {
                score: 0.9921,
                sentence:
                    '글로벌 반도체 회사들도 통상 4~5년이 소요되는 D램 공정기술을 1년 6개월 만에 개발했다.',
            },
        ],
        predicted_price: 97830.52,
        summary:
            '개굴전자가 개발한 반도체 핵심 기술을 해외에 빼돌린 혐의를 받는 개굴전자 전 직원들이 구속 상태로 재판에 넘겨졌다.',
        price: [98000, 98100, 98300, 98000, 98200, 98000],
    };

    useEffect(() => {
        const fetchStockData = async () => {
            if (!isOpen) return;

            setIsLoading(true);
            try {
                const response = await fetch(`/stock/hint/${stockId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch stock data');
                }
                const data = await response.json();
                setStockData(data);
            } catch (err) {
                console.error('Error fetching stock data:', err);
                setError(err);
                // API 호출 실패 시 임시 데이터 사용
                setStockData(defaultData);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStockData();
    }, [isOpen, stockId]);

    if (!isOpen) return null;
    if (isLoading) return <div>Loading...</div>;
    if (error) console.error('Error occurred, using default data');

    return <Modal onClose={onClose} data={stockData || defaultData} />;
};

export default StockHint;