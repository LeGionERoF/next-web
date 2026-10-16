import "../css/Header.css"

interface HeaderProps {
    user: string | null,
    onLogin: () => void,
    onRegister: () => void,
    onLogout: () => void
}

function Header({user, onLogin, onRegister, onLogout}: HeaderProps) {
    
    return (
        <header className="header">
        <h1 className="logo">Биржа проектов</h1>
        <div className="header-actions">
            {user ? (
                <>
                    <span className="user-name">{user}</span>
                    <button className="btn btn-logout" onClick={onLogout}>
                        Выйти
                    </button>
                </>

            ) : (
                <>
                    <button className="btn btn-login-main" onClick={() => onLogin()}>Войти</button>
                    <button className="btn btn-register" onClick={() => onRegister()}>Регистрация</button>
                </>


            )
            
            }
        </div>

        
        
        
        
        </header>
    )



}

export default Header;