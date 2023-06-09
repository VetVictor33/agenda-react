import useUser from "../hooks/useUser";
import { IContact } from "../interfaces";
import { api, apiAuthorizationHeaders } from "../services/api";
import { useState, useRef } from 'react';
import ContactForm from "./ContactForm";
export default function ContactCard({ contact }: { contact: IContact }) {
    const { id, nome, email, telefone } = contact;
    const [errorMessage, setErrorMessage] = useState<string>()
    const { token, contacts, setContacts } = useUser();
    const dialog = useRef<HTMLDialogElement>(null)

    const handleDeleteContact = async (id) => {
        const headers = apiAuthorizationHeaders(token);

        try {
            const request = await api.delete(`/contatos/${id}`, headers);

            const filteredContacts = contacts.filter((c) => c.id != id);
            setContacts(filteredContacts);
        } catch (error) {
            setErrorMessage(error.response.data);
        }
    }

    const handleOpenModal = () => {
        dialog.current.showModal();
    }
    const handleCloseModal = () => {
        dialog.current.close();
    }

    return (
        <div>
            <p>{nome}</p>
            <p>{email}</p>
            <p>{telefone}</p>
            {/* <p onClick={() => handleDeleteContact(id)}>Apagar esse contato</p> */}
            <p onClick={handleOpenModal}>Editar contato</p>
            {errorMessage && <p>{errorMessage}</p>}
            <dialog ref={dialog}>
                <ContactForm data={contact} closeModal={handleCloseModal} />
            </dialog>
        </div>
    )
}
