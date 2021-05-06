import React from 'react';
import BaseModal, { useWithBaseModal, BaseModalProps } from './BaseModal';

export type ModalButton = {
    text: string
    action: () => void
}

type ButtonModalProps = {
    base: BaseModalProps
    buttons: ModalButton[]
}

const ButtonModal = ({
    base,
    buttons,
}: ButtonModalProps) => {

    return (
        <BaseModal {...base}>
            <div>
                {buttons.map(({ text, action }) => {
                    return <button onClick={action}>{text}</button>
                })}
            </div>
        </BaseModal>
    ); 
    
}

type UseWithButtonModalArgs = {
    message: string
    buttons: ModalButton[]
};

export const useWithButtonModal = ({
    message,
    buttons
}: UseWithButtonModalArgs): UseWithButtonModalBinding => {
    const baseModal = useWithBaseModal({
        message
    });

    return {
        ...baseModal,
        bind: {
            ...baseModal.bind,
            base: baseModal.bind,
            buttons
        }
    };

}

type UseWithButtonModalBinding = {
    open: () => void
    close: () => void
    bind: ButtonModalProps
} 

export default ButtonModal;