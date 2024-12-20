import CharFrog from '@assets/images/characters/frog.png';
import IconOverseas from '@assets/images/icons/stocks/icon_overseas.png';
import IconETF from '@assets/images/icons/stocks/icon_ETF.png';
import IconLock from '@assets/images/icons/stocks/icon_lock.png';
import IconCarrot from '@assets/images/icons/icon_carrot.png';

import {
    DefaultFieldBox,
    ActiveFieldBox,
} from '@components/stock/common/container/FieldIconContainer';

// 주식 분야 모두 import
import {
    IconManufacturing,
    IconShip,
    IconIT,
    IconEntertainment,
    IconBio,
    IconFood,
    IconChemistry,
    IconBank,
    IconChina,
    IconConstruction,
    IconEnergy,
    IconHouse,
    IconOil,
    IconMicro,
} from '@components/stock/common/icon/StockFieldIcons';

const IconWrapper = ({ icon: Icon, width, height }) => {
    return <img src={Icon} width={width} height={height} />;
};
export const LockedIcon = () => {
    return <IconWrapper icon={IconLock} width={32} height={32} />;
};
export const MessageIcon = () => {
    return <IconWrapper icon={CharFrog} width={35} height={25} />;
};

export const DomesticIcon = () => {
    return <IconWrapper icon={CharFrog} width={50} height={35} />;
};
export const OverseasIcon = () => {
    return <IconWrapper icon={IconOverseas} width={50} height={50} />;
};
export const ETFIcon = () => {
    return <IconWrapper icon={IconETF} width={50} height={50} />;
};

// 모든 아이콘 svg를 객체에 저장
const Icons = {
    Manufacturing: IconManufacturing,
    Ship: IconShip,
    IT: IconIT,
    Entertainment: IconEntertainment,
    Bio: IconBio,
    Food: IconFood,
    Chemistry: IconChemistry,
    Bank: IconBank,
    China: IconChina,
    Construction: IconConstruction,
    Energy: IconEnergy,
    House: IconHouse,
    Micro: IconMicro,
    Oil: IconOil,
};

export const FieldIcon = ({ field }) => {
    const IconComponent = Icons[field];
    return <IconWrapper icon={IconComponent} width={25} height={25} />;
};

export const DefaultFieldIcon = ({ field }) => {
    return (
        <DefaultFieldBox>
            <FieldIcon field={field} />
        </DefaultFieldBox>
    );
};

export const ActiveFieldIcon = ({ field }) => {
    return (
        <ActiveFieldBox>
            <FieldIcon field={field} />
        </ActiveFieldBox>
    );
};

export const CarrotIcon = () => {
    return <IconWrapper icon={IconCarrot} width={25} height={25} />;
};
