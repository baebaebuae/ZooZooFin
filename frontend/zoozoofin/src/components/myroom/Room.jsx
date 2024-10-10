import styled from 'styled-components';

import { Suspense } from 'react';

import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import { Loader } from '@components/Loader';

import RoomModel from '@components/myroom/common/RoomModel';
import CharacterImage from '@components/myroom/common/RoomCharacter';

const ModelWrapper = styled.div`
    width: 360px;
    height: 640px;
    /* z-index: -1; */
    z-index: 4000;
    position: fixed;
    top: 0;
`;

export const RoomLoader = () => {
    return <Loader loadingText={'나의 방으로 입장하는 중...'} />;
};

export const RoomComponent = () => {
    return (
        <ModelWrapper>
            <Suspense fallback={<RoomLoader />}>
                <Canvas
                    camera={{
                        position: [5.06, 0.91, 5.77],
                        rotate: [-0.15, 0.71, 0.1],
                        fov: 47,
                    }}
                    color="#ffffff"
                >
                    {/* <axesHelper args={[200, 200, 200]} /> */}

                    {/* <CharacterModel /> */}
                    <CharacterImage />
                    <RoomModel />
                    {/* 방 사물 전체 조명 , 그림자 X*/}
                    <ambientLight intensity={2.2} color="#fbf8ef" />

                    {/* 방 전체 볼륨 조정 */}
                    <pointLight
                        castShadow
                        color="#ffffff"
                        intensity={10}
                        position={[-5, 1, -2]}
                        distance={0}
                    />

                    {/* 문 쪽 채광 및 볼륨 조정  */}
                    <pointLight
                        castShadow
                        color="#f6e7c4"
                        intensity={5}
                        position={[-2.7, 0.2, -2.5]}
                        distance={10}
                    />

                    <pointLight
                        castShadow
                        color="#ffffff"
                        intensity={10}
                        position={[1, 1, 1]}
                        distance={0}
                    />
                    {/* 방 전체 밝기 */}
                    <directionalLight position={(3, 0, 4)} color="#f6e7c4" intensity={1} />

                    {/* 창문 */}
                    <rectAreaLight
                        color="#f6e7c4"
                        intensity={10}
                        width={1}
                        height={3.5}
                        position={[-4.7, -0.1, -4]}
                        rotation-x={THREE.MathUtils.degToRad(90)}
                    />
                    <OrbitControls
                        enableZoom={true}
                        enablePan={true}
                        enableRotate={true}
                        minDistance={2}
                        maxDistance={7}
                        maxPolarAngle={Math.PI / 2}
                        minPolarAngle={Math.PI / 2.2}
                        maxAzimuthAngle={Math.PI / 4}
                        minAzimuthAngle={Math.PI / 5}
                    />
                </Canvas>
            </Suspense>
        </ModelWrapper>
    );
};
