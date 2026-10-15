import { useState, useEffect } from 'react'
import {db, auth} from '../firebase'
import {collection, addDoc, getDocs, query, orderBy, serverTimestamp} from "firebase/firestore"
import { onAuthStateChanged, signOut } from 'firebase/auth'
import Header from './Header'
import IdeaForm from './IdeaForm';
import IdeaList from './IdeaList';
import Login from './Login';
import Register from './Register';
import "../css/App.css"


interface Idea {
  id: string;
  title: string;
  description: string;
  contacts: string;
  author: string;
  createdAt?: any;
}






function App() {
  const [user, setUser] = useState<string | null>(null);
  const [authMode, setAuthMode] = useState<"login" | "register" | null>(null)
  const [loading, setLoading] = useState(true)
  const [ideas, setIdeas] = useState<Idea[]>([]);

  useEffect (() => {
  const loadIdeas = async () => {
    try {
      const q = query(collection(db, "ideas"), orderBy("createdAt", "desc"))
      const snapshot = await getDocs(q)
      const loadedIdeas: Idea[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      } as Idea))
      setIdeas(loadedIdeas)
    } catch(err) {
      console.log("Ошибка!!", err)
    } finally {
      setLoading(false)
    }
  }

  loadIdeas()
}, [])

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      setUser(firebaseUser.displayName || firebaseUser.email?.split('@')[0] || "Пользователь") 
    } else {
      setUser(null)
    }
  })
  return () => unsubscribe()
}, [])

 

  const handleLoginClick = () => setAuthMode("login")
  const handleRegisterClick = () => setAuthMode("register")
  const handleCloseAuth = () => setAuthMode(null)

  const handleLogin = (email: string) => {
    console.log("Вход:", {email})
    setUser(email.split('@')[0])
    setAuthMode(null)
  }

  const handleRegister = (name: string) => {
    console.log("Регистрация:", {name})
    setUser(name)
    setAuthMode(null)
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      setUser(null)
    } catch(err) {
      console.error("Ошибка ", err)
    }
    
  }

  const handleAddIdea = async (newIdea: { title: string; description: string; contacts: string }) => {
    try {
      const ideaData = {
        title: newIdea.title,
        description: newIdea.description,
        contacts: newIdea.contacts,
        author: user || "Аноним",
        createdAt: serverTimestamp()
      }
    const docRef  = await addDoc(collection(db, "ideas"), ideaData) 
    
    const idea: Idea = {
      id: docRef.id,
      ...ideaData
    }
    setIdeas([idea, ...ideas])


    } catch(err) {
      console.error("Ошибка")
    }
  }
  
  
  return (
    <div className="app">
      <Header
        user={user}
        onLogin={handleLoginClick}
        onRegister={handleRegisterClick}
        onLogout={handleLogout}
      />

      <main className="main-content">

        {authMode === 'login' && (<Login
          onLogin={handleLogin}
          onClose={handleCloseAuth}
        />)}

      {authMode === "register" && (<Register
          onRegister={handleRegister}
          onClose={handleCloseAuth}
        />)}

      {!authMode && (
        <>
          <IdeaForm onAddIdea={handleAddIdea}/>
          {loading ? (<p>Загрузка идет...</p>) : <IdeaList ideas={ideas}/>} 
          
          
          
        </>
      )}


        
      </main>
    
    
    </div>
  )
}

export default App
