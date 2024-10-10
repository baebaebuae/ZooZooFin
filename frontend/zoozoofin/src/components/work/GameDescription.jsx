import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    position: absolute;
    display: flex;
    z-index: 1;
    border: 1px solid black;
    width: 300px;
    height: 500px;
    transform: translate(30px, 70px);

    background: ${({ theme }) => theme.colors.lightGreen};

    box-shadow:
        0px 19px 5px 0px rgba(0, 0, 0, 0),
        0px 12px 5px 0px rgba(0, 0, 0, 0.04),
        0px 7px 4px 0px rgba(0, 0, 0, 0.12),
        0px 3px 3px 0px rgba(0, 0, 0, 0.2),
        0px 1px 2px 0px rgba(0, 0, 0, 0.24),
        0px 0px 0px 0px rgba(0, 0, 0, 0.24);

    border-radius: 24px;
    border: 4px solid;
    border-color: ${({ theme }) => theme.colors.tertiary};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;
const Content = styled.div`
    display: flex;
    flex-direction: column;
`;
const Title = styled.div`
    margin: 10px 20px;
    font-family: 'OneMobilePop', cursive;
    font-size: 20px;
    color: ${({ theme }) => theme.colors.brown};
`;
const Text = styled.div`
    margin: 10px 20px;
    font-size: 15px;
    color: ${({ theme }) => theme.colors.brown};
`;
const RedText = styled.strong`
    color: ${({ theme }) => theme.colors.warn};
`;
const GreenText = styled.strong`
    color: ${({ theme }) => theme.colors.tertiaryDeep};
`;

const Btn = styled.button`
    width: 90px;
    height: 40px;
    margin-top: 10px;
    font-family: 'OneMobilePop', cursive;
    -webkit-text-stroke-width: 0.5px;
    -webkit-text-stroke-color: var(--White, #fff);

    background: ${({ theme }) =>
        `linear-gradient(180deg, #D1D9D1 10.81%, ${theme.colors.green} 100%)`};

    box-shadow:
        0px 19px 5px 0px rgba(0, 0, 0, 0),
        0px 12px 5px 0px rgba(0, 0, 0, 0.04),
        0px 7px 4px 0px rgba(0, 0, 0, 0.12),
        0px 3px 3px 0px rgba(0, 0, 0, 0.2),
        0px 1px 2px 0px rgba(0, 0, 0, 0.24),
        0px 0px 0px 0px rgba(0, 0, 0, 0.24);

    border-radius: 40px;
    border: 4px solid;
    border-color: ${({ theme }) => theme.colors.tertiary};
    display: flex;
    align-items: center;
    justify-content: center;
`;
const GameDescription = ({ setOpenModal }) => {
    const handleClick = () => {
        setOpenModal(false);
    };

    return (
        <Container>
            <Content>
                <Title>당근 받기 게임에 온 걸 환영해!</Title>
                <Text>
                    <GreenText>당근 받기 게임</GreenText>은 당근을 바구니에 받아서 투자에 필요한
                    재화를 얻는 <br /> 우리 도시의 대표 미니게임이야.
                </Text>
                <Text>
                    <GreenText>10초 동안</GreenText> 하늘에서 떨어지는 당근을 <br /> 받으면 돼.
                </Text>
                <Text>
                    그냥 당근은 <RedText>10만 당근</RedText>, 황금 당근은 무려{' '}
                    <RedText>100만 당근</RedText>으로 바꿔줄거야! <br />
                    어마어마하지?
                </Text>
                <Text>
                    아참! 썩은 당근을 주워오면 <br /> 농작물에 피해가 막심하니 <br />{' '}
                    <RedText>100당근을 차감</RedText>한다는 걸 잊지마~!
                </Text>
                <Text>
                    당근 받기 게임은 <br />
                    <GreenText>1턴당 1번만</GreenText> 할 수 있으니까 <br /> 열심히 당근을
                    받아보라구!!
                </Text>
            </Content>
            <Btn onClick={handleClick}>닫 기</Btn>
        </Container>
    );
};

export default GameDescription;
