import React, { useState, useEffect, useRef } from 'react';
import Bubble from '@components/root/bubble';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import backgroundImage from '@assets/images/background/stock.png';

const SchoolContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 360px;
    height: 640px;
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
`;

const BubbleBlock = styled(Bubble)`
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: calc(100% - 40px);
`;

const SliderContainer = styled.div`
    width: 100%;
    height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 80px;
    position: relative;
    z-index: 2;
`;

const StyledSlider = styled(Slider)`
    width: 100%;
    height: 100%;

    .slick-prev,
    .slick-next {
        z-index: 3;
        &:before {
            color: white;
        }
    }

    .slick-prev {
        left: 10px;
    }

    .slick-next {
        right: 10px;
    }
`;

const ImageContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 2;
`;

const StyledImage = styled.img`
    width: 100%;
    height: auto;
    object-fit: contain;
    margin-top: 20px;
    z-index: 2;
`;

const blink = keyframes`
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
`;

const Button = styled.button`
    color: white;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 28px;
    cursor: pointer;
    font-family: 'OneMobilePop', sans-serif;
    background-color: ${({ theme }) => theme.colors.primaryDeep};
    padding: 5px 15px; /* large 크기 */
    font-size: 15px;
    border: none; /* 기본적으로 테두리 없음 */
    animation: ${blink} 1s infinite;
    z-index: 3;
    width: 90px; /* 버튼의 가로 크기 */
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 120px;
`;

// 화면 전체를 어둡게 처리하는 오버레이
const DarkOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1;
    pointer-events: none;
`;

const NPCModel = () => {
    const { scene } = useGLTF('/models/mungmung.glb');
    return (
        <primitive
            object={scene}
            scale={1.3}
            position={[0.4, -2, -0.3]}
            rotation={[0, Math.PI / 6, 0]}
        />
    );
};

// 동적으로 이미지를 import하기 위한 설정
const images = import.meta.glob('/src/assets/images/Education/stock/*.png');

const Education = () => {
    const [showEducation, setShowEducation] = useState(false);
    const [educationImages, setEducationImages] = useState([]);
    const [imageLoadError, setImageLoadError] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef(null);
    const navigate = useNavigate();

    const educationTopic = {
        content: '주식을 소유하면 어떤 권리를 얻을 수 있는지 알아볼까?',
        img_num: '001,002',
    };

    useEffect(() => {
        const loadImages = async () => {
            try {
                const imagePromises = educationTopic.img_num.split(',').map(async (num) => {
                    const paddedNum = num.trim().padStart(3, '0');
                    const imagePath = `/src/assets/images/Education/stock/${paddedNum}.png`;
                    const imageModule = images[imagePath];
                    if (imageModule) {
                        const importedImage = await imageModule();
                        return importedImage.default;
                    } else {
                        throw new Error(`Image not found: ${imagePath}`);
                    }
                });

                const loadedImages = await Promise.all(imagePromises);
                setEducationImages(loadedImages);
                setImageLoadError(false);
            } catch (error) {
                console.error('Image loading error:', error);
                setImageLoadError(true);
            }
        };

        loadImages();
    }, []);

    const handleResponseClick = () => {
        setShowEducation(true);
    };

    const handleFinishClick = () => {
        navigate('/stock');
    };

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        afterChange: (current) => setCurrentSlide(current),
    };

    return (
        <SchoolContainer>
            {!showEducation ? (
                <>
                    <Canvas>
                        <ambientLight intensity={2.2} color="#fbf8ef" />
                        <NPCModel />
                        <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} />
                    </Canvas>
                    <BubbleBlock
                        npc={'양티처'}
                        type={'dialogue'}
                        content={educationTopic.content}
                        responses={[{ selection: '좋아요!', nextScript: 'SHOW_EDUCATION' }]}
                        onClick={handleResponseClick}
                    />
                </>
            ) : (
                <>
                    <DarkOverlay />
                    <SliderContainer>
                        {imageLoadError ? (
                            <div>이미지를 불러오는 데 실패했습니다.</div>
                        ) : (
                            <StyledSlider ref={sliderRef} {...settings}>
                                {educationImages.map((image, index) => (
                                    <ImageContainer key={index}>
                                        <StyledImage src={image} alt={`교육자료 ${index + 1}`} />
                                    </ImageContainer>
                                ))}
                            </StyledSlider>
                        )}
                    </SliderContainer>
                    {currentSlide === educationImages.length - 1 && (
                        <Button onClick={handleFinishClick}>마치기</Button>
                    )}
                </>
            )}
        </SchoolContainer>
    );
};

export default Education;
