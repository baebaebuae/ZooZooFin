import { styled } from 'styled-components';
import { Suspense, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

// Environment 설정
// https://drei.docs.pmnd.rs/staging/environment

const MapSample = () => {
    const modelRef = useRef();
    const navigate = useNavigate();

    const { scene } = useGLTF('/maphier.glb');
    // Selected Objects는 ground만 뽑히고 나머지는 사라짐 - 실패

    //// --------------------------------- ////
    // maphier: hierarchy 선택. parent가 Scene에서 'Scene_Colletion'으로 변함 - 유의미한 변화 ?!
    // maphier에서 클릭 이벤트 성공!! //
    // --> collection hierarchy 선택한 후에 진행하기
    //// --------------------------------- ////

    // 똑같은 파일인데 렌더링 실패(include에서 collection, objects 설정한 상태)
    // --> 파일 다시 만들었더니 렌더링 성공. maptest3에서만 뭔가 문제가 있었던 듯

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
            if (clickedObject.parent.name === 'BuildingBank') {
                navigate('/bank');
            } else if (clickedObject.parent.name === 'BuildingCapital') {
                navigate('/lender');
            } else if (clickedObject.parent.name === 'BuildingStock') {
                navigate('/stock');
            } else if (clickedObject.parent.name === 'House') {
                navigate('/myroom');
            }
            // 객체로 묶어서 ex.{'BuildingBank' : 'bank', 'BuildingStock': 'stock'}
            // 순회하기?
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
const Sinijini = () => {
    return (
        <>
            <CanvasBoard>
                <Canvas camera={{ fov: 60, position: [3, 3, 4] }} style={{ background: 'none' }}>
                    <axesHelper args={[200, 200, 200]} />
                    {/* x,y,z축 확인하는거임 */}
                    <ambientLight intensity={5} />
                    <directionalLight position={[10, 10, 5]} intensity={1.5} />
                    <Suspense fallback={null}>
                        <MapSample />
                    </Suspense>
                    <OrbitControls
                        enablePan={false}
                        enableZoom={false}
                        enableRotate={false}
                        minDistance={6}
                        maxDistance={6}
                        // maxPolarAngle={Math.PI / 2}
                    />
                </Canvas>
            </CanvasBoard>
        </>
    );
};

export default Sinijini;
