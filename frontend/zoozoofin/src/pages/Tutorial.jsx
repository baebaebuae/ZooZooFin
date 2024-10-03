import { useRef, useState, useEffect, Suspense } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import Bubble from '@components/root/bubble';
import { Button } from '@components/root/buttons';

import { useStore } from '../store.js';

import { useGLTF, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';

import { Loader } from '@components/Loader';

import { getApiClient } from '@stores/apiClient';

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

const NameModal = styled.div`
    width: 200px;
    height: 180px;
    padding: 20px;
    background-color: ${({ theme }) => theme.colors.lightOrange};
    border-radius: 30px;
    border: 8px solid;
    border-color: ${({ theme }) => theme.colors.orange};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const NameModalMessage = styled.div`
    font-size: 16px;
    color: ${({ theme }) => theme.colors.gray};
    font-family: 'OneMobile';
    margin: 10px 0;
`;

const NameModalInput = styled.input`
    width: 150px;
    height: 30px;
    background-color: white;
    border-radius: 10px;
    border: 3px solid;
    border-color: ${({ theme }) => theme.colors.orange};
    margin: 20px 0;
    outline: none;
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
    const [animalName, setAnimalName] = useState(null);

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

    const onChange = (e) => {
        setAnimalName(e.target.value);
    };

    // 캐릭터 정보 넘기기
    const createAnimal = async (animalTypeId, animalName) => {
        const apiClient = getApiClient();

        console.log('animalTypeId:', animalTypeId);
        console.log('animalName:', animalName);

        const productData = {
            animalTypeId: animalTypeId,
            animalName: animalName,
        };

        try {
            console.log('Request Data:', productData);

            const res = await apiClient.post(`/animal`, productData, {});

            if (res.status === 200) {
                console.log(res.data);
            } else {
                console.error('Unexpected status code:', res.status);
            }
        } catch (error) {
            console.error('error: ', error);
            return error;
        }
    };

    const submitCharInfo = (animalTypeId, animalName, nextScript) => {
        // 이름 입력해서 post 넘기는 함수 실행
        createAnimal(animalTypeId, animalName);
        handleResponseClick(nextScript);
    };

    if (!currentScript) return <Loader loadingText={'주주시티에 입장하는중'} />;

    const receivedAnimalTypeId = location.state.animalTypeId;

    if (currentScript.type === 'action') {
        switch (currentScript.content) {
            case 'INPUT_NAME':
                return (
                    <div>
                        receivedAnimalType: {receivedAnimalTypeId}
                        <NameModal>
                            <NameModalMessage>사용할 이름을 입력해줘.</NameModalMessage>
                            <NameModalInput onChange={onChange} />
                            <div>animalName: {animalName}</div>
                            <Button
                                color={'orange'}
                                $isBorder={true}
                                onClick={
                                    // () => handleResponseClick(currentScript.responses[0].nextScript)
                                    () =>
                                        submitCharInfo(
                                            receivedAnimalTypeId,
                                            animalName,
                                            currentScript.responses[0].nextScript
                                        )
                                }
                            >
                                확인
                            </Button>
                        </NameModal>
                    </div>
                );
            case 'END':
                return navigate('/myroom');
            case 'ROOM_GUIDE':
                return (
                    <BubbleBlock
                        npc={'뭉뭉'}
                        type={currentScript.type}
                        content={currentScript.content}
                        responses={currentScript.responses}
                        onClick={handleResponseClick}
                    />
                );
            case 'NOTEBOOK_DETAIL':
                return (
                    <div>
                        노트북 화면
                        <button
                            onClick={() =>
                                handleResponseClick(currentScript.responses[0].nextScript)
                            }
                        >
                            next
                        </button>
                    </div>
                );
            case 'NOTEBOOK_FUNCTION':
                return (
                    <div>
                        노트북 상세
                        <button
                            onClick={() =>
                                handleResponseClick(currentScript.responses[0].nextScript)
                            }
                        >
                            next
                        </button>
                    </div>
                );
            case 'MENU_BAR':
                return (
                    <div>
                        메뉴바 화면
                        <button
                            onClick={() =>
                                handleResponseClick(currentScript.responses[0].nextScript)
                            }
                        >
                            next
                        </button>
                    </div>
                );
            case 'MENU_FIRST':
                return (
                    <div>
                        메뉴바 1 : 햄버거
                        <button
                            onClick={() =>
                                handleResponseClick(currentScript.responses[0].nextScript)
                            }
                        >
                            next
                        </button>
                    </div>
                );
            case 'MENU_SECOND':
                return (
                    <div>
                        메뉴바 2 : 지갑
                        <button
                            onClick={() =>
                                handleResponseClick(currentScript.responses[0].nextScript)
                            }
                        >
                            next
                        </button>
                    </div>
                );
            case 'MENU_THIRD':
                return (
                    <div>
                        메뉴바 3: 지도
                        <button
                            onClick={() =>
                                handleResponseClick(currentScript.responses[0].nextScript)
                            }
                        >
                            next
                        </button>
                    </div>
                );
            case 'MENU_LAST':
                return (
                    <div>
                        메뉴바 4 : 턴
                        <button
                            onClick={() =>
                                handleResponseClick(currentScript.responses[0].nextScript)
                            }
                        >
                            next
                        </button>
                    </div>
                );
            default:
                return <div>해당하는 페이지가 없어요. 현재 Action을 확인해주세요.</div>;
        }
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
