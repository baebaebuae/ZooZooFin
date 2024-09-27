import styled from 'styled-components';

const Block = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const Bankrupt = ({ productType }) => {
    return (
        <Block>
            <div>파산 확인 도장 모달</div>
        </Block>
    );
};

export default Bankrupt;
