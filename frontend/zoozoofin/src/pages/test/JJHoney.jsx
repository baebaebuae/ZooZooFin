import { Badge } from '@components/root/badge';
import { Bubble } from '@components/root/bubble';
import {
    // Button,
    TinyButton,
    TinyButtonBorderBlank,
    SmallButton,
    SmallButtonBorder,
    NormalButton,
    NormalButtonBorder,
} from '@components/root/buttons';
import { CreditBar } from '@components/root/creditBar';
import { HeaderButton } from '@components/root/headerButton';
import { Icon } from '@components/root/Icon';
import { InfoBox } from '@components/root/infoBox';
import { Input } from '@components/root/input';
import { InputBox } from '@components/inputBox';
import { MessageBox } from '@components/root/messageBox';
import { ProductDetailInfo } from '@components/root/productDetailInfo';
import { ProgressBar } from '@components/root/progessBar';
import { Slider } from '@components/root/slider';
import { Toggle } from '@components/root/toggle';

import { Modal } from '@components/root/modal';
import styled from 'styled-components';

const Working = styled.div`
    background-color: lightgray;
    width: 360px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const JJHoney = () => {
    return (
        <>
            <h1>지현 작업실</h1>
            <h3>작업 공간 기준 width: 360px</h3>

            <Working>
                <h2>Badges</h2>
                <Badge></Badge>
            </Working>
            <Working>
                <h2>Bubble</h2>
                <Bubble></Bubble>
            </Working>
            <Working>
                <h2>Buttons</h2>
                {/* <Button>버튼</Button> */}
                <div>
                    <TinyButton>Tiny</TinyButton>
                    <TinyButtonBorderBlank>TinyBlank</TinyButtonBorderBlank>
                </div>

                <div>
                    <SmallButton>Small</SmallButton>
                    <SmallButtonBorder>SmallBorder</SmallButtonBorder>
                </div>

                <div>
                    <NormalButton>Normal</NormalButton>
                    <NormalButtonBorder>NormalBorder</NormalButtonBorder>
                </div>
            </Working>
            <Working>
                <h2>CreditBar</h2>
                <CreditBar></CreditBar>
            </Working>
            <Working>
                <h2>HeaderButtons</h2>
                <HeaderButton></HeaderButton>
            </Working>
            <Working>
                <h2>Icons</h2>
                <Icon></Icon>
            </Working>
            <Working>
                <h2>InfoBox</h2>
                <InfoBox></InfoBox>
            </Working>
            <Working>
                <h2>Input</h2>
                <h3>Input</h3>
                <Input></Input>
                <h3>InputBox</h3>
                <InputBox></InputBox>
            </Working>
            <Working>
                <h2>MessageBox</h2>
                <MessageBox></MessageBox>
            </Working>
            <Working>
                <h2>Modal</h2>
                <Modal></Modal>
            </Working>
            <Working>
                <h2>ProductDetailInfo</h2>
                <ProductDetailInfo></ProductDetailInfo>
            </Working>
            <Working>
                <h2>ProgressBar</h2>
                <ProgressBar></ProgressBar>
            </Working>
            <Working>
                <h2>Slider</h2>
                <Slider></Slider>
            </Working>
            <Working>
                <h2>Toggle</h2>
                <Toggle></Toggle>
            </Working>
        </>
    );
};

export default JJHoney;
