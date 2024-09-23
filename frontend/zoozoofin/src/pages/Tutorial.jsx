import { useState, useEffect } from 'react';
import example from '@scripts/example.json';
import Bubble from '@components/root/bubble';
import styled from 'styled-components';
import axios from 'axios';
import { useStore } from '../store.js';

const TutorialContainer = styled.div`
    display: flex;
    justify-content: start;
    width: 360px;
    height: 640px;
`;

const BubbleBlock = styled(Bubble)`
    position: fixed;
    bottom: 0;
    right: 0;
`;

const getTutorial = async () => {
    try {
        const res = await axios({
            method: 'get',
            url: `${import.meta.env.VITE_URL}/scripts/category`,
            params: { category: 'tutorial' },
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
                'Access-Control-Allow-Origin': `http://localhost:5173`,
                'Access-Control-Allow-Credentials': 'true',
            },
        });
        if (res.status === 200) {
            console.log('byby', res.data.body.scripts);
            return '$OK';
        }
    } catch (error) {
        console.error('error: ', error);
        return error;
    }
};

const Tutorial = () => {
    const { scripts, fetchTutorialScript } = useStore();
    useEffect(() => {
        // getTutorial();
        if (!scripts || scripts.length === 0) {
            const realScript = async () => {
                fetchTutorialScript();
            };
            realScript();
        }
    }, [fetchTutorialScript, scripts]);

    const [currentId, setCurrentId] = useState(1);
    const currentScript = example[0].scripts.find((script) => script.id === currentId);
    // const currentScript = scripts.find((script) => script.id === currentId);
    console.log(currentScript);

    // useEffect +

    const handleResponseClick = (responseKey) => {
        const nextId = currentScript.responses[responseKey];
        if (nextId) {
            setCurrentId(nextId);
        }
    };

    // // 로딩 중일 때 Loader 컴포넌트 렌더링
    // if (isLoading) return <Loader />;

    return (
        <TutorialContainer>
            <BubbleBlock
                npc={'뭉뭉'}
                type={currentScript.type}
                content={currentScript.content}
                responses={currentScript.responses}
                onClick={handleResponseClick}
            />
        </TutorialContainer>
    );
};

export default Tutorial;
