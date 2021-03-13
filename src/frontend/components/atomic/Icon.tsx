import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faCog,
    faPalette,
    faUser,
} from '@fortawesome/free-solid-svg-icons';

const StyledIcon = styled(FontAwesomeIcon)`
    font-size: ${(props: { $iconSize: string }) => props.$iconSize};
`;

export enum IconType {
    GEAR = 'GEAR',
    THEME = 'THEME',
    PROFILE = 'PROFILE',
}

const ICONS = {
    [IconType.GEAR]: faCog,
    [IconType.THEME]: faPalette,
    [IconType.PROFILE]: faUser
}

type OnClick = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;

type IconProps = {
    icon: IconType
    size?: string
    color?: string
    onClick?: OnClick
}

const Icon = ({
    icon,
    size = '1.6rem',
    color = 'black',
    onClick = () => {}
}: IconProps) => {
    return (
        <StyledIcon 
            icon={ICONS[icon]} 
            onClick={onClick}
            color={color}
            $iconSize={size} 
        />
    );
}

export default Icon;