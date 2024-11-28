import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';

import Start from '@pages/Start';
import LayoutInGame from '@components/LayoutInGame';

import Bank from '@pages/Bank';
import Ending from '@pages/Ending';
import MyRoom from '@pages/MyRoom';
import Map from '@pages/Map';
import Laptop from '@pages/Laptop';
import Lender from '@pages/Lender';
import Loan from '@pages/Loan';
import School from '@pages/School';
import Stock from '@pages/Stock';
import Tutorial from '@pages/Tutorial';
import CreateAnimal from '@pages/CreateAnimal';
import Work from '@pages/Work';
import Wallet from '../components/Wallet';
import Auth from '../pages/Auth';
import TestPaper from '../components/school/TestPaper';
import Game from '@components/work/Game';

import AppBank from '@pages/laptop/AppBank';
import AppCapital from '@pages/laptop/AppCapital';
import AppStock from '@pages/laptop/AppStock';
import AppRanking from '@pages/laptop/AppRanking';

import CharacterHistory from '../pages/CharacterHistory';

import defaultMusic from '/music/default.mp3';
import startMusic from '/music/start.mp3';
// import bankMusic from '@assets/music/bank.mp3';
import bankMusic from '/music/bank.mp3';
import capitalMusic from '/music/lender.mp3';
import laptopMusic from '/music/laptop.mp3';
import mapMusic from '/music/map.mp3';
import myRoomMusic from '/music/myroom.mp3';
import schoolMusic from '/music/school.mp3';
import stockMusic from '/music/stock.mp3';
import workMusic from '/music/work.mp3';

import { useMusic } from '@components/useMusic';
import { useMusicStore } from '@stores/useMusicStore.js';

const Block = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    /* background-color: red; */
`;

const Background = styled.div`
    width: 360px;
    height: 640px;

    background-image: url(${(props) => props.backgroundimage});
    background-size: cover;
    z-index: 2;
    position: absolute;
    top: 0;
    left: 0;
`;

const MusicToggleButton = styled.button`
    position: absolute;
    width: 100%;
    text-align: right;
    z-index: 1000;
    background-color: transparent;
    border-color: transparent;

    :focus {
        border: none;
        outline: none;
    }
`;

const AppRouter = () => {
    // const { isMusicOn, audioRef } = useMusic();
    const [backgroundimage, setBackgroundimage] = useState(null);
    const [currentMusic, setCurrentMusic] = useState(startMusic);
    const audioRef = useRef(null);

    const { isMusicOn } = useMusicStore();

    // const isMusicOn = useMusicStore((state) => state.isMusicOn);
    // const toggleMusic = useMusicStore((state) => state.toggleMusic);
    // const isMusicOn = JSON.parse(localStorage.getItem('isMusicOn')) || false;

    // musicList 지정
    const musicList = {
        start: startMusic,
        bank: bankMusic,
        lender: capitalMusic,
        default: defaultMusic,
        laptop: laptopMusic,
        map: mapMusic,
        myroom: myRoomMusic,
        school: schoolMusic,
        stock: stockMusic,
        work: workMusic,
    };

    //  페이지 넘어갈 때 해당하는 페이지의 pathname을 가져와서 currentMusic에 상태 저장 후 bgm 재생
    // pathname에 해당하는 Music이 없으면 Default BGM 지정 **LATER**
    const setMusic = (pathname) => {
        const selectedMusic = musicList[pathname] || musicList.default;
        // pathname으로 해당하는 음악 땄는데, 재생되어오던 음악과 다르면 새로 재생
        // if (selectedMusic !== currentMusic || currentMusic === defaultMusic) {
        if (selectedMusic !== currentMusic) {
            setCurrentMusic(selectedMusic);
        }
    };

    const location = useLocation();

    // 이미지 불러오는 함수
    const getBackgroundimage = async (pathname) => {
        const image = await import(`../assets/images/background/${pathname}.png`);
        setBackgroundimage(image.default);
    };

    useEffect(() => {
        !isMusicOn && audioRef.current.pause();
    });

    // 페이지 넘어갔을 때 path에서 바로 pathname 찾기
    useEffect(() => {
        const pathname = location.pathname.split('/')[1];

        if (pathname) {
            getBackgroundimage(pathname);
            setMusic(pathname);

            // defaultMusic으로 계속 연결되는 경우에는 useEffect 안에서 바꾸지 않음
            if (isMusicOn && audioRef.current && currentMusic != defaultMusic) {
                audioRef.current.load();

                if (isMusicOn) {
                    audioRef.current.play();
                } else {
                    audioRef.current.pause();
                }
            }
        }
    }, [location.pathname, isMusicOn, currentMusic]);

    return (
        <Block>
            <Background backgroundimage={backgroundimage} />

            {/* pathname에 따라 음악 바뀌도록 설정 */}
            {/* <audio ref={audioRef} loop autoPlay={true}> */}
            <audio ref={audioRef} loop autoPlay={isMusicOn}>
                <source src={currentMusic} type="audio/mp3" />
            </audio>

            <Routes>
                <Route path="/" element={<Navigate replace to="/start" />} />
                <Route path="/start" element={<Start />} />
                <Route path="/tutorial" element={<Tutorial />} />
                <Route path="/createanimal" element={<CreateAnimal />} />
                <Route element={<LayoutInGame />}>
                    <Route path="/map" element={<Map />} />
                    <Route path="/bank" element={<Bank />} />
                    <Route path="/laptop" element={<Laptop />} />
                    <Route path="/laptop/bank" element={<AppBank />} />
                    <Route path="/laptop/stock" element={<AppStock />} />
                    <Route path="/laptop/capital" element={<AppCapital />} />
                    <Route path="/laptop/ranking" element={<AppRanking />} />
                    <Route path="/lender" element={<Lender />} />
                    <Route path="/loan" element={<Loan />} />
                    <Route path="/school" element={<School />} />
                    <Route path="/stock" element={<Stock />} />
                    <Route path="/myroom" element={<MyRoom />} />
                    {/* 퀴즈 페이지 추가 */}
                    <Route path="/testpaper" element={<TestPaper />} />
                </Route>
                <Route path="/work/*">
                    <Route index element={<Work />} />
                    <Route path="inGame" element={<Game />} />
                </Route>
                <Route path="/ending" element={<Ending />} />
                <Route path="/wallet" element={<Wallet />} />

                <Route path="/character-history" element={<CharacterHistory />} />

                {/* social login */}
                <Route path="/callback" element={<Auth />} />
            </Routes>
        </Block>
    );
};
export default AppRouter;
