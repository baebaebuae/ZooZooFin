import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Input } from './root/input';
import { Button } from './root/buttons';
import { ProductJoinInfo } from '@components/root/productDetailInfo';

const InputBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
`;

const ButtonBlock = styled.div`
    display: flex;
    gap: 4px;
`;

export const InputBox = ({
    title,
    amount1,
    amount2,
    amount3,
    amount4,
    maxAmount,
    onSavingsAmountChange,
    isSavings,
}) => {
    const [savingsAmount, setSavingsAmount] = useState(0);

    const addAmount = (value) =>
        setSavingsAmount((prev) => {
            const newAmount = prev + value;
            return newAmount > maxAmount ? maxAmount : newAmount;
        });

    const handleDelete = () => setSavingsAmount(0);
    const handleMaxAmount = () => setSavingsAmount(maxAmount);

    useEffect(() => {
        if (savingsAmount > 0) {
            // console.log('savingsAmount: ', savingsAmount);
            onSavingsAmountChange(savingsAmount);
        }
    }, [savingsAmount, onSavingsAmountChange]);

    return (
        <InputBlock>
            <Input
                title={title}
                value={savingsAmount === 0 ? '금액을 입력해줘.' : savingsAmount}
                unit={isSavings ? ' 원 / 턴' : ' 원'}
                hasValue={savingsAmount !== 0}
                onDelete={handleDelete}
            ></Input>
            <ButtonBlock>
                <Button size={'small'} color={'primaryDeep'} onClick={() => addAmount(amount1)}>
                    {`${amount1 / 10000}만`}
                </Button>
                <Button size={'small'} color={'primaryDeep'} onClick={() => addAmount(amount2)}>
                    {`${amount2 / 10000}만`}
                </Button>
                <Button size={'small'} color={'primaryDeep'} onClick={() => addAmount(amount3)}>
                    {`${amount3 / 10000}만`}
                </Button>
                <Button size={'small'} color={'primaryDeep'} onClick={() => addAmount(amount4)}>
                    {`${amount4 / 10000}만`}
                </Button>
                <Button size={'small'} color={'tertiary'} onClick={handleMaxAmount}>
                    MAX
                </Button>
            </ButtonBlock>
        </InputBlock>
    );
};

const ButtonBlockLoan = styled.div`
    display: flex;
    gap: 4px;
`;

export const InputBoxLoan = ({
    title,
    amount1,
    amount2,
    amount3,
    amount4,
    maxAmount,
    onSavingsAmountChange,
}) => {
    const [savingsAmount, setSavingsAmount] = useState(0);

    const addAmount = (value) =>
        setSavingsAmount((prev) => {
            const newAmount = prev + value;
            return newAmount > maxAmount ? maxAmount : newAmount;
        });

    const handleDelete = () => setSavingsAmount(0);
    // const handleMaxAmount = () => setSavingsAmount(maxAmount);

    useEffect(() => {
        onSavingsAmountChange(savingsAmount);
    }, [savingsAmount, onSavingsAmountChange]);

    return (
        <InputBlock>
            <ProductJoinInfo
                isLoan={true}
                infoTitle={title}
                infoContent={`${savingsAmount.toLocaleString()} 원`}
            />

            <ButtonBlockLoan>
                <Button size={'small'} color={'primaryDeep'} onClick={() => addAmount(amount1)}>
                    {`${amount1 / 10000}만`}
                </Button>
                <Button size={'small'} color={'primaryDeep'} onClick={() => addAmount(amount2)}>
                    {`${amount2 / 10000}만`}
                </Button>
                <Button size={'small'} color={'primaryDeep'} onClick={() => addAmount(amount3)}>
                    {`${amount3 / 10000}만`}
                </Button>
                <Button size={'small'} color={'primaryDeep'} onClick={() => addAmount(amount4)}>
                    {`${amount4 / 10000}만`}
                </Button>
                <Button size={'small'} color={'gray'} onClick={handleDelete}>
                    C
                </Button>
            </ButtonBlockLoan>
        </InputBlock>
    );
};
