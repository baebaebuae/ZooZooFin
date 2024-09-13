import styled from 'styled-components';

const WalletBox = styled.div`
    background-color: lightblue;
    width: 300px;
    height: 400px;
`;

const Wallet = () => {
    return (
        <>
            <WalletBox>
                <p>임시 지갑컴포넌트</p>
                <p>대출 가입 서류, 로딩중, 신용도 체크 등 활용</p>
            </WalletBox>
        </>
    );
};

export default Wallet;
