import { useState } from 'react';
import styled from 'styled-components';

import { ProductTerminationCard } from '@components/bank/ProductTerminationCard';
import { ProductTerminationDetailCard } from '@components/bank/ProductTerminationDetailCard';

import { MessageBox } from '@components/root/messageBox';
import { NormalIcon } from '@components/root/icon';
import IconChick from '@assets/images/icons/icon_chick.svg?react';

const Block = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const TerminateProduct = () => {
    const [currentCard, setCurrentCard] = useState(1);

    const terminateDepositActions = {
        1: ProductTerminationCard,
        2: ProductTerminationDetailCard,
        3: 'Stamp',
    };

    const terminateGuideMessages = {
        1: '해지할 상품을 골라줘.',
        2: '해지할 상품 정보를 확인하고 서명해줘.',
    };

    const handleClick = () => {
        console.log('클릭됨');
        setCurrentCard(currentCard + 1);
    };

    return (
        <Block>
            <MessageBox>
                <NormalIcon icon={IconChick} />
                <div>{terminateGuideMessages[currentCard]}</div>
            </MessageBox>

            <ProductTerminationCard
                productName={'주주적금'}
                turn={5}
                rate={3}
                currentTurn={10}
                restTurn={2}
                savingsAmount={3000000}
                ifSpecial={false}
            />
            <button onClick={handleClick}>다음</button>
        </Block>
    );
};

export default TerminateProduct;
