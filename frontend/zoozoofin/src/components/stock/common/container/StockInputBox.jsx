import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Input } from '@components/root/input';
import { InputButton } from '@components/stock/common/button/Button';

const InputBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 10px 0px;
`;

const ButtonBlock = styled.div`
    display: flex;
    gap: 4px;
`;

export const StockInputBox = ({
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
    const handleMaxAmount = () => setSavingsAmount(maxAmount);

    useEffect(() => {
        onSavingsAmountChange(savingsAmount);
    }, [savingsAmount, onSavingsAmountChange]);

    return (
        <InputBlock>
            <Input
                title={title}
                value={savingsAmount === 0 ? '구매할 주를 입력해줘.' : savingsAmount}
                unit={'주'}
                hasValue={savingsAmount !== 0}
                onDelete={handleDelete}
            ></Input>
            <ButtonBlock>
                <InputButton
                    size={'small'}
                    color={'primaryDeep'}
                    onClick={() => addAmount(amount1)}
                >
                    {`${amount1}주`}
                </InputButton>
                <InputButton
                    size={'small'}
                    color={'primaryDeep'}
                    onClick={() => addAmount(amount2)}
                >
                    {`${amount2}주`}
                </InputButton>
                <InputButton
                    size={'small'}
                    color={'primaryDeep'}
                    onClick={() => addAmount(amount3)}
                >
                    {`${amount3}주`}
                </InputButton>
                <InputButton
                    size={'small'}
                    color={'primaryDeep'}
                    onClick={() => addAmount(amount4)}
                >
                    {`${amount4 / 1}주`}
                </InputButton>
                <InputButton size={'small'} color={'tertiary'} onClick={handleMaxAmount}>
                    MAX
                </InputButton>
            </ButtonBlock>
        </InputBlock>
    );
};

export default StockInputBox;
