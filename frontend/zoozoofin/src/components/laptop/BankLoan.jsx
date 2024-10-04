import styled from 'styled-components';
import { styled as S } from '@mui/material/styles';

import { InfoBox } from '@components/root/infoBox';

import MuiAccordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

export const BankLoan = () => {
    const data = {
        totalLoan: 1292735000,
        restLoan: 820943500,
        loanList: [
            {
                loanId: 1,
                loanNumber: 1,
                loanRate: 5,
                payBackTurn: 1,
                loanPeriod: 14,
                loanAmount: 300000000,
                loanRemain: 200000000,
                warning: true,
                loanType: 3,
            },
            {
                loanId: 2,
                loanNumber: 2,
                loanRate: 10,
                payBackTurn: 4,
                loanPeriod: 20,
                loanAmount: 1357530000,
                loanRemain: 294800000,
                warning: false,
                loanType: 2,
            },
        ],
    };

    const loanType = { 1: '만기일시상환', 2: '원금균등상환', 3: '원리금균등상환' };

    return (
        <Container>
            <InfoBox
                color={'primaryDeep'}
                infoTitle={'님의 대출 총 금액'}
                infoContent={`${data.totalLoan.toLocaleString()}원`}
            ></InfoBox>
            <AppContent>대출 리스트</AppContent>
            <LoanListTitleBox>
                <LoanListTitle>대출번호</LoanListTitle>
                <LoanListTitle>대출금액</LoanListTitle>
                <LoanListTitle>이자율</LoanListTitle>
                <div></div>
            </LoanListTitleBox>

            {data.loanList.map((loan, index) => {
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
                                    {loan.loanAmount.toLocaleString()}원
                                </LoanListAmount>
                                <LoanListContent>{loan.loanRate}%</LoanListContent>
                            </LoanListContentBox>
                        </AccordionSummary>
                        <AccordionDetails>
                            <LoanListDetailBox>
                                <LoanListDetailBoxContent>
                                    <LoanListDetailContent>대출 기간</LoanListDetailContent>
                                    <LoanListDetailAmount>{loan.loanPeriod}턴</LoanListDetailAmount>
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
                                        ????????원
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
