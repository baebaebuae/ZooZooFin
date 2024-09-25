import { BadgeNormal, BadgeStroke } from '@components/root/badge';
// import Bubble from '@components/root/bubble';
import { Button } from '@components/root/buttons';
import { Card } from '@components/root/card';
import CreditBox from '@components/root/creditBox';
import { HeaderButtons } from '@components/root/headerButton';
import { LargeIcon, NormalIcon } from '@components/root/icon';
import IconChick from '@assets/images/icons/icon_chick.svg?react';
import IconFrog from '@assets/images/icons/icon_frog.svg?react';
import IconChicken from '@assets/images/icons/icon_chicken.svg?react';

import { InfoBox } from '@components/root/infoBox';
import { Input } from '@components/root/input';
import { InputBox } from '@components/inputBox';
import { MessageBox } from '@components/root/messageBox';
import { ProductDetailInfo, ProductJoinInfo } from '@components/root/productDetailInfo';
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
                <BadgeNormal>Normal</BadgeNormal>
                <BadgeStroke>Stroke</BadgeStroke>
            </Working>
            <Working>
                <h2>Bubble</h2>
                <h4>말풍선은 Tutorial에서 사용방법 확인</h4>
            </Working>
            <Working>
                <h2>Buttons</h2>
                <Button size={'small'} $isBorder={false} color={'primaryDeep'}>
                    Small
                </Button>

                <Button size={'normal'} $isBorder={false} color={'primaryDeep'}>
                    Normal
                </Button>
                <Button size={'normal'} $isBorder={false} color={'inactive'}>
                    Inactive
                </Button>
                <Button size={'normal'} $isBorder={false} color={'warn'}>
                    Warn
                </Button>
                <Button size={'normal'} $isBorder={false} color={'tertiary'}>
                    Tertiary
                </Button>
                <Button size={'normal'} $isBorder={true} color={'primaryDeep'}>
                    N.Stroke
                </Button>
                <Button size={'normal'} $isBorder={true} color={'inactive'}>
                    N.Stroke
                </Button>

                <Button size={'large'} $isBorder={false} color={'primaryDeep'}>
                    Large
                </Button>
                <Button size={'large'} $isBorder={true} color={'primaryDeep'}>
                    L.Stroke
                </Button>
            </Working>
            <Working>
                <h2>CreditBar</h2>
                <CreditBox grade={9} />
            </Working>
            <Working>
                <h2>Card</h2>
                <Card />
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
                <InfoBox color={'primary'}>
                    <div>동적버튼</div>
                </InfoBox>
                <InfoBox color={'primaryDeep'}>
                    <div>Title</div>
                    <div>0,000,000원</div>
                </InfoBox>
                <InfoBox color={'warn'}>
                    <div>대출 불가</div>
                </InfoBox>
            </Working>
            <Working>
                <h3>Input</h3>
                <Input value={'금액을 입력해줘.'}></Input>
                <h3>InputBox</h3>
                <InputBox
                    title={'대출할 금액'}
                    amount1={500000}
                    amount2={1000000}
                    amount3={5000000}
                    amount4={10000000}
                    maxAmount={300000000}
                    onSavingsAmountChange={() => {}}
                    isSavings={true}
                ></InputBox>
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
                    $isLoan={false}
                    isEarlyTermination={false}
                ></ProductDetailInfo>
                <ProductDetailInfo
                    infoTitle1={'기간'}
                    infoContent1={'10턴'}
                    infoTitle2={'이율'}
                    infoContent2={'10%'}
                    $isLoan={false}
                    isEarlyTermination={false}
                ></ProductDetailInfo>
                <ProductDetailInfo
                    infoTitle1={'만기 예상 회차'}
                    infoContent1={'26턴'}
                    infoTitle2={'예상 금액'}
                    infoContent2={'3,000,000원'}
                    $isLoan={true}
                    isEarlyTermination={false}
                ></ProductDetailInfo>
                <ProductDetailInfo
                    infoTitle1={'이자율'}
                    infoContent1={'복리 10%'}
                    infoTitle2={'상환 방식'}
                    infoContent2={'만기 일시 상환'}
                    $isLoan={true}
                    isEarlyTermination={false}
                ></ProductDetailInfo>
                <h3>ProductJoinInfo</h3>
                <ProductJoinInfo infoTitle={'가입 금액'} infoContent={'3,000,000원'} />
                <ProductJoinInfo infoTitle={'만기 회차'} infoContent={'15턴'} />
                <ProductJoinInfo infoTitle={'예상 지급액'} infoContent={'15,000,000원'} />
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
