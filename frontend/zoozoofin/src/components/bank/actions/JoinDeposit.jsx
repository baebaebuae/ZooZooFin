import { useState } from 'react';
import styled from 'styled-components';

import { ProductCards } from '@components/bank/ProductCards';
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
    const handleClick = () => {
        console.log('클릭됨');
        setCurrentCard(currentCard + 1);
    };

    const renderComponent = () => {
        switch (currentCard) {
            case 1:
                return <ProductCards handleClick={handleClick} />;
            case 2:
                return <ProductJoinCard />;
            case 3:
                return <ProductCheckCard />;
            case 4:
                return <div>Stamp 모달</div>;

            default:
                return <div>해당하는 페이지가 없어요. 현재 Action을 확인해주세요.</div>;
        }
    };
    const [currentCard, setCurrentCard] = useState(1);

    const joinGuideMessages = {
        1: '가입할 상품을 골라봐.',
        2: '얼마를 저축할거야?',
        3: '가입 정보를 확인하고 서명해줘.',
    };

    return (
        <Block>
            <MessageBox>
                <NormalIcon icon={IconChick} />
                <div>{joinGuideMessages[currentCard]}</div>
            </MessageBox>
            <button onClick={handleClick}>다음</button>

            {renderComponent()}
        </Block>
    );
};

export default JoinDeposit;
