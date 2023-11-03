import {useState} from "react";

export const useModal = () => {
    const [showModal, setShowModal] = useState(false)
    const onOpenCloseModal = () => {
        setShowModal(!showModal)
    }

    return {
        showModal,
        onOpenCloseModal
    }
}