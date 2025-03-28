// 입력 턴 조절하는 슬라이더
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Slider from '@mui/material/Slider';
import { Input } from './input';
import { ProductJoinInfo } from '@components/root/productDetailInfo';

export const SliderBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 250px;
    gap: 8px;
`;

// function valuetext(value) {
//     return `${value}턴`;
// }

export const TurnSliderLoan = ({ title, min, max, onTurnChange }) => {
    const midAmount = Math.floor((min + max) / 2);
    const [value, setValue] = useState(midAmount);

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleInputChange = (event) => {
        setValue(event.target.value === '' ? 0 : Number(event.target.value));
    };

    useEffect(() => {
        onTurnChange(value);
    }, [value, onTurnChange]);

    const marks = [
        {
            value: min,
            label: `${min}턴`,
        },
        {
            value: midAmount,
            label: `${midAmount}턴`,
        },
        {
            value: max,
            label: `${max}턴`,
        },
    ];

    return (
        <SliderBox>
            <Input title={title} value={`${value} 턴`} onChange={handleInputChange}></Input>
            <Slider
                aria-label="Turn Slider"
                defaultValue={midAmount}
                // getAriaValueText={valuetext}
                onChange={handleSliderChange}
                shiftStep={5}
                step={1}
                marks={marks}
                min={min}
                max={max}
                sx={{
                    color: '#6D94B6',
                    '& .MuiSlider-thumb': {
                        color: '#0069C3',
                    },
                    '& .MuiSlider-track': {
                        color: '#0069C3',
                    },
                    '& .MuiSlider-rail': {
                        color: '#EBF0F4',
                    },
                }}
            />
        </SliderBox>
    );
};

// [TurnSliderCalc] 대출 이자 계산기에서 사용될 대출기간&대출금리 Slider 생성 예정
export const TurnSliderInterest = ({ title, min, max, unit, onValueChange }) => {
    const midAmount = Math.floor((min + max) / 2);
    const [value, setValue] = useState(midAmount);

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
        onValueChange(newValue);
    };

    // const handleInputChange = (event) => {
    //     setValue(event.target.value === '' ? 0 : Number(event.target.value));
    // };

    const marks = [
        {
            value: 1,
            label: `1${unit}`,
        },
        {
            value: midAmount,
            label: `${midAmount}${unit}`,
        },
        {
            value: max,
            label: `${max}${unit}`,
        },
    ];

    return (
        <SliderBox>
            <ProductJoinInfo isLoan={true} infoTitle={title} infoContent={`${value}${unit}`} />
            <Slider
                aria-label="Turn Slider"
                defaultValue={midAmount}
                // getAriaValueText={valuetext}
                onChange={handleSliderChange}
                shiftStep={5}
                step={1}
                marks={marks}
                min={min}
                max={max}
                sx={{
                    color: '#6D94B6',
                    '& .MuiSlider-thumb': {
                        color: '#0069C3',
                    },
                    '& .MuiSlider-track': {
                        color: '#0069C3',
                    },
                    '& .MuiSlider-rail': {
                        color: '#EBF0F4',
                    },
                }}
            />
        </SliderBox>
    );
};
