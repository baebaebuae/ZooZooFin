import styled from 'styled-components';

const BillContainer = styled.div`
    width: 320px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    letter-spacing: 2px;

    z-index: 1000;

    gap: 4px;
    padding: 6px;
    background-color: ${({ theme }) => theme.colors.billBack};
`;

const BillTitle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 4px 0;
    font-weight: bold;
    letter-spacing: 8px;
    color: ${({ theme }) => theme.colors.billBlueText};
    background-color: ${({ theme }) => theme.colors.billBlueBack};
`;

const BillContent = styled(BillTitle)`
    font-size: 10px;
    letter-spacing: 2px;
    background-color: transparent;
`;

const CheckButton = styled.div`
    width: 50px;
    padding: 4px;
    text-align: center;
    color: ${({ theme }) => theme.colors.billRedText};
    border: 1px solid ${({ theme }) => theme.colors.billRedText};
`;

export const BankruptNotice = ({ checkBill }) => {
    const warnTexts = [
        '지난 턴에 대출을 갚지 않아서 자산이 마이너스가 되었어.',
        '직접 은행에 방문해서 파산 신청을 하거나,',
        '파산하지 않고 돈을 벌거나 예적금 이자를 받을 수 있어.',
    ];

    return (
        <BillContainer>
            <BillTitle>안내</BillTitle>

            <BillContent>{warnTexts[0]}</BillContent>
            <BillContent>{warnTexts[1]}</BillContent>
            <BillContent>{warnTexts[2]}</BillContent>

            <CheckButton onClick={checkBill}>확인</CheckButton>
        </BillContainer>
    );
};
