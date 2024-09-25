import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Input } from './root/input';
import { ButtonBase } from './root/buttons';

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
        onSavingsAmountChange(savingsAmount);
    }, [savingsAmount, onSavingsAmountChange]);

    return (
        <InputBlock>
            <Input
                title={title}
                value={savingsAmount === 0 ? '금액을 입력해줘.' : savingsAmount}
                unit={isSavings ? ' 원' : ' 원 / 턴'}
                hasValue={savingsAmount !== 0}
                onDelete={handleDelete}
            ></Input>
            <ButtonBlock>
                <ButtonBase size={'small'} color={'primaryDeep'} onClick={() => addAmount(amount1)}>
                    {`${amount1 / 10000}만`}
                </ButtonBase>
                <ButtonBase size={'small'} color={'primaryDeep'} onClick={() => addAmount(amount2)}>
                    {`${amount2 / 10000}만`}
                </ButtonBase>
                <ButtonBase size={'small'} color={'primaryDeep'} onClick={() => addAmount(amount3)}>
                    {`${amount3 / 10000}만`}
                </ButtonBase>
                <ButtonBase size={'small'} color={'primaryDeep'} onClick={() => addAmount(amount4)}>
                    {`${amount4 / 10000}만`}
                </ButtonBase>
                <ButtonBase size={'small'} color={'tertiary'} onClick={handleMaxAmount}>
                    MAX
                </ButtonBase>
            </ButtonBlock>
        </InputBlock>
    );
};
