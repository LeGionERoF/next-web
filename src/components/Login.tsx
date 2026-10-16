import { signInWithEmailAndPassword} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import "../css/Header.css"
import "../css/IdeaForm.css"


interface LoginProps {
    onLogin: (name: string) => void
    onClose: () => void
}

function Login({onLogin, onClose}: LoginProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('')

        if (!email || !password) {
            alert("Заполните все поля")
            return
        }

        setLoading(true)

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
        



            const userName = userCredential.user.displayName || email.split('@')[0]
            
            onLogin(userName)

        } catch(err: any) {
            if (err.code === "auth/user-not-found") {
                setError("Пользователь не найден");
            } else if (err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
                setError("Неверный email или пароль");
            } else if (err.code === "auth/invalid-email") {
                setError("Некорректный email");
            } else {
                setError("Ошибка входа: " + (err.code || err.message));
            }
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="idea-form">
            
            <h2>Вход</h2>

            {error && <p>{error}</p>}

            <form className="form-login" onSubmit={handleSubmit}>
                <input 
                    className="form-input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                />
                <input 
                    className="form-input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                />
                <button className="btn btn-login" type="submit" disabled={loading}>{loading ? "Вход..." : "Войти"}</button>
                <button className="btn btn-login btn-close" onClick={onClose}>❌</button>
            </form>





        </div>
    )
}

export default Login