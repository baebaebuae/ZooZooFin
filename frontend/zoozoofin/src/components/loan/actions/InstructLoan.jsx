import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Loading } from '@components/root/loading';
import { InstructionCard } from '@components/loan/InstructionCard';

// import { getApiClient } from '@stores/apiClient';

const Block = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const InstructLoan = ({ goToScript }) => {
    const [currentCard, setCurrentCard] = useState(1);
    const [credit, setCredits] = useState([]);

    // // 신용 등급 받아오기
    // const fetchCredit = async () => {
    //     const apiClient = getApiClient();

    //     try {
    //         const res = await apiClient.get('/loan/check');
    //         console.log(res.data.body);
    //         setCredits(res.data.body);
    //     } catch (error) {
    //         return error;
    //     }
    // };

    // useEffect(() => {
    //     fetchCredit();
    // }, []);

    // useEffect(() => {}, [credit]);

    const goToNextCard = () => {
        setCurrentCard(currentCard + 1);
    };

    return (
        <Block>
            <InstructionCard>
                {(() => {
                    if (currentCard === 1) {
                        return <div>대출 안내 - 모르는 부분이 있나?</div>;
                    } else if (currentCard === 2) {
                        return (
                           <div></div>
                        );
                    }
                })()}
            </InstructionCard>
        </Block>
    );
};

export default InstructLoan;
