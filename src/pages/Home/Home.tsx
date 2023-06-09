import { useDebounce } from 'react-use';
import useUser from '../../hooks/useUser';
import { IContact, IContactArray } from '../../interfaces';
import { api, apiAuthorizationHeaders } from '../../services/api';
import { useEffect, useState } from 'react'
import ContactForm from '../../components/ContactForm';
import ContactCard from '../../components/ContactCard';
export default function Home() {
    const { removeToken, token, user, contacts, setContacts } = useUser();

    const handleLogout = () => {
        removeToken();
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
            <header>
                <div>Logo</div>
                <nav>
                    <p>Olá, {user?.nome || 'anônimo'}</p>
                    <p onClick={handleLogout}> Logout</p>
                </nav>
            </header>
            <main>
                <div className="contacts">
                    {contacts?.length > 0 && contacts.map((contact: IContact) => (
                        <ContactCard key={contact.id} contact={contact} />
                    ))}
                </div>
                <div>
                    <ContactForm data={null} />
                </div>
            </main>
        </>
    )
}
