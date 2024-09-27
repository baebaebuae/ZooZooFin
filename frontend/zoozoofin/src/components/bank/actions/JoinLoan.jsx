import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Loading } from '@components/root/loading';

import { MessageBox } from '@components/root/messageBox';
import { NormalIcon } from '@components/root/icon';
import IconChick from '@assets/images/icons/icon_chick.svg?react';

import { getApiClient } from '@stores/apiClient';

const Block = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const JoinLoan = ({ productType }) => {
    const [currentCard, setCurrentCard] = useState(1);

    const [products, setProducts] = useState([]);
    const [savingsAmount, setSavingsAmount] = useState(null);
    const [expectedFinalAmount, setExpectedFinalAmount] = useState(null);

    // 상품 정보 받아오기
    const fetchProducts = async () => {
        const apiClient = getApiClient();

        try {
            const res = await apiClient.get(
                `/${productType}`,
                {},
                {
                    headers: { animalId: 1 },
                }
            );

            console.log(res.data.body);
            setProducts(res.data.body);
        } catch (error) {
            // console.error('error: ', error);
            return error;
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {}, [products]);

    // 도장 찍은 후 -로딩중- 모달 뜨고 사라지는 함수
    useEffect(() => {
        if (currentCard === 4) {
            const timer = setTimeout(() => {
                goToNextCard();
            }, 2000);

            return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
        }
    }, [currentCard]);

    const goToNextCard = () => {
        setCurrentCard(currentCard + 1);
    };

    const saveAmount = (savingsAmount, expectedFinalAmount) => {
        goToNextCard();
        setSavingsAmount(savingsAmount);
        setExpectedFinalAmount(expectedFinalAmount);
    };

    const joinGuideMessages = {
        1: '얼마를 대출할거야?',
        2: '내용을 확인하고 아래에 서명해.',
    };

    return (
        <Block>
            {currentCard < 4 && (
                <MessageBox>
                    <NormalIcon icon={IconChick} />
                    <div>{joinGuideMessages[currentCard]}</div>
                </MessageBox>
            )}

            {(() => {
                if (currentCard === 1) {
                    return <div>대출카드</div>;
                } else if (currentCard === 4) {
                    return <Loading content={'대출 처리중'} />;
                }
            })()}
        </Block>
    );
};

export default JoinLoan;
