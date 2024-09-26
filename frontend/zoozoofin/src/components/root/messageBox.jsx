// 화면별 안내 멘트
import styled from 'styled-components';

export const MessageBox = styled.div`
    /* width: 270px; */
    font-weight: bold;
    font-size: 14px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 12px 36px;

    gap: 10px;

    border-radius: 28px;
    border: 5px solid #d9d9d9;

    background-color: ${({ theme }) => theme.colors.background};
`;
