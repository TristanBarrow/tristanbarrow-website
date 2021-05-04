import React, { ReactChild, ReactChildren, useState } from 'react';
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
const Message = styled.div``;
const Children = styled.div``;

export type BaseModalProps = {
    isShowing: boolean
    message: string
    children?: ReactChild | ReactChildren | undefined
    close: () => void
}

const BaseModal = ({
    isShowing,
    message,
    children,
    close,
}: BaseModalProps) => {
    if (!isShowing) return null;
    return (
        <BlackoutFrame>
            <Container>
                <Header>
                    <Icon icon={IconType.TIMES} color={'white'} onClick={close}/>
                </Header>
                <Body>
                    <Message>{message}</Message>
                    <Children>
                        {(children !== undefined && children !== null) && children}
                    </Children>
                </Body>
            </Container>
        </BlackoutFrame>
    );
}

type UseWithBaseModalArgs = {
    message: string
};

export const useWithBaseModal = (args: UseWithBaseModalArgs): UseWithBaseModalBinding => {
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

type UseWithBaseModalBinding = {
    open: () => void
    close: () => void
    bind: BaseModalProps
} 

export default BaseModal;