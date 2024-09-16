import { useState } from 'react';
import styled from 'styled-components';
import { Input } from './root/input';
import { TinyButton } from './root/buttons';

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

export const InputBox = ({ title, maxAmount }) => {
    const [savingsAmount, setSavingsAmount] = useState(0);

    const addAmount = (value) =>
        setSavingsAmount((prev) => {
            const newAmount = prev + value;
            return newAmount > maxAmount ? maxAmount : newAmount;
        });

    const handleDelete = () => setSavingsAmount(0);
    const handleMaxAmount = () => setSavingsAmount(maxAmount);

    return (
        <InputBlock>
            <Input
                title={title}
                value={savingsAmount === 0 ? '금액을 입력해줘.' : savingsAmount}
                unit={' 원'}
                hasValue={savingsAmount !== 0}
                onDelete={handleDelete}
            ></Input>
            <ButtonBlock>
                <TinyButton onClick={() => addAmount(500000)}>50만</TinyButton>
                <TinyButton onClick={() => addAmount(1000000)}>100만</TinyButton>
                <TinyButton onClick={() => addAmount(5000000)}>500만</TinyButton>
                <TinyButton onClick={() => addAmount(10000000)}>1000만</TinyButton>
                <TinyButton onClick={handleMaxAmount}>MAX</TinyButton>
            </ButtonBlock>
        </InputBlock>
    );
};
