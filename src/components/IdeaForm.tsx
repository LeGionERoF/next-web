import { useState } from "react";
import "../css/IdeaForm.css"

interface ideaFormsProps {
    onAddIdea: (idea: {title: string; description: string; contacts: string;}) => void;
}

function IdeaForm ({onAddIdea}: ideaFormsProps) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [contacts, setContacts] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !description || !contacts) {
            alert("Заполните все поля!")
            return
        }
        onAddIdea({title, description, contacts});

        setTitle("")
        setDescription("")
        setContacts("")
    }
    return (
        <form className="idea-form" onSubmit={handleSubmit}>
            <h2>Опубликовать идею 💡</h2>
            <input 
                type="text"
                className="form-input"
                placeholder="Название проекта"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required    
            />
        <textarea
            className="form-input"
            placeholder="Описание проекта"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
        />
        <input
            type="text"
            className="form-input"
            placeholder="Конаткты"
            value={contacts}
            onChange={(e) => setContacts(e.target.value)}
            required
        />
        <button className="btn-submit">
            Опубликовать
        </button>



        </form>
    )

}
export default IdeaForm