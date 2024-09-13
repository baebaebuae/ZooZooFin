import styled from 'styled-components';

const InputBox = styled.div`
    display: flex;
    width: 200px;
    height: 50px;
    justify-content: center;
    align-items: center;
    border-radius: 40px;
    background: var(--Background, #ebf0f4);
    color: gray;
`;

export const Input = () => {
    return (
        <>
            <InputBox>
                금액을 입력해줘. <div>X</div>
            </InputBox>
        </>
    );
};
