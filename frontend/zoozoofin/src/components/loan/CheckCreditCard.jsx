import styled from 'styled-components';
import { Modal } from '@components/root/modal';
import { Button } from '@components/root/buttons';
import { InfoBox } from '@components/root/infoBox';
import CreditBox from '@components/root/creditBox';

const ModalTitle = styled.div`
    width: 100%;
    font-size: 20px;
    font-weight: bold;
    text-align: left;
    margin-bottom: 40px;
`;

const ModalBlock = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    gap: 30px;
`;

const InfoBlock = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
`;

const ContentBlock = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
`;

const ContentTitle = styled.div`
    font-size: 12px;
    color: ${({ theme }) => theme.colors.gray};
`;

const ContentBox = styled.div`
    color: ${({ theme }) => theme.colors.primaryDeep};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    font-size: 16px;
    font-weight: bold;
    width: 100%;
    height: 20px;
    padding: 12px;
    border-radius: 16px;
`;

const CheckCreditCard = ({
    goToScript,
    isAvailable,
    loanLimit,
    characterCredit,
    loanAvailable,
}) => {
    return (
        <>
            <Modal>
                <ModalTitle>신용대출 심사 결과</ModalTitle>
                <ModalBlock>
                    {isAvailable ? (
                        <InfoBox color={'tertiary'}>
                            <div>대출 가능</div>
                        </InfoBox>
                    ) : (
                        <InfoBox color={'warn'}>
                            <div>대출 불가</div>
                        </InfoBox>
                    )}
                    <CreditBox grade={characterCredit} />
                    <InfoBlock>
                        <ContentBlock>
                            <ContentTitle>대출 가능 금액(한도)</ContentTitle>
                            <ContentBox>{loanLimit}원</ContentBox>
                        </ContentBlock>
                        <ContentBlock>
                            <ContentTitle>잔여 대출 가능 금액</ContentTitle>
                            {/* <ContentBox>{`${loanAvailable.toLocaleSting()}원`}</ContentBox> */}
                            <ContentBox>{loanAvailable}원</ContentBox>
                        </ContentBlock>
                    </InfoBlock>
                    <Button
                        size={'normal'}
                        $isBorder={true}
                        color={'primaryDeep'}
                        onClick={goToScript}
                    >
                        확인
                    </Button>
                </ModalBlock>
            </Modal>
        </>
    );
};

export default CheckCreditCard;
