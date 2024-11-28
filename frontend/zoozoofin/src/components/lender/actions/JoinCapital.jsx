import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MessageBox } from '@components/root/messageBox';
import { NormalIcon } from '@components/root/icon';
import CharBoar from '@assets/images/characters/boar.png';

import ProductCard from '@components/lender/ProductCard';
import { Button } from '@components/root/buttons';

import useCapitalStore from '@components/lender/store/CapitalStore';

const Message = styled(MessageBox)`
    width: 75%;
`;

const JoinCapital = ({ onProductConfirm }) => {
    const { isDone, setIsDone } = useState(false);
    const { loanAmount, loanPeriod } = useCapitalStore();

    return (
        <>
            <Message>
                <NormalIcon icon={CharBoar} />
                얼마나 대출할거야?
            </Message>
            <ProductCard />

            {loanAmount !== 0 && (
                <Button
                    size={'large'}
                    color={'primaryDeep'}
                    $isBorder={true}
                    onClick={onProductConfirm}
                >
                    다음
                </Button>
            )}
        </>
    );
};

export default JoinCapital;
