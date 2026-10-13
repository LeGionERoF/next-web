import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";

interface RegisterProps {
    onRegister: (name: string) => void
    onClose: () => void
}

function Register({onRegister, onClose}: RegisterProps) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

    if (!name || !email || !password) {
        setError("Заполните все поля")
        return
    }

    if (password.length < 6) {
        setError("Пароль должен быть не менее 6 символов")
        return
    }

    setLoading(true)

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(userCredential.user, {displayName: name})
        onRegister(name)
    } catch (err: any) {
            // Обрабатываем ошибки Firebase
            if (err.code === "auth/email-already-in-use") {
                setError("Этот email уже зарегистрирован");
            } else if (err.code === "auth/invalid-email") {
                setError("Некорректный email");
            } else if (err.code === "auth/weak-password") {
                setError("Слишком слабый пароль");
            } else {
                setError("Ошибка регистрации: " + err.message);
                console.error(err.code)
                console.error(err.message)
            }
        } finally {
            setLoading(false);
        }



    
}
    return (
    <div>
        <button onClick={onClose}>❌</button>
        <h2>Регистрация</h2>

        {error && <p style={{color: "red"}}></p>}

        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                placeholder="Имя"
                value={name}
                onChange={(e) =>  setName(e.target.value)}
                required
            />
            <input 
                type="email"
                placeholder="Почта"
                value={email}
                onChange={(e) =>  setEmail(e.target.value)}
                required
            />
            <input 
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) =>  setPassword(e.target.value)}
                required
            />
            <button type="submit" disabled={loading}>
                {loading ? "Регистрация..." : "Зарегистрироваться"}
            </button>
        </form>
    </div>

    )
}

export default Register


