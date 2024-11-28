// import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import AppBank from '@assets/images/icons/laptop/appBank.png';
import AppCapital from '@assets/images/icons/laptop/appCapital.png';
import AppRanking from '@assets/images/icons/laptop/appRanking.png';
import AppStock from '@assets/images/icons/laptop/appStock.png';

import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

const AppContainer = styled.div`
    width: 100%;
    height: 640px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;
`;

const AppBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;

const AppSemiBlock = styled.div`
    width: 200px;
    height: 100px;
    display: flex;
    gap: 20px;
    margin: 20px;
`;

const AppBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
    color: black;
    text-decoration: none;
    text-shadow:
        -1px 0px white,
        0px 1px white,
        1px 0px white,
        0px -1px white;
`;

const AppIcon = styled.div`
    width: 80px;
    height: 80px;
    margin: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(${(props) => props.backgroundimage});
    background-repeat: no-repeat;
    filter: drop-shadow(6px 6px 3px gray);
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;

const ExitButton = styled.div`
    padding: 10px 20px;
    border-radius: 30px;
    background-color: ${({ theme }) => theme.colors.warn};
    color: white;
    font-family: 'OneMobilePop';
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
`;

const Laptop = () => {
    return (
        <AppContainer>
            <AppBlock>
                <AppSemiBlock>
                    <StyledLink to="/laptop/bank">
                        <AppBox>
                            <AppIcon backgroundimage={AppBank} />
                            인터넷 뱅킹
                        </AppBox>
                    </StyledLink>
                    <StyledLink to="/laptop/stock">
                        <AppBox>
                            <AppIcon backgroundimage={AppStock} />
                            My 증권
                        </AppBox>
                    </StyledLink>
                </AppSemiBlock>
                <AppSemiBlock>
                    <StyledLink to="/laptop/capital">
                        <AppBox>
                            <AppIcon backgroundimage={AppCapital} />
                            콩팥 캐피탈
                        </AppBox>
                    </StyledLink>
                    <StyledLink to="/laptop/ranking">
                        <AppBox>
                            <AppIcon backgroundimage={AppRanking} />
                            리더보드
                        </AppBox>
                    </StyledLink>
                </AppSemiBlock>
            </AppBlock>
            <StyledLink to="/myroom">
                <ExitButton>
                    <PowerSettingsNewIcon />
                    전원 종료
                </ExitButton>
            </StyledLink>
        </AppContainer>
    );
};

export default Laptop;
