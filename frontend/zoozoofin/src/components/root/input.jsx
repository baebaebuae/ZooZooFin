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

const BlockTitle = styled.div`
    font-size: 16px;
    color: gray;
`;

export const Input = ({ title, value, unit, hasValue, onDelete }) => {
    return (
        <>
            <BlockTitle>{title}</BlockTitle>
            <InputBox>
                {value.toLocaleString()}
                {hasValue ? unit : null}
                {hasValue ? <Delete onClick={onDelete} /> : null}
            </InputBox>
        </>
    );
};
