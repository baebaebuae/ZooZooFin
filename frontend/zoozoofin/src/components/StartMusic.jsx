import styled from 'styled-components';

import { useMusicStore } from '@stores/useMusicStore.js';

const Container = styled.div`
    height: 640px;
    /* background-color: ${({ theme }) => theme.colors.primaryDeep}; */
    background-color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 4px 0;
`;

const TextBox = styled.div`
    color: white;
    width: 120px;
    animation:
        typing 2s steps(22),
        blink 0.5s step-end infinite alternate;
    white-space: nowrap;
    overflow: hidden;
    border-right: 3px solid;
    /* font-family: monospace; */
    font-family: 'OneMobilePop';
    font-size: 20px;

    @keyframes typing {
        from {
            width: 0;
        }
    }

    @keyframes blink {
        50% {
            border-color: transparent;
        }
    }
`;

const QuestionBlock = styled.div`
    color: white;
    font-size: 14px;
    margin: 50px 0 10px 0;
`;

const TextBlock = styled.div`
    display: flex;
    gap: 20px;
`;

const Enterbutton = styled.div`
    margin: 10px;
    padding: 10px;
    outline-color: white;
    border: 1px solid white;
    border-radius: 4px;
    color: white;
    font-size: 14px;
`;

const StartMusic = ({ handleSelectMusicOn }) => {
    const { toggleMusic, updateMusicChecked } = useMusicStore();

    const checkMusic = () => {
        updateMusicChecked(true);
        localStorage.setItem('isMusicChecked', JSON.stringify(true));
    };

    const goToEnterPage = () => {
        checkMusic();
        toggleMusic();
    };

    return (
        <Container>
            <TextBox>주주핀 입장중... </TextBox>

            <QuestionBlock>음악을 들을래?</QuestionBlock>
            <TextBlock>
                <Enterbutton onClick={goToEnterPage}>응</Enterbutton>
                <Enterbutton onClick={checkMusic}>아니</Enterbutton>
            </TextBlock>
        </Container>
    );
};

export default StartMusic;
