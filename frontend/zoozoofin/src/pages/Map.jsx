import { styled } from 'styled-components';
import { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

import { Bill } from '@components/Bill';

import { Loader } from '@components/Loader';

const BillContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
`;

// Environment 설정
// https://drei.docs.pmnd.rs/staging/environment

const MapSample = ({ setIsPostboxClicked }) => {
    const modelRef = useRef();
    const navigate = useNavigate();

    // const { scene } = useGLTF('/realfinal.glb');
    const { scene } = useGLTF('/floor_final.glb');
    // Selected Objects는 ground만 뽑히고 나머지는 사라짐 - 실패

    //// --------------------------------- ////
    // maphier: hierarchy 선택. parent가 Scene에서 'Scene_Colletion'으로 변함 - 유의미한 변화 ?!
    // maphier에서 클릭 이벤트 성공!! //
    // --> collection hierarchy 선택한 후에 진행하기
    //// --------------------------------- ////

    // 똑같은 파일인데 렌더링 실패(include에서 collection, objects 설정한 상태)
    // --> 파일 다시 만들었더니 렌더링 성공. maptest3에서만 뭔가 문제가 있었던 듯

    const textureLoader = new THREE.TextureLoader();
    const roadTexture = textureLoader.load('/images/materials/texture_road.png');
    const grassTexture = textureLoader.load('/images/materials/texture_grass.png');

    roadTexture.wrapS = THREE.RepeatWrapping;
    roadTexture.wrapT = THREE.RepeatWrapping;
    roadTexture.repeat.set(5, 10);

    grassTexture.wrapS = THREE.RepeatWrapping;
    grassTexture.wrapT = THREE.RepeatWrapping;
    grassTexture.repeat.set(1, 3);

    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                if (child.parent.name === 'Scene_Collection') {
                    child.material = new THREE.MeshStandardMaterial({
                        map: roadTexture,
                        color: 0x6c7377,
                    });
                    child.receiveShadow = true;
                }
                if (child.parent.name === 'Floors') {
                    child.material = new THREE.MeshStandardMaterial({
                        map: grassTexture,
                        // color: 0x147952,
                        color: 0x558b2f,
                    });
                    child.receiveShadow = true;
                }
            }
        });
    }, [scene]);

    //// --------------------------------- ////
    //// ------------raycaster------------ ////
    // https://discourse.threejs.org/t/how-to-click-on-objects-in-an-uploaded-3d-model/36443
    // https://discourse.threejs.org/t/how-to-set-clickable-ares-on-gltf-3d-model/18046/6
    // 이 두 레퍼런스에서 공통만 추려봄

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const { camera } = useThree();
    // mouse는 사장된 문법이라고함
    // --> 그게 메인 문제는 아니고 useThree()로 사용하는 게 잘못됨

    const onClick = (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children, true);
        if (intersects.length > 0) {
            // console.log('Intersection:', intersects[0]);
            const clickedObject = intersects[0].object;
            // console.log(`clickedObject.name: ${clickedObject.name}`);
            console.log(`clickedObject's PARENT : ${clickedObject.parent.name}`);
            if (clickedObject.parent.name === 'Bank') {
                navigate('/bank');
            } else if (clickedObject.parent.name === 'Capital') {
                navigate('/lender');
            } else if (clickedObject.parent.name === 'Stock') {
                navigate('/stock');
            } else if (clickedObject.parent.name === 'House') {
                navigate('/myroom');
            } else if (clickedObject.parent.name === 'Carrots') {
                navigate('/work');
            } else if (clickedObject.parent.name === 'Postbox') {
                setIsPostboxClicked(true);
                // navigate('/work');
            }
        }
    };
    // useFrame(() => {s
    //     const bankBuilding = scene.getObjectByName('BankBuilding'); // BankBuilding 이름 확인
    //     if (bankBuilding) {
    //         bankBuilding.traverse((child) => {
    //             if (child.isMesh) {
    //                 // Mesh마다 클릭 이벤트 처리
    //                 child.onClick = () => {
    //                     navigate('/bank'); // 페이지 이동
    //                 };
    //             }
    //         });
    //     }
    // });

    return <primitive object={scene} ref={modelRef} scale={0.5} onPointerDown={onClick} />;
    // PointerDown과 Click의 차이 => P.D.은 왼오스크롤 클릭, Click은 only left
    // P.D.는 document, element, Window까지 보내줌
    // mousedown은 element만
};

const CanvasBoard = styled.div`
    width: 360px;
    height: 640px;
    position: fixed;
    top: 0;
    left: 0;
`;

// const cubeTextureLoader = new THREE.CubeTextureLoader();
// const environmentMap = cubeTextureLoader.load([
//     '/environmentMaps/0/px.png',
//     '/environmentMaps/0/nx.png',
//     '/environmentMaps/0/py.png',
//     '/environmentMaps/0/ny.png',
//     '/environmentMaps/0/pz.png',
//     '/environmentMaps/0/nz.png',
// ]);

const Map = () => {
    const [isPostboxClicked, setIsPostboxClicked] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    // 입장 시 로딩 페이지
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    // 로딩 중일 때 Loader 컴포넌트 렌더링
    if (isLoading) {
        return <Loader loadingText={'지도로 입장하는 중...'} />;
    }

    return (
        <>
            {isPostboxClicked && <Bill checkBill={() => setIsPostboxClicked(false)} />}
            <CanvasBoard>
                <Canvas
                    shadows
                    camera={{ fov: 40, position: [4, 5.3, 4.9] }}
                    style={{ background: 'none' }}
                >
                    <ambientLight color={'#EBF4F0'} intensity={3} />
                    {/* <directionalLight color={'#f7954f'} position={[10, 10, 30]} intensity={0.5} /> */}
                    <directionalLight
                        castShadow
                        position={(-1, 1, 1)}
                        color={'#cdcdcd'}
                        intensity={4}
                        shadow-bias={-0.0001}
                        shadow-normalBias={0.01}
                    />
                    <Suspense fallback={null}>
                        <MapSample castShadow setIsPostboxClicked={setIsPostboxClicked} />
                    </Suspense>
                    <OrbitControls
                        enablePan={true}
                        enableZoom={false}
                        enableRotate={false}
                        minDistance={6}
                        maxDistance={6}
                        maxPolarAngle={Math.PI / 2}
                    />
                </Canvas>
            </CanvasBoard>
        </>
    );
};

export default Map;
