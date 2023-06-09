import useUser from '../../hooks/useUser';

export default function Home() {
    const { user, removeToken } = useUser();

    const handleLogout = () => {
        removeToken()
    }


    return (
        <>
            <header>
                <div>Logo</div>
                <nav>
                    <p>Olá, {user.nome}</p>
                    <p onClick={handleLogout}> Logout</p>
                </nav>
            </header>
            <main>
                <div className="contacts">

                </div>
            </main>
        </>
    )
}
