// import React from "react";
import styled from 'styled-components';
import blankmap from './blankmap.png';

import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';

// 공식문서 https://r3f.docs.pmnd.rs/tutorials/loading-models

const Wrapper = styled.div`
    position: absolute;
    z-index: 1;

    .background {
        width: 360px;
        height: 640px;
        background-image: url(${blankmap});
        background-size: cover;
        background-position: center;
    }
`;

const ModelWrapper = styled.div`
    position: absolute;
    z-index: 1000;
    width: 360px;
    height: 640px;
`;

const BankBuilding1 = () => {
    const [hovered, setHovered] = useState(false);
    const ref = useRef();
    const { scene } = useGLTF('/bank.glb');
    const navigate = useNavigate();

    // 애니메이션을 위한 시간 변수
    let time = useRef(0);
    useFrame((_, delta) => {
        if (ref.current && hovered) {
            // ref.current.rotation.y += delta;
            time.current += 0.1; // 속도 조절
            // ref.current.position.x = Math.sin(time.current) * 0.1;
            // 이렇게 하면 자꾸 한 칸 옆으로 이동한 후에 움직여서
            // ref.current.position.x = ref.current.position.x + Math.sin(time.current) * 0.1;
            // 이렇게 해주니까 액션은 맞는 것 같은데 범위가 너무 넓음
            ref.current.position.x = ref.current.position.x + Math.sin(time.current) * 0.005;
            // ref.current.position.y = ref.current.position.y + Math.sin(time.current) * 0.005;
            // 아 아님 .. 또 이동한 후에 움직임
        }
    });

    return (
        <primitive
            ref={ref}
            object={scene}
            scale={1.5}
            position={[6.5, 6, 5.5]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => {
                setHovered(false);
                ref.current.position.x = 6.5;
                // 이걸 바꿔줘야함! 0으로 설정했었음
            }}
            onClick={() => navigate('/bank')}
        />
    );
    // return <primitive object={scene} scale={1} ref={groupRef} position={[10, 10, 10]} />;
    // 이렇게 position 지정하면 bank가 사라짐 ㅠ
    // --> 사라지는 게 아니라 bank 자체의 폭, 높이가 작아서 영역 바깥으로 빠져나간 듯
    // ModelWrapper 크기 360*640으로 조정해주니까 보임
};

const StockBuilding = () => {
    const [hovered, setHovered] = useState(false);
    const ref = useRef();
    const { scene } = useGLTF('/stock.glb');
    const navigate = useNavigate();

    // 애니메이션을 위한 시간 변수
    let time = useRef(0);
    useFrame((_, delta) => {
        if (ref.current && hovered) {
            time.current += 0.08; // 속도 조절

            ref.current.position.x = ref.current.position.x + Math.sin(time.current) * 0.005;
        }
    });

    return (
        <primitive
            ref={ref}
            object={scene}
            scale={1.5}
            position={[1, 6, 5]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => {
                setHovered(false);
                ref.current.position.x = 1;
            }}
            onClick={() => navigate('/stock')}
        />
    );
};
const Juju = () => {
    return (
        <>
            <h3>지현 3D Blank Map 작업실</h3>
            <Wrapper>
                <div className="background" />
            </Wrapper>
            <ModelWrapper>
                <Canvas style={{ background: 'none' }} camera={{ position: [15, 15, 18], fov: 60 }}>
                    <ambientLight intensity={5} />
                    <Suspense fallback={null}>
                        <BankBuilding1 />
                        <StockBuilding />
                    </Suspense>
                    <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
                </Canvas>
            </ModelWrapper>
            {/* <group ref={group} dispose={null}>
                <group name="Scene">
                    <mesh name="Bank" />
                </group>
            </group> */}
        </>
    );
};

export default Juju;
