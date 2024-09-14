// 신용 등급
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CreditArrow from '@assets/images/credit_arrow.svg?react';

const CreditBoxStyle = styled.div`
    font-family: 'OneMobilePop';
    color: gray;
`;

const CreditTitle = styled.div`
    font-size: 10px;
    margin-bottom: 4px;
    text-align: start;
`;

const CreditRateBox = styled.div`
    position: relative;
    width: 40px;
    left: ${(props) => (props.grade ? `${(props.grade - 1) * 20}px` : '0px')};
`;

// width는 임의로 20 * 10값으로 지정(10등급)
const CreditBar = styled.div`
    width: 200px;
    height: 7px;
    border-radius: 5px;
    background: linear-gradient(270deg, #4ec306 -0.25%, #f0e92d 26.3%, #f00 99.96%);
`;

const CreditRate = styled.div`
    width: 40px;
    font-size: 12px;
`;

export default function CreditBox({ grade }) {
    return (
        <CreditBoxStyle>
            <CreditTitle>신용 등급</CreditTitle>
            <CreditBar></CreditBar>
            <CreditRateBox grade={grade}>
                <CreditArrow />
                <CreditRate grade={grade}>{grade}등급</CreditRate>
            </CreditRateBox>
        </CreditBoxStyle>
    );
}

// 공식 가이드 따라서 했음 / 필요성은 아직 의문
CreditBox.propsTypes = {
    grade: PropTypes.number.isRequired,
};
