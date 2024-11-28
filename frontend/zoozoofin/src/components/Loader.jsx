import styled from 'styled-components';
import Loading from '@assets/images/background/loading.png';
// import Loadingtest2 from '@assets/images/background/loadingtest2.svg';

import LoadingPuppy from '@assets/images/characters/loadingPuppy.png';

const Block = styled.div`
    /* position: relative; */
`;

const Background = styled.div`
    /* width: 360px; */
    /* height: 640px; */
    width: 100%;
    /* height: 100%; */
    height: 640px;
    background-image: url(${(props) => props.backgroundimage});
    background-size: cover;
    z-index: -1;
    /* position: fixed; */
    /* top: 0; */
    /* left: 0; */
    position: absolute;
`;

const LoadingContainer = styled.div`
    width: 360px;
    height: 640px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 2;
`;

const LoadingText = styled.div`
    font-family: 'YeongdeokSea';
    font-size: 20px;
    font-weight: bold;
    /* color: ${({ theme }) => theme.colors.gray}; */
    color: black;
    text-shadow:
        -1px 0px white,
        0px 1px white,
        1px 0px white,
        0px -1px white;
    z-index: 3;
`;

export const Loader = ({ loadingText }) => {
    return (
        <Block>
            <Background backgroundimage={Loading} />
            {/* <Background backgroundimage={Loadingtest2} /> */}

            <LoadingContainer>
                <img src={LoadingPuppy} alt="Loading Puppy" />
                <LoadingText>{loadingText}</LoadingText>
            </LoadingContainer>
        </Block>
    );
};
