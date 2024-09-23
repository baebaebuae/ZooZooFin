import { useState } from 'react';
import example from '@scripts/example.json';
import Bubble from '@components/root/bubble';
import styled from 'styled-components';

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

const Tutorial = () => {
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
