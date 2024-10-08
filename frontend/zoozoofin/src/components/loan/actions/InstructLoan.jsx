import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Loading } from '@components/root/loading';
import { InstructionCard } from '@components/loan/InstructionCard';
import { Button } from '@components/root/buttons';

// import { getApiClient } from '@stores/apiClient';

const Block = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const TitleBlock = styled.div`
    font-weight: bold;
    font-size: 16px;
`;

const QuestionBlock = styled.div`
    font-size: 14px;
`;

const AnswerBlock = styled.div`
    font-size: 12px;
`;

const InstructLoan = ({ goToScript }) => {
    const [currentCard, setCurrentCard] = useState(1);
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);

    const goToNextCard = () => {
        setCurrentCard(currentCard + 1);
    };

    const backToPrevCard = () => {
        setCurrentCard(currentCard - 1);
    };

    const questions = [
        '▶ 대출이자는 왜 따로 갚지?',
        '▶ 단리가 뭐야?',
        '▶ 원금균등상환이 뭐야?',
        '▶ 원리금균등상환이 뭐야?',
        '▶ 만기일시상환이 뭐야?',
        '▶ 대출금을 갚지 못하면 어떻게 돼?',
        '▶ 다 확인했어.',
    ];

    const answers = [
        '대출이자는 빌린 돈을 사용하는 대가로 지불하는 사용료다. 이자와 원금은 각각 사용료와 빌린 금액의 상환이라는 다른 역할을 하기 때문에 따로 갚는거지.',
        '단리는 원금에 대해서만 이자를 계산하는 방법이다. 원금에 붙은 이자까지 복리와 다르게 매달 같은 수의 이자가 붙지.',
        '원금균등상환은 잔여 대출기간동안 매턴 동일한 원금을 납부하는 방식이다. 이자는 매턴 원금이 공제된 잔금에 대하여 납부하는 방식이지. 회차별로 이자가 줄어들기 때문에, 세 방법 중 가장 적은 이자를 낼 수 있어.',
        '원리금균등상환은 매턴 약정된 원금과 이자가 정액으로 나가는 방식이다. 매턴 원금은 늘어나기 때문에, 이자는 그만큼 줄어들지. 쉽게 말해서, 매달 일정한 돈을 내는거다. ',
        '만기일시상환은 매 턴 원금에 대한 이자만 납부하고 원금은 만기에 모두 상환하는 방식이다. 매달 내는 금액은 적지만, 대출 기간 동안 내야 하는 이자 금액은 가장 높지.',
        '대출금을 갚지 못하면 자동으로 파산 절차가 진행된다. ',
    ];

    const getAnswer = (index) => {
        setSelectedQuestionIndex(index);
        goToNextCard();
    };

    return (
        // <Block>
        <InstructionCard>
            {(() => {
                if (currentCard === 1) {
                    return (
                        <Block>
                            <TitleBlock>자, 여기서 모르는 부분이 있나?</TitleBlock>
                            {questions.map((question, index) => {
                                return (
                                    <QuestionBlock
                                        key={index}
                                        onClick={
                                            index < 7 ? () => getAnswer(index) : () => goToScript()
                                        }
                                    >
                                        {question}
                                    </QuestionBlock>
                                );
                            })}
                        </Block>
                    );
                    // 질문들~~
                } else if (currentCard === 2) {
                    return (
                        <Block>
                            <TitleBlock>{questions[selectedQuestionIndex]}</TitleBlock>
                            <div>이미지</div>
                            <AnswerBlock>{answers[selectedQuestionIndex]}</AnswerBlock>
                            <Button color={'primaryDeep'} onClick={() => backToPrevCard()}>
                                닫기
                            </Button>
                        </Block>
                    );
                }
            })()}
        </InstructionCard>
        // </Block>
    );
};

export default InstructLoan;
