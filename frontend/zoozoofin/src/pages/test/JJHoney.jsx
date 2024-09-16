import { BadgeNormal, BadgeStroke } from '@components/root/badge';
import BubbleBubble from '@components/root/bubble';
import {
    // Button,
    TinyButton,
    TinyButtonBorderBlank,
    SmallButton,
    SmallButtonBorder,
    NormalButton,
    NormalButtonBorder,
} from '@components/root/buttons';
import CreditBox from '@components/root/creditBox';
import { HeaderButtons } from '@components/root/headerButton';
import { LargeIcon, NormalIcon } from '@components/root/Icon';
import IconChick from '@assets/images/icons/icon_chick.svg?react';
import IconFrog from '@assets/images/icons/icon_frog.svg?react';
import IconChicken from '@assets/images/icons/icon_chicken.svg?react';

import { InfoBoxPrimary, InfoBoxWarn } from '@components/root/infoBox';
import { Input } from '@components/root/input';
import { InputBox } from '@components/inputBox';
import { MessageBox } from '@components/root/messageBox';
import { ProductDetailInfo } from '@components/root/productDetailInfo';
import ProgressBox from '@components/root/progessBar';
import { TurnSliderLoan } from '@components/root/slider';
import { Switch } from '@components/root/switch';

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
                <BadgeNormal>BadgeNormal</BadgeNormal>
                <BadgeStroke>BadgeStroke</BadgeStroke>
            </Working>
            <Working>
                <h2>Bubble</h2>
                <BubbleBubble />
            </Working>
            <Working>
                <h2>Buttons</h2>
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
                <CreditBox grade={9} />
            </Working>
            <Working>
                <h2>HeaderButtons</h2>
                <HeaderButtons currentTurn={32}></HeaderButtons>
            </Working>
            <Working>
                <h2>Icons</h2>
                <div>
                    <NormalIcon icon={IconChick} />
                    <LargeIcon icon={IconChick} />
                    <NormalIcon icon={IconChicken} />
                    <LargeIcon icon={IconChicken} />
                    <NormalIcon icon={IconFrog} />
                    <LargeIcon icon={IconFrog} />
                </div>
            </Working>
            <Working>
                <h2>InfoBox</h2>
                <InfoBoxPrimary>
                    <div>Title</div>
                    <div>0,000,000원</div>
                </InfoBoxPrimary>
                <InfoBoxWarn>
                    <div>대출 불가</div>
                </InfoBoxWarn>
            </Working>
            <Working>
                <h3>Input</h3>
                <Input value={'금액을 입력해줘.'}></Input>
                <h3>InputBox</h3>
                <InputBox title={'대출할 금액'} maxAmount={30000000}></InputBox>
            </Working>
            <Working>
                <h2>MessageBox</h2>
                <MessageBox>
                    <NormalIcon icon={IconFrog} />
                    <div>화면별 안내 멘트</div>
                </MessageBox>
                <MessageBox>
                    <NormalIcon icon={IconChick} />
                    <div>화면별 안내 멘트</div>
                </MessageBox>
            </Working>
            <Working>
                <h2>Modal</h2>
                <Modal></Modal>
            </Working>
            <Working>
                <h2>ProductDetailInfo</h2>
                <ProductDetailInfo
                    infoTitle1={'기간'}
                    infoContent1={'5턴'}
                    infoTitle2={'이율'}
                    infoContent2={'3%'}
                    isLoan={false}
                ></ProductDetailInfo>
                <ProductDetailInfo
                    infoTitle1={'기간'}
                    infoContent1={'10턴'}
                    infoTitle2={'이율'}
                    infoContent2={'10%'}
                ></ProductDetailInfo>
                <ProductDetailInfo
                    infoTitle1={'만기 예상 회차'}
                    infoContent1={'26턴'}
                    infoTitle2={'예상 금액'}
                    infoContent2={'3,000,000원'}
                    isLoan={true}
                ></ProductDetailInfo>
                <ProductDetailInfo
                    infoTitle1={'이자율'}
                    infoContent1={'복리 10%'}
                    infoTitle2={'상환 방식'}
                    infoContent2={'만기 일시 상환'}
                    isLoan={true}
                ></ProductDetailInfo>
            </Working>
            <Working>
                <h2>ProgressBar</h2>
                <ProgressBox rate={77} restTurn={8}></ProgressBox>
            </Working>
            <Working>
                <h2>Slider</h2>
                <TurnSliderLoan title={'대출 기간'} min={1} max={30}></TurnSliderLoan>
            </Working>
            <Working>
                <h2>Switch</h2>
                <Switch></Switch>
            </Working>
        </>
    );
};

export default JJHoney;
