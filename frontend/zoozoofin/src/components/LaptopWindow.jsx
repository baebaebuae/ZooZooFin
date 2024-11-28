import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import AppBank from '@assets/images/icons/laptop/appBank.png';
import AppCapital from '@assets/images/icons/laptop/appCapital.png';
import AppRanking from '@assets/images/icons/laptop/appRanking.png';
import AppStock from '@assets/images/icons/laptop/appStock.png';

import ClearIcon from '@mui/icons-material/Clear';

const LaptopContainer = styled.div`
    height: 640px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: end;
    overflow-y: auto;
`;

const LaptopWindowContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    width: 320px;
    min-height: 480px;
    padding: 10px 20px;
    background-color: white;
    border: 1px solid gray;
    filter: drop-shadow(3px 3px 3px gray);
`;

const AppBar = styled.div`
    width: 105%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const AppIcon = styled.div`
    width: 20px;
    height: 20px;
    margin: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(${(props) => props.backgroundimage});
    background-size: cover;
`;

const AppTitle = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    font-size: 12px;
`;

const appIcons = {
    '인터넷 뱅킹': AppBank,
    콩팥캐피탈: AppCapital,
    리더보드: AppRanking,
    주주증권: AppStock,
};

// children에 각 앱 내용 띄우기
const LaptopWindow = ({ children, appName }) => {
    const iconImage = appIcons[appName] || '';

    return (
        <LaptopContainer>
            <LaptopWindowContainer>
                <AppBar>
                    <AppTitle>
                        <AppIcon backgroundimage={iconImage}></AppIcon>
                        {appName}
                    </AppTitle>
                    <Link to="/laptop">
                        <ClearIcon color="action" />
                    </Link>
                </AppBar>

                {children}
            </LaptopWindowContainer>
        </LaptopContainer>
    );
};

export default LaptopWindow;
