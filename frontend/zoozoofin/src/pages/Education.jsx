import React, { useState, useEffect, useRef } from 'react';
import Bubble from '@components/root/bubble';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import backgroundImage from '@assets/images/background/stock.png';
import useUserStore from '@/stores/userStore';
import Sheep from '@/assets/images/characters/characters/Sheep.gif';

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

const ImageContainer = styled.div`
    position: absolute;
    bottom: 38%;
    right: 1%;
    height: 50%;
`;

const SheepImage = styled.img`
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
`;

const BubbleBlock = styled(Bubble)`
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    z-index: 1;
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
    animation: ${blink} 1.8s infinite;
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

const educationTopics = [
    { content: '주식을 소유하면 어떤 권리를 얻을 수 있는지 알아볼까?', img_num: '001,002' },
    { content: '주식의 종류에 뭐가 있는지 간단하게 알려줄까?', img_num: '003,004' },
    { content: '주식 투자 주체에 대해 알아보지 않을래?', img_num: '005' },
    { content: '기업 실적 분석하는 방법에 대해 알아보지 않을래?', img_num: '006,007,008,009' },
    { content: '코스피와 코스닥에 대해 알아보고 넘어가자!', img_num: '010' },
    { content: 'ROE,PER, PBR에 대해 알려줄게!', img_num: '011,012,013,014' },
    { content: 'BPS,EPS,ROA,EV, EPS vs PER에 대해 알려줄게!', img_num: '015,016,017,018,019' },
    { content: '주식에서는 봉차트가 중요한데 알아볼래?', img_num: '020,021,022,023' },
    { content: '봉차트 해석하는 법에 대해 간단히 알려줄게!', img_num: '024,025,026' },
    { content: '이동평균선에 대해 알아보지 않을래?', img_num: '027,028' },
    { content: '지지선, 저항선에 대해 알아보고 넘어가자!', img_num: '029,030' },
    { content: '이동평균선에도 패턴이 있어! 간단하게 알려줄게!', img_num: '031,032' },
    { content: '금리 변동, 환율 변동에 대해 알아보고 넘어가자!', img_num: '033,034,035' },
    { content: '정부 정책과 규제, 인수합병, 외국인 투자자에 대해 알아보고 넘어가자!', img_num: '036,037,038' },
    { content: '주가 상승 포인트가 뭐가 있을지 궁금하지 않아?', img_num: '039,040,041,042,043,044' },
    { content: '주가 하락 포인트가 뭔가 있을지 궁금하지 않아?', img_num: '045,046,047,048' },
];


// 동적으로 이미지를 import하기 위한 설정
const images = import.meta.glob('/src/assets/images/Education/stock/*.png');

const Education = () => {
    const [showEducation, setShowEducation] = useState(false);
    const [educationImages, setEducationImages] = useState([]);
    const [imageLoadError, setImageLoadError] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef(null);
    const navigate = useNavigate();
    const { turn } = useUserStore();

    const educationTopic = educationTopics[(turn - 1) % educationTopics.length];

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
    }, [educationTopic]);

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
                    <ImageContainer>
                        <SheepImage src={Sheep} alt="Sheep Teacher" />
                    </ImageContainer>
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