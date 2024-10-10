import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import styled from 'styled-components';
import Rabbit from '@assets/images/characters/rabbit.png';
import { Button } from '@components/root/buttons';

import CreateNameModal from '@components/character/NameModal';

import { getApiClient } from '@stores/apiClient';

const Block = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const TitleMessage = styled.div`
    font-family: 'OneMobilePop';
    font-size: 20px;
    margin: 30px 0;
    color: ${({ theme }) => theme.colors.orange};
    text-shadow:
        -1px 0px white,
        0px 1px white,
        1px 0px white,
        0px -1px white;
`;

const AnimalBlock = styled.div`
    overflow-x: auto;
    // 여러 캐릭터 들어온 후 가로 스크롤 설정 확인(width 값 조심 !!)
    margin: 20px 0;
`;

const AnimalCard = styled.div`
    width: 240px;
    border-radius: 28px;
    padding: 5px;
    background: ${({ $isSelected }) =>
        $isSelected ? 'linear-gradient(90deg, red, yellow, green)' : 'none'};
`;

const AnimalPhoto = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 180px;
    padding: 30px;
    background-color: rgba(235, 240, 244, 0.9);
    border-radius: 20px 20px 0px 0px;
`;

const AnimalInfoBox = styled.div`
    height: 80px;
    padding: 30px;
    background-color: rgba(15, 92, 123, 0.9);
    border-radius: 0px 0px 20px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
`;

const AnimalInfoName = styled.div`
    font-family: 'MangoDdobak';
    font-size: 24px;
    color: white;
    margin-bottom: 12px;
`;

const AnimalInfoCondition = styled.div`
    font-size: 14px;
    color: white;
`;

const AnimalInfoSpecial = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const AnimalInfoSpecialContent = styled(AnimalInfoCondition)`
    font-size: 16px;
`;

const AnimalInfoSpecialNum = styled(AnimalInfoSpecialContent)`
    font-family: 'OneMobilePop';
    font-size: 20px;
    color: black;
    text-shadow:
        -1px 0px white,
        0px 1px white,
        1px 0px white,
        0px -1px white;
`;

const CreateAnimal = () => {
    const [animals, setAnimals] = useState([]);
    const [selectedAnimal, setSelectedAnimal] = useState(null);
    const [isNameModalShown, setIsNameModalShown] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    // isStarted 받아서
    const isStarted = location.state.isStarted;
    console.log('isStarted: ', isStarted);

    const moveToNextStep = () => {
        console.log('동물 select 됐나요', selectedAnimal);
        if (!isStarted) {
            // 튜토리얼 본 적 없으면 (!isStarted)
            // tutorial로 이동
            navigate('/tutorial', {
                state: {
                    animalTypeId: selectedAnimal.animalTypeId,
                },
            });
        } else {
            // 튜토리얼 본 적 있으면 (isStarted) 이 페이지에서 바로 이름 생성 블락 띄우기
            setIsNameModalShown(true);
        }
    };

    const handleClick = (animal) => {
        setSelectedAnimal(animal);
    };

    const fetchAnimals = async () => {
        const apiClient = getApiClient();

        try {
            const res = await apiClient.get('/animal');

            console.log(res.data.body);
            setAnimals(res.data.body);
        } catch (error) {
            console.error('error: ', error);
            return error;
        }
    };

    useEffect(() => {
        fetchAnimals();
    }, []);

    useEffect(() => {}, [animals]);

    return (
        <>
            {!isNameModalShown ? (
                <Block>
                    <TitleMessage>생성할 캐릭터를 선택해줘.</TitleMessage>

                    <AnimalBlock>
                        {/* 받아온 animals 없을 때 에러 처리 */}
                        {animals &&
                            animals.map((animal, index) => {
                                4;
                                return (
                                    <AnimalCard
                                        key={index}
                                        // isSelected={animal === selectedAnimal}
                                        $isSelected={
                                            animal.animalTypeId === selectedAnimal?.animalTypeId
                                        }
                                        onClick={() => handleClick(animal)}
                                    >
                                        <AnimalPhoto>
                                            {/* <Rabbit width={150} height={150} /> */}
                                            <img src={Rabbit} />
                                        </AnimalPhoto>

                                        <AnimalInfoBox>
                                            <AnimalInfoName>{animal.animalTypeName}</AnimalInfoName>
                                            <AnimalInfoCondition>
                                                캐릭터 우대사항
                                            </AnimalInfoCondition>
                                            <AnimalInfoSpecial>
                                                <AnimalInfoSpecialContent>
                                                    없음
                                                </AnimalInfoSpecialContent>
                                                {/* <AnimalInfoSpecialNum>
                                            +{animal.animalAbility}%
                                            </AnimalInfoSpecialNum> */}
                                            </AnimalInfoSpecial>
                                        </AnimalInfoBox>
                                    </AnimalCard>
                                );
                            })}
                    </AnimalBlock>
                    {selectedAnimal && (
                        <Button $isBorder={true} color={'primaryShadow'} onClick={moveToNextStep}>
                            선택 완료
                        </Button>
                    )}
                </Block>
            ) : (
                <Block>
                    이름 생성 모달
                    <CreateNameModal animalTypeId={selectedAnimal.animalTypeId} />
                </Block>
            )}
        </>
    );
};

export default CreateAnimal;
