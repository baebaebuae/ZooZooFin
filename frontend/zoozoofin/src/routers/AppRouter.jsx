import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';

import Juju from '@pages/test/Juju';
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
import Loan from '@pages/Loan';
import School from '@pages/School';
import Stock from '@pages/Stock';
import Tutorial from '@pages/Tutorial';
import CreateAnimal from '@pages/CreateAnimal';
import Work from '@pages/Work';
import WalletPage from '@pages/test/WalletPage';
import Auth from '../pages/Auth';
import TestPaper from '../components/school/TestPaper';
import Game from '@components/work/Game';

import AppBank from '@pages/laptop/AppBank';
import AppCapital from '@pages/laptop/AppCapital';
import AppStock from '@pages/laptop/AppStock';
import AppRanking from '@pages/laptop/AppRanking';

import CharacterHistory from '../pages/CharacterHistory';

import startMusic from '@assets/music/start.mp3';
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';


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

const MusicToggleButton = styled.button`
    z-index: 1000;
    width: 100%;
    text-align: right;
    background-color: transparent;
    border-color: transparent;
`;

const AppRouter = () => {
    const [backgroundimage, setBackgroundimage] = useState(null);
    const [isMusicOn, setIsMusicOn] = useState(false);
    const [currentMusic, setCurrentMusic] = useState(null);
    const audioRef = useRef(null);

    // musicList 지정 **LATER**
    // const musicList = {
    //     '/start': startMusic,
    //     '/bank': bankMusic,
    // }

    //  페이지 넘어갈 때 해당하는 페이지의 pathname을 가져와서 currentMusic에 상태 저장 후 bgm 재생
    // pathname에 해당하는 Music이 없으면 Default BGM 지정 **LATER**
    // const setMusic = (pathname) => {
    //     const selectedMusic = musicList[pathname] || defaultMusic;
    //     setCurrentMusic(selectedMusic)
    // }

    const location = useLocation();

    // 이미지 불러오는 함수
    const getBackgroundimage = async (pathname) => {
        const image = await import(`../assets/images/background/${pathname}.png`);
        setBackgroundimage(image.default);
    };

    // 페이지 넘어갔을 때 path에서 바로 pathname 찾기
    useEffect(() => {
        const pathname = location.pathname.split('/')[1];

        if (pathname) {
            getBackgroundimage(pathname);
            // setMusic(pathname) // defaultMusic 사용하는 함수 **LATER**
        }
    }, [location.pathname]);

    const playAudio = () => {
        audioRef.current.load();
        // pause 후 다시 play하면 음원 처음부터 재생되도록 load
        audioRef.current.loop = true;
        audioRef.current.play();
    };

    const pauseAudio = () => {
        audioRef.current.pause();
    };

    const handleMusic = () => {
        // 보안 정책 상 첫 사용자 인터랙션 없이는 음악이 자동으로 재생되지 않는다고 함
        // 최초의 클릭이 필요 -> 시작 화면 입장하고 테스트
        setIsMusicOn(!isMusicOn);
        isMusicOn ? pauseAudio() : playAudio();
    };
    return (
        <>
            <Background backgroundimage={backgroundimage} />
            <MusicToggleButton onClick={handleMusic}>
                {isMusicOn ? <VolumeOffRoundedIcon /> : <VolumeUpRoundedIcon />}
            </MusicToggleButton>
            <audio ref={audioRef} src={startMusic} />
            {/* <audio ref={audioRef} src={currentMusic} /> **TEST LATER**/}

            {/* controls = 오디오 컨트롤러 박스 나타나게 함 */}
            {/* loop = 반복재생 */}
            {/* source = 사용할 음악 파일 소스 */}
            {/* autoPlay는 테스트중 */}
            <audio loop autoPlay={true} id="audioContainer">
                <source src={startMusic} type="audio/mp3" />
                {/* <source src={bankMusic} type="audio/mp3" /> */}
                {/* <source src={tutorialMusic} type="audio/mp3" /> */}
            </audio>

            <Routes>
                <Route path="/" element={<Navigate replace to="/start" />} />
                <Route path="/start" element={<Start />} />
                <Route path="/tutorial" element={<Tutorial />} />
                <Route path="/createanimal" element={<CreateAnimal />} />
                <Route path="/map" element={<Map />} />
                <Route element={<LayoutInGame />}>
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
                <Route path="/wallet" element={<WalletPage />} />

                <Route path="/character-history" element={<CharacterHistory />} />

                <Route path="/juju" element={<Juju />} />
                <Route path="/sinijini" element={<Sinijini />} />
                <Route path="/jignonne" element={<Jignonne />} />
                {/* social login */}
                <Route path="/callback" element={<Auth />} />
            </Routes>
        </>
    );
};
export default AppRouter;
