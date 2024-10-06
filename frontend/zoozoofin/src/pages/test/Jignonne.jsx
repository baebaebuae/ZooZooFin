import styled from 'styled-components';

import { useRef, Suspense, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';

import { useNavigate } from 'react-router-dom';

import CharRabbit from '@assets/images/characters/rabbit.png';

import { useGLTF, OrbitControls } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const ModelWrapper = styled.div`
    width: 360px;
    height: 640px;
`;

const CharacterImage = () => {
    const texture = new THREE.TextureLoader().load(CharRabbit); // 이미지 로드
    return (
        <mesh
            position={[1, -0.8, 2.3]} // 위치 설정
            scale={[1.5, 1.5, 1.5]} // 크기 설정
            rotation={[0, Math.PI / 4.5, 0]} // Y축으로 180도 회전 (정면을 바라보게)
        >
            <planeGeometry args={[1, 1]} /> {/* 평면 지오메트리 생성 */}
            <meshBasicMaterial map={texture} transparent={true} /> {/* 텍스처 적용 */}
        </mesh>
    );
};

const CharacterModel = () => {
    const modelRef = useRef();
    const { scene } = useGLTF('/models/rabbit.glb');
    return (
        <primitive
            object={scene}
            scale={0.28}
            ref={modelRef}
            position={[1.5, -1.6, 2]}
            rotation={[0, Math.PI / 4, 0]}
        />
    );
};

const RoomModel = () => {
    const modelRef = useRef();
    const navigate = useNavigate();

    // 3d 모델 불러오기
    const { scene } = useGLTF('/models/main_room.glb');
    // 재질 입히기
    const textureLoader = new THREE.TextureLoader();
    const wood1 = textureLoader.load('/images/materials/wood1.jpg');
    const wood1Nomal = textureLoader.load('/images/materials/wood1_nomal.jpg');
    const wood3 = textureLoader.load('/images/materials/wood3.jpg');

    if (scene) {
        scene.traverse((child) => {
            if (child.material && child.material.name === 'wood') {
                child.material.map = wood1;
                child.material.roughness = 0.8;
            } else if (child.material && child.material.name === 'wood3') {
                child.material.map = wood3;
                child.material.roughness = 0.8;
            } else if (child.material && child.material.name === '문') {
                child.material.nomalMap = wood1Nomal;
            }
        });
    }

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const { camera } = useThree();

    const onClick = (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children, true);
        if (intersects.length > 0) {
            // 클릭된 객체 변수 할당
            const clickedObject = intersects[0].object;
            const name = clickedObject.parent.name;
            // router 연결
            // 240924 침대 연결 아직 완성되지 않음
            if (name === 'Door') {
                navigate('/map');
            } else if (name === 'Bed') {
                console.log('로딩화면 및 API 연결 예정');
            } else if (name === 'Computer') {
                navigate('/laptop');
            }
        }
    };

    useFrame(() => {
        scene.traverse((child) => {
            if (child.name === 'Computer') {
                // Y축 회전 애니메이션 추가
                const time = Date.now() * 0.005;

                // 좌우 흔들림
                child.position.y = 0.05 + Math.sin(time) * 0.05;
                child.rotation.x = Math.sin(time) * 0.02;
                child.rotation.z = Math.sin(time) * 0.02;
            }
        });
    });

    return <primitive object={scene} ref={modelRef} position={-2} onPointerDown={onClick} />;
};

const Jignonne = () => {
    return (
        <ModelWrapper>
            <Canvas
                camera={{
                    position: [5.06, 0.91, 5.77],
                    rotate: [-0.15, 0.71, 0.1],
                    fov: 47,
                }}
                color="#ffffff"
            >
                {/* <axesHelper args={[200, 200, 200]} /> */}

                <Suspense>
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
                </Suspense>
            </Canvas>
        </ModelWrapper>
    );
};

export default Jignonne;
