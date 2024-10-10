import { useRef, useState, useEffect, Suspense } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import Bubble from '@components/root/bubble';
import { Button } from '@components/root/buttons';
import MyRoomBackground from '@assets/images/background/tutorial_myroom.png';
import TutorialLaptop from '@assets/images/background/tutorial_laptop.png';
import TutorialHeader from '@assets/images/background/tutorial_header.png';
import TutorialArrow from '@assets/images/background/tutorial_arrow.png';

import Puppy from '@/assets/images/characters/characters/Puppy.gif';

import { useStore, useAnimalStore } from '../store.js';

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

const NameModalBLock = styled.div`
    width: 360px;
    height: 640px;
    display: flex;
    justify-content: center;
    align-items: center;
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
    caret-color: black;
    width: 150px;
    height: 30px;
    background-color: white;
    border-radius: 10px;
    border: 3px solid;
    border-color: ${({ theme }) => theme.colors.orange};
    margin: 20px 0;
    outline: none;
`;

const TutorialRoomBackground = styled.img`
    width: 360px;
    height: 640px;
`;

const TutorialHeaderBlock = styled.div`
    position: relative;
`;

const ArrowBox = styled.div`
    position: absolute;
    width: 360px;
    left: ${({ left }) => `${left}vw`};
    top: 100px;
`;

const ImageContainer = styled.div`
    position: fixed;
    bottom: 26%;
    right: -13%;
`;

const NpcImage = styled.img`
    width: 300px;
    height: 250px;
    object-fit: contain;
`;

// const NPCModel = () => {
//     const modelRef = useRef();
//     // 3d 모델 불러오기
//     const { scene } = useGLTF('/models/mungmung.glb');

//     // mungmung 버전
//     return (
//         <primitive
//             object={scene}
//             scale={1.3}
//             ref={modelRef}
//             position={[0.4, -2, -0.3]}
//             rotation={[0, Math.PI / 6, 0]}
//         />
//     );
// };

const Tutorial = () => {
    const { setScripts, scripts, fetchTutorialScript } = useStore();
    const [currentId, setCurrentId] = useState(1);
    const [currentScript, setCurrentScript] = useState(null);
    const [animalName, setAnimalName] = useState(null);

    const { nowAnimal, getAnimalData } = useAnimalStore();

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setScripts([]); // 스크립트 상태 초기화
        getAnimalData();
    }, [location.pathname, setScripts, getAnimalData]);

    // scripts 가져오기(비동기)
    useEffect(() => {
        if (!scripts || scripts.length === 0) {
            const loadScripts = async () => {
                // await fetchTutorialScript('tutorial');
                fetchTutorialScript('tutorial');
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
    // const receivedAnimalTypeId = 1; //임시로 지정

    let backgroundImage;

    if (currentScript.scriptId >= 16 && currentScript.scriptId <= 18) {
        backgroundImage = TutorialLaptop;
    } else if (currentScript.scriptId >= 19 && currentScript.scriptId <= 28) {
        backgroundImage = TutorialHeader;
    } else {
        backgroundImage = MyRoomBackground;
    }

    if (currentScript.content.includes('${name}')) {
        currentScript.content = currentScript.content.replace(
            '${name}',
            `**${nowAnimal.animalName}**`
        );
    }

    if (currentScript.type === 'action') {
        switch (currentScript.content) {
            case 'INPUT_NAME':
                return (
                    <NameModalBLock>
                        <NameModal>
                            <NameModalMessage>사용할 이름을 입력해줘.</NameModalMessage>
                            <NameModalInput onChange={onChange} />
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
                    </NameModalBLock>
                );
            case 'END':
                return navigate('/myroom');
            case '듣고싶은 설명을 골라봐.':
                return (
                    <>
                        <TutorialRoomBackground src={backgroundImage} />;
                        <BubbleBlock
                            npc={'뭉뭉'}
                            type={currentScript.type}
                            content={currentScript.content}
                            responses={currentScript.responses}
                            onClick={handleResponseClick}
                        />
                    </>
                );
            case 'NOTEBOOK_DETAIL':
                return (
                    <div>
                        <img
                            src={backgroundImage}
                            onClick={() =>
                                handleResponseClick(currentScript.responses[0].nextScript)
                            }
                        />
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
                        노트북 상세 // 삭제 예정
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
                        <img
                            src={backgroundImage}
                            onClick={() =>
                                handleResponseClick(currentScript.responses[0].nextScript)
                            }
                        />
                    </div>
                );
            case 'MENU_FIRST':
                return (
                    <TutorialHeaderBlock>
                        <ArrowBox left={6}>
                            <img src={TutorialArrow} alt="화살표" />
                        </ArrowBox>
                        <img
                            src={backgroundImage}
                            onClick={() =>
                                handleResponseClick(currentScript.responses[0].nextScript)
                            }
                        />
                    </TutorialHeaderBlock>
                );
            case 'MENU_SECOND':
                return (
                    <TutorialHeaderBlock>
                        <ArrowBox left={21}>
                            <img src={TutorialArrow} alt="화살표" />
                        </ArrowBox>
                        <img
                            src={backgroundImage}
                            onClick={() =>
                                handleResponseClick(currentScript.responses[0].nextScript)
                            }
                        />
                    </TutorialHeaderBlock>
                );
            case 'MENU_THIRD':
                return (
                    <TutorialHeaderBlock>
                        <ArrowBox left={37}>
                            <img src={TutorialArrow} alt="화살표" />
                        </ArrowBox>
                        <img
                            src={backgroundImage}
                            onClick={() =>
                                handleResponseClick(currentScript.responses[0].nextScript)
                            }
                        />
                    </TutorialHeaderBlock>
                );
            case 'MENU_LAST':
                return (
                    <TutorialHeaderBlock>
                        <ArrowBox left={52}>
                            <img src={TutorialArrow} alt="화살표" />
                        </ArrowBox>
                        <img
                            src={backgroundImage}
                            onClick={() =>
                                handleResponseClick(currentScript.responses[0].nextScript)
                            }
                        />
                    </TutorialHeaderBlock>
                );
            default:
                return <div>해당하는 페이지가 없어요. 현재 Action을 확인해주세요.</div>;
        }
    }

    if (currentScript.scriptId >= 8 && currentScript.scriptId <= 28) {
        return (
            <>
                <TutorialRoomBackground src={backgroundImage} />;
                <BubbleBlock
                    npc={'뭉뭉'}
                    type={currentScript.type}
                    content={currentScript.content}
                    responses={currentScript.responses}
                    onClick={handleResponseClick}
                />
            </>
        );
    }

    return (
        <TutorialContainer>
            {/* NPC 캐릭터 추가 */}
            {/* <Canvas>
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
            </Canvas> */}
            <ImageContainer>
                <NpcImage src={Puppy} alt="NPC" />
            </ImageContainer>
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
