import { useRef, useState, useEffect, Suspense } from 'react';
import Bubble from '@components/root/bubble';
import styled from 'styled-components';
import { useStore } from '../store.js';
import { useNavigate, useLocation } from 'react-router-dom';

import { useGLTF, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';

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
const NPCModel = () => {
    const modelRef = useRef();
    // 3d 모델 불러오기
    const { scene } = useGLTF('/models/mungmung.glb');

    // mungmung 버전
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

const Tutorial = () => {
    const { setScripts, scripts, fetchTutorialScript } = useStore();
    const [currentId, setCurrentId] = useState(1);
    const [currentScript, setCurrentScript] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setScripts([]); // 스크립트 상태 초기화
    }, [location.pathname, setScripts]);

    // scripts 가져오기(비동기)
    useEffect(() => {
        if (!scripts || scripts.length === 0) {
            const loadScripts = async () => {
                await fetchTutorialScript('tutorial');
            };
            loadScripts();
        }
    }, [fetchTutorialScript, scripts]);

    // currentScript 설정
    useEffect(() => {
        if (scripts.length > 0) {
            const script = scripts.find((script) => script.scriptId === currentId);
            setCurrentScript(script);
            console.log(script);
        }
    }, [scripts, currentId]);

    const handleResponseClick = (nextScript) => {
        setCurrentId(nextScript);
    };

    // 로딩 중일 때 Loader 컴포넌트 렌더링 - 예정
    if (!currentScript) return <div>주주시티에 입장하는 중...</div>;

    if (currentScript.type === 'action' && currentScript.content === 'INPUT_NAME')
        return (
            <div>
                이름 입력 모달
                <button onClick={() => handleResponseClick(currentScript.responses[0].nextScript)}>
                    next
                </button>
            </div>
        );

    // action별로 컴포넌트 렌더링 - 예정
    // if (currentScript.type === 'action') {
    //     switch (currentScript.content) {
    //         case 'END':
    //             return navigate('/myroom');
    //         default:
    //             return <div>해당하는 페이지가 없어요. 현재 Action을 확인해주세요.</div>;
    //     }
    // }

    if (currentScript.type === 'action' && currentScript.content === 'END') {
        return navigate('/myroom');
    }

    return (
        <TutorialContainer>
            {/* NPC 캐릭터 추가 */}
            <Canvas>
                <axesHelper args={[200, 200, 200]} />
                <Suspense>
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
