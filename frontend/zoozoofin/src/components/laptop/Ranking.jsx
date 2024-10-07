import { useState, useEffect } from 'react';
import styled from 'styled-components';

import IconFrog from '@assets/images/icons/icon_frog.png';

import { getApiClient } from '@stores/apiClient';

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const AppContent = styled.div`
    width: 100%;
    font-weight: bold;
    font-size: 20px;
    text-align: left;
    margin: 20px 0;
`;

const LoanListBox = styled.div`
    width: 100%;
    font-size: 12px;
    text-align: center;
    padding: 14px 0;
    display: grid;
    grid-template-columns: 2fr 5fr 4fr;
`;

const LoanListTitleBox = styled(LoanListBox)`
    background-color: ${({ theme }) => theme.colors.background};
`;

const LoanListTitle = styled.div`
    font-weight: bold;
`;

const LoanListContent = styled.div`
    color: ${({ theme }) => theme.colors.gray};
    font-size: 12px;
`;

const LoanListNickname = styled(LoanListContent)`
    padding: 0 12px;
    display: flex;
    gap: 4px;
    align-items: center;
    justify-content: start;
`;

export const Ranking = () => {
    const [rankingData, setRankingData] = useState([]);

    const tempData = {
        updateTime: '2021-01-01T00:00',
        rankList: [
            {
                rank: 1,
                totalAsset: 104256000,
                characterImg: '',
                characterName: '지그농',
            },
            {
                rank: 2,
                totalAsset: 63556000,
                characterImg: '',
                characterName: '시니지니',
            },
            {
                rank: 3,
                totalAsset: 53000000,
                characterImg: '',
                characterName: '주주',
            },
            {
                rank: 4,
                totalAsset: 52000000,
                characterImg: '',
                characterName: '쟁',
            },
        ],
    };

    const fetchRankingData = async () => {
        const apiClient = getApiClient();

        try {
            const res = await apiClient.get('/ranking');
            console.log(res.data.body);
            setRankingData(res.data.body);
        } catch (error) {
            setRankingData(tempData);
            return error;
        }
    };

    useEffect(() => {
        fetchRankingData();
    }, []);

    return (
        <Container>
            <AppContent>랭킹</AppContent>
            <LoanListTitleBox>
                <LoanListTitle>순위</LoanListTitle>
                <LoanListTitle>유저 닉네임</LoanListTitle>
                <LoanListTitle>총 자산</LoanListTitle>
            </LoanListTitleBox>

            {rankingData.length > 0 &&
                rankingData.rankList.map((rank, index) => {
                    return (
                        <LoanListBox key={index}>
                            <LoanListContent>{rank.rank}</LoanListContent>
                            <LoanListNickname>
                                <img src={IconFrog} width={20} />
                                {rank.characterName}
                            </LoanListNickname>
                            <LoanListContent>{rank.totalAsset.toLocaleString()}</LoanListContent>
                        </LoanListBox>
                    );
                })}
        </Container>
    );
};
