import styled from 'styled-components';

const Badge = styled.div`
    font-size: 10px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    background-color: ${({ theme, color }) => theme.colors[color]};
`;

export const BadgeNormal = styled(Badge)`
    padding: 6px 10px;
    color: white;
    background-color: ${({ theme, color }) => theme.colors[color]};
    border: 2px solid white;
`;

export const BadgeStroke = styled(Badge)`
    border: 1px solid ${({ theme, color }) => theme.colors[color]};
    padding: 5px 9px;
    background-color: transparent;
    color: black;
`;

export const WarnBadge = () => {
    return <BadgeNormal color={'warn'}>경고</BadgeNormal>;
};
