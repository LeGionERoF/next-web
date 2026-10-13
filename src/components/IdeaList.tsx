import IdeaCard from "./IdeaCard";
import "../css/IdeaList.css"

interface Idea {
    id: string;
    title: string;
    description: string;
    contacts: string;
    author: string;
}

interface IdeaListProps {
    ideas: Idea[];
}

function IdeaList({ideas}: IdeaListProps) {
    if (ideas.length === 0) {
        return (
            <div className="empty-state">
                <p>Идей нету</p>
                <p className="empty-sub">Будьте первым кто опубликует проект!</p>
            </div>
        )
    }

    return (
        <div className="idea-list">
            <h2 className="list-title">Список идей 💡</h2>
            {ideas.map(idea => (
                <IdeaCard key={idea.id} idea={idea}/>
            ))}
        </div>
    )
}

export default IdeaList;