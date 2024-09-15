// 아이콘
// 주식 분야, NPC, 캐릭터, 상품 아이콘으로 세분화

// 최상위 wrapper로 IconWrapper 생성

const IconWrapper = ({ icon: Icon, width, height }) => {
    return <Icon width={width} height={height} />;
};

// 아이콘 크기에 따라 LargeIcon, NormalIcon으로 세분화

export const LargeIcon = ({ icon }) => {
    return <IconWrapper icon={icon} width={30} height={30} />;
};

export const NormalIcon = ({ icon }) => {
    return <IconWrapper icon={icon} width={20} height={20} />;
};

// 아이콘이 필요한 위치에서

// 파일을 import하고
// import IconChick from '@assets/images/icons/icon_chick.svg?react';

// <NormalIcon icon={IconChick} />
// - 의 형태로 사용
