import { useRef } from 'react';
import * as THREE from 'three';

import { useFrame, useLoader } from '@react-three/fiber';
import { useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';

import { TextureLoader } from 'three';

const RoomModel = () => {
    const modelRef = useRef();
    const navigate = useNavigate();

    // 3d 모델 불러오기
    const { scene } = useGLTF('/models/main_room.glb');

    // 재질 입히기
    const wood1 = useLoader(TextureLoader, '/images/materials/wood1.jpg');
    const wood1Nomal = useLoader(TextureLoader, '/images/materials/wood1_nomal.jpg');
    const wood3 = useLoader(TextureLoader, '/images/materials/wood3.jpg');

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
            // if (name === 'Door') {
            //     navigate('/map');
            // } else if (name === 'Bed') {
            //     console.log('로딩화면 및 API 연결 예정');
            if (name === 'Computer' || name === '책상') {
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

export default RoomModel;
