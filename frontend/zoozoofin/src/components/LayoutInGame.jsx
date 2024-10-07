import { Outlet } from 'react-router-dom';

import Header from './Header';

import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    height: 100vh;
`;

const HeaderWrapper = styled.div`
    width: 100%;
    padding: 20px 0;
    flex-shrink: 0;
    height: 80px;
`;

const ContentWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: calc(100vh - 80px);
    overflow: hidden;
    /* border: 6px solid pink; */
`;

const LayoutInGame = () => {
    // const showHeader = location.pathname !== '/start' && location.pathname !==  '/loading'
    // 없어도 돌아가긴 하는데 일단 두겠습니다

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
