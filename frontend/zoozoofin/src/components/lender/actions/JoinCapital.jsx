import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MessageBox } from '@components/root/messageBox';
import { NormalIcon } from '@components/root/icon';
import CharBoar from '@assets/images/characters/boar.png';

import ProductCard from '@components/lender/ProductCard';
import { Button } from '@components/root/buttons';

const Message = styled(MessageBox)`
    width: 75%;
`;

const JoinCapital = ({ onProductConfirm }) => {
    return (
        <>
            <Message>
                <NormalIcon icon={CharBoar} />
                얼마를 대출할거야?
            </Message>
            <ProductCard />
            <Button
                size={'large'}
                color={'primaryDeep'}
                $isBorder={true}
                onClick={onProductConfirm}
            >
                다음
            </Button>
        </>
    );
};

export default JoinCapital;
