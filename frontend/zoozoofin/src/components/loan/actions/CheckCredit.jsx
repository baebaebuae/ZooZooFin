import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Loading } from '@components/root/loading';
import CheckCreditCard from '../CheckCreditCard';

// import { getApiClient } from '@stores/apiClient';

import { useCreditStore } from '@stores/useCreditStore';

const Block = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const CheckCredit = ({ goToScript }) => {
    const [currentCard, setCurrentCard] = useState(1);
    // const [credit, setCredits] = useState([]);

    const { credit, fetchCredit } = useCreditStore();

    // // 신용 등급 받아오기
    // const fetchCredit = async () => {
    //     const apiClient = getApiClient();

    //     try {
    //         const res = await apiClient.get('/loan/check');
    //         console.log(res.data.body);
    //         setCredits(res.data.body);
    //     } catch (error) {
    //         return error;
    //     }
    // };

    useEffect(() => {
        fetchCredit();
    }, [fetchCredit]);

    useEffect(() => {}, [credit]);

    const goToNextCard = () => {
        setCurrentCard(currentCard + 1);
    };

    // 도장 찍은 후 -로딩중- 모달 뜨고 사라지는 함수
    useEffect(() => {
        if (currentCard === 1) {
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
                    return <Loading content={'대출 가능 여부 조회중'} />;
                } else if (currentCard === 2) {
                    return credit ? (
                        <CheckCreditCard
                            goToScript={() => goToScript(credit.characterCredit)}
                            // goToScript={() => goToScript(7)} // 낮은 신용등급일 때 테스트
                            isAvailable={credit.isAvailable}
                            loanLimit={credit.loanLimit ? credit.loanLimit.toLocaleString() : '0'}
                            characterCredit={credit.characterCredit ? credit.characterCredit : '0'}
                            loanAvailable={
                                credit.loanAvailable ? credit.loanAvailable.toLocaleString() : '0'
                            }
                        />
                    ) : (
                        <div>신용 등급 정보가 없어요.</div>
                    );
                }
            })()}
        </Block>
    );
};

export default CheckCredit;
