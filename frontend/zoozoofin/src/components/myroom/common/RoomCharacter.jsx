import { useLoader } from '@react-three/fiber';

import { TextureLoader } from 'three';
import CharRabbit from '@assets/images/characters/rabbit.png';

const CharacterImage = () => {
    const texture = useLoader(TextureLoader, CharRabbit);
    return (
        <mesh
            position={[-0.9, -0.7, -1.0]} // 위치 설정
            scale={[1.4, 1.4, 1.4]} // 크기 설정
            rotation={[0, Math.PI / 4.5, 0]} // Y축으로 180도 회전 (정면을 바라보게)
        >
            <planeGeometry args={[1, 1]} /> {/* 평면 지오메트리 생성 */}
            <meshBasicMaterial map={texture} transparent={true} /> {/* 텍스처 적용 */}
        </mesh>
    );
};

export default CharacterImage;
