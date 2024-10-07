import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { LaptopInfoBox } from '@components/root/infoBox';

import MuiAccordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { getApiClient } from '@stores/apiClient';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    width: '100%',
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&::before': {
        display: 'none',
    },
}));

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    height: 400px;
    overflow-y: auto;
`;

const AppContent = styled.div`
    width: 100%;
    font-weight: bold;
    font-size: 20px;
    text-align: left;
    margin: 20px 0;
`;

const LoanListTitleBox = styled.div`
    width: 90%;
    font-size: 12px;
    text-align: center;
    padding: 8px;
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
    display: grid;
    grid-template-columns: 2fr 5fr 2fr 1fr;
`;

const LoanListTitle = styled.div`
    color: ${({ theme }) => theme.colors.gray};
`;

const LoanListContentBox = styled.div`
    width: 100%;
    font-size: 12px;
    text-align: center;
    padding: 0 4px;
    display: grid;
    grid-template-columns: 2fr 8fr 2fr;
`;

const LoanListContent = styled.div`
    font-size: 14px;
`;

const LoanListAmount = styled.div`
    font-weight: bold;
    font-size: 14px;
`;

const LoanListDetailBox = styled.div`
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: 10px;
    padding: 16px 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    font-size: 10px;
`;

const LoanListDetailBoxContent = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
`;

const LoanListDetailContent = styled.div`
    color: ${({ theme }) => theme.colors.primaryShadow};
`;

const LoanListDetailAmount = styled.div`
    font-weight: bold;
    font-size: 12px;
`;

const Loa0nListDetailType = styled.div`
    color: ${({ theme }) => theme.colors.primaryDeep};
    font-weight: bold;
    font-size: 12px;
`;

const LoanListDetailNotice = styled.div`
    color: ${({ theme }) => theme.colors.gray};
`;

const LoanListDetailNoticeAmount = styled(LoanListDetailNotice)`
    font-weight: bold;
    color: ${({ theme }) => theme.colors.warn};
    font-size: 12px;
`;

const BlankBlock = styled.div`
    color: gray;
    height: 100px;
    margin: 50px 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const BankLoan = () => {
    const [loanData, setLoanData] = useState([]);

    const tempData = {
        totalLoan: 1292735000,
        restLoan: 820943500,
        myLoanList: [
            {
                loanId: 1,
                loanNumber: 1,
                loanRate: 5,
                payBackTurn: 1,
                loanPeriod: 14,
                loanAmount: 300000000,
                loanRemain: 200000000,
                loanType: 3,
                warning: true,
            },
            {
                loanId: 2,
                loanNumber: 2,
                loanRate: 10,
                payBackTurn: 4,
                loanPeriod: 20,
                loanAmount: 1357530000,
                loanRemain: 294800000,
                loanType: 2,
                warning: false,
            },
        ],
    };

    const fetchLoanData = async () => {
        const apiClient = getApiClient();

        try {
            const res = await apiClient.get('/loan/my');
            console.log(res.data.body);
            setLoanData(res.data.body);
        } catch (error) {
            setLoanData(tempData);
            return error;
        }
    };

    useEffect(() => {
        fetchLoanData();
    }, []);

    const loanType = { 1: '만기일시상환', 2: '원금균등상환', 3: '원리금균등상환' };

    return (
        <Container>
            {loanData && loanData.totalLoan > 0 && (
                <LaptopInfoBox
                    color={'primaryDeep'}
                    infoTitle={'님의 대출 총 금액'}
                    infoContent={`${loanData.totalLoan.toLocaleString()}🥕`}
                ></LaptopInfoBox>
            )}
            <AppContent>대출 리스트</AppContent>
            <LoanListTitleBox>
                <LoanListTitle>대출번호</LoanListTitle>
                <LoanListTitle>대출금액</LoanListTitle>
                <LoanListTitle>이자율</LoanListTitle>
                <div></div>
            </LoanListTitleBox>

            {loanData && loanData.myLoanList && loanData.myLoanList.length === 0 && (
                <BlankBlock>아직 받은 대출이 없어요.</BlankBlock>
            )}

            {loanData &&
                loanData.length > 0 &&
                loanData.myLoanList.length > 0 &&
                loanData.myLoanList.map((loan, index) => {
                    return (
                        <Accordion key={index}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="loanList-content"
                                id="loanList-header"
                            >
                                <LoanListContentBox>
                                    <LoanListContent>{loan.loanNumber}</LoanListContent>
                                    <LoanListAmount>
                                        {loan.loanAmount.toLocaleString()}🥕
                                    </LoanListAmount>
                                    <LoanListContent>{loan.loanRate}%</LoanListContent>
                                </LoanListContentBox>
                            </AccordionSummary>
                            <AccordionDetails>
                                <LoanListDetailBox>
                                    <LoanListDetailBoxContent>
                                        <LoanListDetailContent>대출 기간</LoanListDetailContent>
                                        <LoanListDetailAmount>
                                            {loan.loanPeriod}턴
                                        </LoanListDetailAmount>
                                        <LoanListDetailContent>남은 턴</LoanListDetailContent>
                                        <LoanListDetailAmount>
                                            {loan.loanPeriod - loan.payBackTurn}턴
                                        </LoanListDetailAmount>
                                        <Loa0nListDetailType>
                                            {loanType[loan.loanType]}
                                        </Loa0nListDetailType>
                                    </LoanListDetailBoxContent>
                                    <LoanListDetailBoxContent>
                                        <LoanListDetailNotice>이번 턴에서</LoanListDetailNotice>
                                        <LoanListDetailNoticeAmount>
                                            ????????🥕
                                        </LoanListDetailNoticeAmount>
                                        <LoanListDetailNotice>상환 예정</LoanListDetailNotice>
                                    </LoanListDetailBoxContent>
                                </LoanListDetailBox>
                            </AccordionDetails>
                        </Accordion>
                    );
                })}
        </Container>
    );
};
