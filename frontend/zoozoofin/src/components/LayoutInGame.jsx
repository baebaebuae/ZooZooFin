import { Outlet } from 'react-router-dom';

import Header from './Header';

import styled from 'styled-components';

const Container = styled.div`
    /* display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start; */
    /* height: 100vh; */
    position: absolute;
    z-index: 3000;
`;

const HeaderWrapper = styled.div`
    width: 100%;
    padding: 20px 0;
    flex-shrink: 0;
    height: 80px;
    position: absolute;
    z-index: 5000;
`;

const ContentWrapper = styled.div`
    width: 360px;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* height: calc(100vh - 80px); */
    /* height: 520px; */
    height: 640px;
    overflow: hidden;
    /* top: 120px; */
    position: relative;
`;

const LayoutInGame = () => {
    return (
        <Container>
            <HeaderWrapper>
                <Header />
            </HeaderWrapper>
            <ContentWrapper>
                <Outlet />
            </ContentWrapper>
        </Container>
    );
};

export default LayoutInGame;
