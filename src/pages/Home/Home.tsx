import { useEffect, useRef } from 'react';
import ContactCard from '../../components/ContactCard';
import ContactForm from '../../components/ContactForm';
import useUser from '../../hooks/useUser';
import { IContact } from '../../interfaces';
import { api, apiAuthorizationHeaders } from '../../services/api';
export default function Home() {
    const { removeToken, token, user, setUser, contacts, setContacts } = useUser();

    const dialog = useRef<HTMLDialogElement>(null)

    const handleLogout = () => {
        removeToken();
        setUser('');
        setContacts([]);
    }

    const handleOpenModal = () => {
        dialog.current.showModal();
    }
    const handleCloseModal = () => {
        dialog.current.close();
    }

    async function getContatcs() {
        const headers = apiAuthorizationHeaders(token);
        try {
            const { data } = await api.get('/contatos', headers);
            setContacts(data);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        getContatcs();
        return () => {

        }
    }, [])


    return (
        <>
            <header className='main-header'>
                <h1>Adjgenda</h1>
                <nav>
                    <h3>Olá, {user?.nome || 'anônimo'}</h3>
                    <h3 onClick={handleLogout}> Logout</h3>
                </nav>
            </header>
            <main className='Home'>
                <div>
                    <button className='add-contact-bt' onClick={handleOpenModal}>Adicionar contato</button>
                </div>
                <div className="contacts-display">
                    {contacts?.length > 0 && contacts.map((contact: IContact) => (
                        <ContactCard key={contact.id} contact={contact} />
                    ))}
                </div>
                <dialog ref={dialog} className='edit-dialog'>
                    <ContactForm data={null} closeModal={handleCloseModal} />
                </dialog>
            </main>
        </>
    )
}
