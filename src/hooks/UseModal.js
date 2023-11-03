import {useState} from "react";

export const useModal = () => {
    const [showModal, setShowModal] = useState(false)
    const onOpenCloseModal = () => {
        console.log('onOpenCloseModal')
        setShowModal(!showModal)
    }

    return {
        showModal,
        onOpenCloseModal
    }
}