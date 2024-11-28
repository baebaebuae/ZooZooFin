import React from 'react';
import styled from 'styled-components';
const Container = styled.div`
    border: 1px solid black;
    height: 20px;
    width: 250px;
    margin: 10px auto;
`;
const RestTime = styled.div`
    height: 100%;
    width: ${(props) => (props.time ? `${(props.time / 10) * 100}%` : `0%`)};
    background: linear-gradient(
        to left,
        ${(props) => (props.time > 6 ? `#28a745` : `#ef5f17`)},
        ${(props) => (props.time > 3 ? `#ef5f17` : `#df3740`)}
    );
    transition: width 0.2s ease-in-out;
`;

const TimeBar = ({ time }) => {
    return (
        <Container>
            <RestTime time={time} />
        </Container>
    );
};

export default TimeBar;
