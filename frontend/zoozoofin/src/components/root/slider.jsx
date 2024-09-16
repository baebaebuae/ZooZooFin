// 입력 턴 조절하는 슬라이더
import { useState } from 'react';
import styled from 'styled-components';
import Slider from '@mui/material/Slider';
import { Input } from './input';

export const SliderBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 250px;
`;

const marks = [
    {
        value: 1,
        label: '1턴',
    },
    {
        value: 25,
        label: '25턴',
    },
    {
        value: 50,
        label: '50턴',
    },
];

function valuetext(value) {
    return `${value}턴`;
}

export const TurnSlider = () => {
    const [value, setValue] = useState(0);

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleInputChange = (event) => {
        setValue(event.target.value === '' ? 0 : Number(event.target.value));
    };

    return (
        <SliderBox>
            <Input value={value} unit={'턴'} hasValue={true} onChange={handleInputChange}></Input>
            <Slider
                aria-label="Turn Slider"
                defaultValue={25}
                getAriaValueText={valuetext}
                onChange={handleSliderChange}
                shiftStep={5}
                step={1}
                marks={marks}
                valueLabelDisplay="auto"
                min={1}
                max={50}
            />
        </SliderBox>
    );
};
