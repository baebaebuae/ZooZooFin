import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Loading } from '@components/root/loading';
import { LoanInfoCard } from '@components/loan/LoanInfoCard';
import { LoanRepayDetailCard } from '@components/loan/LoanRepayDetailCard';

import { getApiClient } from '@stores/apiClient';

const Block = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const RepayLoan = ({ goToScript }) => {
    const [currentCard, setCurrentCard] = useState(1);
    const [products, setProducts] = useState([]);

    // 대출 상품 받아오기
    const fetchProducts = async () => {
        const apiClient = getApiClient();

        try {
            const res = await apiClient.get('/loan/my');
            console.log(res.data.body);
            setProducts(res.data.body);
        } catch (error) {
            return error;
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {}, [products]);

    const goToNextCard = () => {
        setCurrentCard(currentCard + 1);
    };

    // 도장 찍은 후 -로딩중- 모달 뜨고 사라지는 함수
    useEffect(() => {
        if (currentCard === 3) {
            const timer = setTimeout(() => {
                goToNextCard();
            }, 3000); // 대출 가능 여부 평가 - 다른 모달보다 1초 길게 설정

            return () => clearTimeout(timer);
        }
    }, [currentCard]);

    return (
        <Block>
            {(() => {
                if (currentCard === 1) {
                    return (
                        <>
                            <LoanInfoCard
                                charName={'토랭이'}
                                totalLoan={3000000}
                                restLoan={1000000}
                            />
                            <LoanRepayDetailCard
                                loanNumber={2}
                                loanType={2}
                                isRepayAvailable={true}
                                loanRate={4}
                                payBackTurn={8}
                                loanPeriod={20}
                                loanAmount={1000000}
                                loanRemain={300000}
                                warning={false}
                            />
                        </>
                    );
                } else if (currentCard === 2) {
                    return <></>;
                } else if (currentCard === 5) {
                    return <Loading content={'대출 상환 처리중'} />;
                }
            })()}
        </Block>
    );
};

export default RepayLoan;
