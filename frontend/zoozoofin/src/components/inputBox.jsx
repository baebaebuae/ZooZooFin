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

const BlockTitle = styled.div`
    font-size: 16px;
    color: gray;
`;

export const InputBox = () => {
    return (
        <InputBlock>
            <BlockTitle>저축할 금액</BlockTitle>
            <Input></Input>
            <ButtonBlock>
                <TinyButton>1만</TinyButton>
                <TinyButton>5만</TinyButton>
                <TinyButton>10만</TinyButton>
                <TinyButton>50만</TinyButton>
                <TinyButton>Max</TinyButton>
            </ButtonBlock>
        </InputBlock>
    );
};
