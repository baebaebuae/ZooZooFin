import React, { useRef, useState, Suspense, useEffect } from 'react';
import Bubble from '@components/root/bubble';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

const SchoolContainer = styled.div`
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

const NPCModel = () => {
    const modelRef = useRef();
    const { scene } = useGLTF('/models/mungmung.glb');

    return (
        <primitive
            object={scene}
            scale={1.3}
            ref={modelRef}
            position={[0.4, -2, -0.3]}
            rotation={[0, Math.PI / 6, 0]}
        />
    );
};

const School = () => {
    const [name, setName] = useState('토토');
    const [score, setScore] = useState(null);
    const [dialogue, setDialogue] = useState({
        content: `${name}, 시험을 보러 온거니?`,
        responses: [
            { selection: '네! 시험보고싶어요!', nextScript: 'START_QUIZ' },
            { selection: '아니요.. 더 공부하고 올게요', nextScript: 'EXIT' }
        ]
    });
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.score) {
            setScore(location.state.score);
            if (parseInt(location.state.score) >= 80) {
                setDialogue({
                    content: `와우! ${location.state.score}점이나 받았구나! 정말 잘했어!`,
                    responses: [{ selection: '감사합니다!', nextScript: 'END' }]
                });
            } else {
                setDialogue({
                    content: `${location.state.score}점이구나. 다음에는 더 잘할 수 있을 거야!`,
                    responses: [{ selection: '네, 더 열심히 공부할게요.', nextScript: 'END' }]
                });
            }
        }
    }, [location]);

    const handleResponseClick = (nextScript) => {
        if (nextScript === 'START_QUIZ') {
            navigate('/testpaper');
        } else if (nextScript === 'EXIT') {
            navigate(-1);
        } else if (nextScript === 'END') {
            // 시험 종료
            navigate('/');
        }
    };

    console.log('현재 대화 내용:', dialogue.content);
    console.log('현재 응답 옵션:', dialogue.responses);

    if (!dialogue.content) return <div>학교에 입장하는 중...</div>;

    return (
        <SchoolContainer>
            <Canvas>
                <axesHelper args={[200, 200, 200]} />
                <Suspense fallback={null}>
                    <ambientLight intensity={2.2} color="#fbf8ef" />
                    <pointLight
                        castShadow
                        color="#ffffff"
                        intensity={10}
                        position={[0, 1, 3]}
                        distance={0}
                    />
                    <pointLight
                        castShadow
                        color="#ffffff"
                        intensity={10}
                        position={[4, 1, 2]}
                        distance={0}
                    />
                    <NPCModel />
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        enableRotate={true}
                        minDistance={2}
                        maxDistance={7}
                        maxPolarAngle={Math.PI / 2}
                        minPolarAngle={Math.PI / 3}
                        maxAzimuthAngle={Math.PI / 2}
                        minAzimuthAngle={Math.PI / 5}
                    />
                </Suspense>
            </Canvas>
            <BubbleBlock
                npc={'양티처'}
                type={'dialogue'}
                content={dialogue.content}
                responses={dialogue.responses}
                onClick={handleResponseClick}
            />
        </SchoolContainer>
    );
};

export default School;