import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useState, useEffect } from 'react';

import Juju from '@pages/test/Juju';
import JJHoney from '@pages/test/JJHoney';
import Sinijini from '@pages/test/Sinijini';
import Jignonne from '@pages/test/Jignonne';

import Start from '@pages/Start';
import LayoutInGame from '@components/LayoutInGame';

import Bank from '@pages/Bank';
import Ending from '@pages/Ending';
import MyRoom from '@pages/MyRoom';
import Map from '@pages/Map';
import Laptop from '@pages/Laptop';
import Lender from '@pages/Lender';
import School from '@pages/School';
import Stock from '@pages/Stock';
import Tutorial from '@pages/Tutorial';
import Work from '@pages/Work';
import WalletPage from '@pages/test/WalletPage';
import ComponentsBank from '@pages/test/ComponentsBank';

const Background = styled.div`
    width: 360px;
    height: 640px;
    background-image: url(${(props) => props.backgroundimage});
    background-size: cover;
    z-index: -1;
    position: fixed;
    top: 0;
    left: 0;
`;

const AppRouter = () => {
    const [backgroundimage, setBackgroundimage] = useState(null);

    const location = useLocation();
    // console.log(location.pathname);

    // 이미지 불러오는 함수
    const getBackgroundimage = async (pathname) => {
        const image = await import(`../assets/images/background/${pathname}.svg`);
        setBackgroundimage(image.default);
    };

    // 페이지 넘어갔을 때 path에서 바로 pathname 찾기
    useEffect(() => {
        const pathname = location.pathname.split('/')[1];
        // console.log(pathname); // lender, bank 등 잘 나옴

        if (pathname) {
            getBackgroundimage(pathname);
        }
    }, [location.pathname]);

    return (
        <>
            <Background backgroundimage={backgroundimage} />
            <Routes>
                <Route path="/" element={<Navigate replace to="/start" />} />
                <Route path="/start" element={<Start />} />
                <Route path="/tutorial" element={<Tutorial />} />
                <Route path="/map" element={<Map />} />
                <Route element={<LayoutInGame />}>
                    <Route path="/bank" element={<Bank />} />
                    <Route path="/bankcomp" element={<ComponentsBank />} />
                    <Route path="/laptop" element={<Laptop />} />
                    <Route path="/lender" element={<Lender />} />
                    <Route path="/school" element={<School />} />
                    <Route path="/stock" element={<Stock />} />
                    <Route path="/myroom" element={<MyRoom />} />
                </Route>
                <Route path="/work" element={<Work />} />
                <Route path="/ending" element={<Ending />} />
                <Route path="/wallet" element={<WalletPage />} />

                <Route path="/juju" element={<Juju />} />
                <Route path="/jjhoney" element={<JJHoney />} />
                <Route path="/sinijini" element={<Sinijini />} />
                <Route path="/jignonne" element={<Jignonne />} />
            </Routes>
        </>
    );
};
export default AppRouter;
