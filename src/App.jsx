import { useEffect, useState } from "react"
import PostsSection from "./components/PostsSection"
import AddPost from "./components/AddPost"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose, faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { carregarPosts, criarPost, editarPost, validarToken } from "./services/api"
import { useNavigate } from "react-router"
import { Header } from "./components/Header"
import { jwtDecode } from "jwt-decode"

function App() {

  const [posts, setPosts] = useState([])
  const [modal, setModal] = useState(false)

  const navigate = useNavigate()

  const [currentPost, setCurrentPost] = useState()

  const [tituloPost, setTituloPost] = useState("")
  const [descricaoPost, setDescricaoPost] = useState("")

  const [modo, setModo] = useState("adicionar")

  const [tentouEnviar, setTentouEnviar] = useState(false)

  const [userLogged, setUserLogged] = useState()
  const [userLoggedId, setUserLoggedId] = useState()


  const carregarPostagens = async () => {
    const postagens = await carregarPosts()
    setPosts(postagens)
  }

  useEffect(() => {
    carregarPostagens()
  }, [])


  function cleanStates() {
    setCurrentPost()
    setTituloPost("")
    setDescricaoPost("")
  }

  const verificarAutenticacao = async () => {
        const token = localStorage.getItem('token')
        
        if(token) {
          const usuarioLogado = jwtDecode(token)
          const response = await validarToken(token)

            if (response.ok) {
                navigate('/app')
                setUserLogged(usuarioLogado.nome)
                setUserLoggedId(usuarioLogado.id)
              } else {
                localStorage.removeItem('token')
                navigate('/login')
            }
        } else {
          navigate('/login')
        }
  }
    
  useEffect(() => {
      verificarAutenticacao()
  }, [])

  return (
    <div className="w-full min-h-screen flex flex-col relative">

      <Header userLogged={userLogged}/>

      {
        modal &&
          <div className="fixed inset-0 z-90 flex justify-center items-center bg-black/50">
            <div className="w-full z-100 flex flex-col gap-5 relative max-w-4xl p-7 bg-white rounded-md shadow-md overflow-hidden">

              <button onClick={() => {
                  setModal(false)
                  cleanStates()
                }} className="absolute bg-red-500 right-5 w-9 h-9 rounded-full shadow-md hover:cursor-pointer">
                <FontAwesomeIcon icon={faClose} color="white"/>
              </button>
              
              <h1 className="text-2xl">{modo === "adicionar" ? "Adicione seu post !" : "Edite sua postagem !"}</h1>

              <div className="flex flex-col gap-3">

                <p>Titulo:</p>
                <input onChange={(e) => setTituloPost(e.target.value)} value={tituloPost} className={`${tentouEnviar && tituloPost.trim() === "" ? "ring-2 ring-red-500" : "ring-0"} w-full border p-2 outline-0`} placeholder="Digite o título do post" type="text" />
                
                <p>Descricao:</p>
                <input onChange={(e) => setDescricaoPost(e.target.value)} value={descricaoPost} className={`${tentouEnviar && descricaoPost.trim() === "" ? "ring-2 ring-red-500" : "ring-0"} w-full border p-2 outline-0`} placeholder="Digite a descrição do post" type="text" />

              </div>

              <div className="flex justify-center">
                <button onClick={async () => {
                  const token = localStorage.getItem('token')

                  if (modo === "adicionar") {

                    if (tituloPost === "" || descricaoPost === "") {
                      setTentouEnviar(true)
                      return
                    } else {
                      setTentouEnviar(false)
                    }
                    await criarPost(tituloPost, descricaoPost, token)
                    setModal(false)
                    cleanStates()
                    await carregarPostagens()

                  } else {
                    if (tituloPost === "" || descricaoPost === "") {
                      setTentouEnviar(true)
                      return
                    } else {
                      setTentouEnviar(false)
                    }
                    await editarPost(currentPost.id, tituloPost, descricaoPost, token)
                    setModal(false)
                    await carregarPostagens()
                  }
                }} className="px-5 py-2.5 text-white rounded-full bg-blue-500 flex gap-2 items-center shadow-md transition-all hover:cursor-pointer hover:scale-95">
                    <p className="font-medium">{modo === "adicionar" ? "Enviar post" : "Enviar alterações"}</p>
                    <FontAwesomeIcon icon={faPaperPlane}/>
                </button>
              </div>

            </div>
          </div>
      }

      <PostsSection userLogged={userLogged} userLoggedId={userLoggedId} posts={posts} setTituloPost={setTituloPost} setDescricaoPost={setDescricaoPost} setModal={setModal} setModo={setModo} setCurrentPost={setCurrentPost} carregarPostagens={carregarPostagens}/>

      <AddPost onClick={() => {
          setModal(true)
          setModo("adicionar")
        }}/>

    </div>
  )
}

export default App;