import styled from 'styled-components';

const Badge = styled.div`
    font-size: 14px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    background: var(--LightGreen, #80c67f);
    color: white;
`;

export const BadgeNormal = styled(Badge)`
    padding: 8px 12px;
`;

export const BadgeStroke = styled(Badge)`
    border: 5px solid var(--White, #fff);
    padding: 8px 12px;
`;
