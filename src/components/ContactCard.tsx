import useUser from "../hooks/useUser";
import { IContact } from "../interfaces";
import { api, apiAuthorizationHeaders } from "../services/api";
import { useState, useRef } from 'react';
import ContactForm from "./ContactForm";
export default function ContactCard({ contact }: { contact: IContact }) {
    const { id, nome, email, telefone } = contact;
    const [errorMessage, setErrorMessage] = useState<string>()

    const { token, contacts, setContacts } = useUser();


    const editDialog = useRef<HTMLeditDialogElement>(null);
    const deleteDialog = useRef<HTMLeditDialogElement>(null);

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

    const handleOpenEditModal = () => {
        editDialog.current.showModal();
    }
    const handleCloseEditModal = () => {
        editDialog.current.close();
    }

    const handleOpenDeleteModal = () => {
        deleteDialog.current.showModal();
    }
    const handleCloseDeleteModal = () => {
        deleteDialog.current.close();
    }

    return (
        <div className="ContactCard">
            <p className="name">{nome}</p>
            <p className="email">{email}</p>
            <p className="telephone">{telefone}</p>
            <div className="bt-div">
                <button className="edit-bt"
                    onClick={handleOpenEditModal}>
                    Editar</button>
                <button className="close-bt"
                    onClick={handleOpenDeleteModal}>
                    Apagar</button>
            </div>
            {errorMessage && <p>{errorMessage}</p>}
            <dialog ref={editDialog} className="edit-dialog">
                <ContactForm data={contact} closeModal={handleCloseEditModal} />
            </dialog>
            <dialog ref={deleteDialog} className="delete-dialog">
                <p>Remover {nome}?</p>
                <div className="bt-div">
                    <button className="close-bt"
                        onClick={handleCloseDeleteModal}>
                        Cancelar</button>
                    <button className="confirm-bt"
                        onClick={() => handleDeleteContact(id)}>
                        Confirmar</button>
                </div>
            </dialog>
        </div>
    )
}
