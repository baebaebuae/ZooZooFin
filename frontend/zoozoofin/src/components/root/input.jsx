import styled from 'styled-components';
import Delete from '@assets/images/icons/icon_delete.svg?react';

const InputBox = styled.div`
    display: flex;
    width: 250px;
    height: 50px;
    gap: 4px;
    justify-content: center;
    align-items: center;
    border-radius: 40px;
    background: var(--Background, #ebf0f4);
    color: ${({ theme }) => theme.colors.primaryShadow};
`;

export const Input = ({ value, unit, hasValue }) => {
    return (
        <>
            <InputBox>
                {value}
                {unit}
                {hasValue ? null : <Delete />}
            </InputBox>
        </>
    );
};
