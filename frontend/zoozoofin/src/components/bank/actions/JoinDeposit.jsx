import { useState } from 'react';
import styled from 'styled-components';

import { ProductCard } from '@components/bank/ProductCard';
import { ProductJoinCard } from '@components/bank/ProductJoinCard';
import { ProductCheckCard } from '@components/bank/ProductCheckCard';

import { MessageBox } from '@components/root/messageBox';
import { NormalIcon } from '@components/root/icon';
import IconChick from '@assets/images/icons/icon_chick.svg?react';

const Block = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const JoinDeposit = () => {
    const [currentCard, setCurrentCard] = useState(1);

    const joinDepositActions = {
        1: ProductCard,
        2: ProductJoinCard,
        3: ProductCheckCard,
        4: 'Stamp',
    };

    const joinGuideMessages = {
        1: '가입할 상품을 골라봐.',
        2: '얼마를 저축할거야?',
        3: '가입 정보를 확인하고 서명해줘.',
    };

    const handleClick = () => {
        console.log('클릭됨');
        setCurrentCard(currentCard + 1);
    };

    return (
        <Block>
            <MessageBox>
                <NormalIcon icon={IconChick} />
                <div>{joinGuideMessages[currentCard]}</div>
            </MessageBox>

            <button onClick={handleClick}>다음</button>

            <ProductCard
                productName={'주주예금'}
                turn={5}
                rate={3}
                isLoan={false}
                handleClick={handleClick}
            />
        </Block>
    );
};

export default JoinDeposit;

// 데이터 이런 식으로 들어옴
//   "body": [
//     {
//       "savingsTypeId": 0,
//       "savingsPeriod": 0,
//       "savingsRate": 0,
//       "savingsName": "string",
//       "savingsImgUrl": "string"
//     }
//   ]
