import React, { useState } from 'react';
import BlackoutFrame from '../frames/BlackoutFrame';
import styled from 'styled-components';
import Icon, { IconType } from '../atomic/Icon';

const Container = styled.div`
    background-color: white;
`;

const Header = styled.div`
    background-color: black;
`;

const Body = styled.div``;
const Buttons = styled.div``;
const Message = styled.div``;

type DuelModalProps = {
    isShowing: boolean
    message: string
    leftButtonText: string
    rightButtonText: string
    leftButtonAction: () => void
    rightButtonAction: () => void
    close: () => void
}

const DuelModal = ({
    isShowing,
    message,
    leftButtonText,
    rightButtonText,
    leftButtonAction,
    rightButtonAction,
    close,
}: DuelModalProps) => {
    if (!isShowing) return null;
    return (
        <BlackoutFrame>
            <Container>
                <Header>
                    <Icon icon={IconType.TIMES} color={'white'} onClick={close}/>
                </Header>
                <Body>
                    <Message>{message}</Message>
                    <Buttons>
                        <button onClick={leftButtonAction}>{leftButtonText}</button>
                        <button onClick={rightButtonAction}>{rightButtonText}</button>
                    </Buttons>
                </Body>
            </Container>
        </BlackoutFrame>
    );
}

type UseWithDuelModalArgs = {
    message: string
    leftButtonText: string
    rightButtonText: string
    leftButtonAction: () => void
    rightButtonAction: () => void
};

export const useWithDuelModal = (args: UseWithDuelModalArgs): UseWithDuelModalBinding => {
    const [isShowing, setIsShowing] = useState<boolean>(false);
    const open = () => setIsShowing(true);
    const close = () => setIsShowing(false);

    return {
        open,
        close,
        bind: {
            ...args,
            isShowing,
            close,
        }
    };

}

type UseWithDuelModalBinding = {
    open: () => void
    close: () => void
    bind: DuelModalProps
} 

export default DuelModal;