import React from 'react';
import { useState, useEffect } from 'react';
import { getApiClient } from '@stores/apiClient';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Button } from '@components/root/buttons';

const NameModalBLock = styled.div`
    width: 360px;
    height: 640px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const NameModal = styled.div`
    width: 200px;
    height: 180px;
    padding: 20px;
    background-color: ${({ theme }) => theme.colors.lightOrange};
    border-radius: 30px;
    border: 8px solid;
    border-color: ${({ theme }) => theme.colors.orange};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const NameModalMessage = styled.div`
    font-size: 16px;
    color: ${({ theme }) => theme.colors.gray};
    font-family: 'OneMobile';
    margin: 10px 0;
`;

const NameModalInput = styled.input`
    caret-color: black;
    width: 150px;
    height: 30px;
    background-color: white;
    border-radius: 10px;
    border: 3px solid;
    border-color: ${({ theme }) => theme.colors.orange};
    margin: 20px 0;
    outline: none;
`;

// 캐릭터 정보 넘기기
const createAnimal = async (animalTypeId, animalName) => {
    const apiClient = getApiClient();

    console.log('animalTypeId:', animalTypeId);
    console.log('animalName:', animalName);

    const productData = {
        animalTypeId: animalTypeId,
        animalName: animalName,
    };

    try {
        console.log('Request Data:', productData);

        const res = await apiClient.post(`/animal`, productData, {});

        if (res.status === 200) {
            console.log(res.data);
        } else {
            console.error('Unexpected status code:', res.status);
        }
    } catch (error) {
        console.error('error: ', error);
        return error;
    }
};

const CreateNameModal = ({ animalTypeId }) => {
    const [animalName, setAnimalName] = useState(null);

    const onChange = (e) => {
        setAnimalName(e.target.value);
    };

    return (
        <NameModalBLock>
            <NameModal>
                <NameModalMessage>사용할 이름을 입력해줘.</NameModalMessage>
                <NameModalInput onChange={onChange} />
                <Button
                    color={'orange'}
                    $isBorder={true}
                    onClick={() => createAnimal(animalTypeId, animalName)}
                >
                    확인
                </Button>
            </NameModal>
        </NameModalBLock>
    );
};

export default CreateNameModal;
