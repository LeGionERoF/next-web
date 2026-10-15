import "../css/IdeaCard.css"

interface Idea {
  id: string;
  title: string;
  description: string;
  contacts: string;
  author: string;
}

interface IdeaCardProps {
    idea: Idea
}

function IdeaCard({idea}: IdeaCardProps) {
    return (
        <div className="idea-card">
            <h3 className="idea-title">{idea.title}</h3>
            <p className="idea-description">{idea.description}</p>
            <div className="idea-footer">
                <span className="idea-author">Автор: {idea.author}</span>
                <span className="idea-contacts">{idea.contacts}</span>
            </div>
        </div>
    )
}

export default IdeaCard