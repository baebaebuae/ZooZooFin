import { useState, useEffect } from 'react';
import example from '@scripts/example.json';
import Bubble from '@components/root/bubble';
import styled from 'styled-components';
import axios from 'axios';

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

const getTutorial = () => {
    // console.log(import.meta.env.VITE_ACCESS_TOKEN);
    axios
        .get(`${import.meta.env.VITE_URL}/scripts/category`, {
            params: { category: 'tutorial' },
            headers: { Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}` },
        })
        .then((res) => {
            console.log(res);
            console.log('응답 완료:', res.data);
        })
        .catch((err) => {
            console.log('에러:', err);
        });
};

const test = async () => {
    try {
        const res = await axios({
            method: 'get',
            url: `${import.meta.env.VITE_URL}/scripts/category`,
            params: { category: 'tutorial' },
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
                // 'Access-Control-Allow-Origin': `http://localhost:5173`,
                // 'Access-Control-Allow-Credentials': 'true',
            },
        });
        if (res.status === 200) {
            console.log(res);
            console.log(res.data);
            return '$OK';
        }
    } catch (error) {
        console.error('error: ', error);
        return error;
    }
};

const Tutorial = () => {
    useEffect(() => {
        // getTutorial();
        test();
    });

    const [currentId, setCurrentId] = useState(1);
    const currentScript = example[0].scripts.find((script) => script.id === currentId);

    const handleResponseClick = (responseKey) => {
        const nextId = currentScript.responses[responseKey];
        if (nextId) {
            setCurrentId(nextId);
        }
    };

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

