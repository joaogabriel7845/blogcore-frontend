import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { buscarMeuPerfil, editarBio, editarFoto } from "../../services/api"
import MyPosts from "../../components/MyPosts"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faCheck, faPen, faUser } from "@fortawesome/free-solid-svg-icons"
import { ThemeContext } from "../../context/ThemeContext"

function MyAccount() {

    const {id} = useParams()

    const [myPosts, setMyPosts] = useState([])
    const [usuarioLogado, setUsuarioLogado] = useState([])
    const [bio, setBio] = useState('')
    const [fotoUrl, setFotoUrl] = useState('') 

    const [editando, setEditando] = useState(false)

    const { theme } = useContext(ThemeContext)

    const navigate = useNavigate()

    const carregarInformacoes = async () => {
        const token = localStorage.getItem('token')

        const response = await buscarMeuPerfil(id, token)

        if(!response.ok) {
            const data = await response.json()
            navigate('/erro', { state: {message: data.message } })
            return
        }
        
        const data = await response.json()
        
        setUsuarioLogado(data.usuario)
        setMyPosts(data.myPosts)
        setBio(data.usuario.bio)
        setFotoUrl(data.usuario.foto_url)

    }

    useEffect(() => {
        carregarInformacoes()
    }, [])
    
    return (
        <div className={`w-full h-screen flex flex-col gap-10 p-5 md:p-20 ${theme.bg} ${theme.text}`}>

            <button onClick={() => navigate('/app')} className={`transition-all w-fit p-2 flex justify-center items-center gap-2 border border-transparent ${theme.borderHover} hover:cursor-pointer`}>
                <FontAwesomeIcon icon={faAngleLeft}/>
                <p className="text-sm font-[monospace]">Voltar</p>
            </button>

            <div className="flex items-center gap-4">

                <div className="relative flex justify-center">

                    <div className="w-20 h-20 flex justify-center items-center rounded-full border overflow-hidden">
                        {
                            fotoUrl === "" ? 
                                <FontAwesomeIcon icon={faUser} fontSize={32}/>
                            :
                                <img src={fotoUrl} className="w-full h-full object-cover" alt="" />
                        }
                    </div>
                    
                    <input type="file" onChange={async (e) => {
                        const file = e.target.files[0]
                        const token = localStorage.getItem('token')
                        const response = await editarFoto(usuarioLogado.id, file, token)
                        if(!response.ok) {
                            return
                        }

                        const data = await response.json()
                        setFotoUrl(data.foto_url)
                    }} accept="image/png, image/jpeg" id="foto-input" className="hidden" />
                    <label htmlFor="foto-input" className="transition-all mt-1 absolute top-full font-[monospace] opacity-70 hover:opacity-100 hover:underline hover:cursor-pointer">Editar</label>
                </div>
                
                <div className="flex flex-col gap-2 font-[monospace]">
                    <h1 className="text-2xl font-semibold ">{usuarioLogado.nome}</h1>

                    <div className="flex gap-4">
                        <p>posts {myPosts.length}</p>
                        <p>seguidores 0</p>
                        <p>seguindo 0</p>
                    </div>

                    <div>
                        {editando ? 
                            <div className="flex gap-2">
                                <input onChange={(e) => setBio(e.target.value)} value={bio} type="text" className="outline-0 border-b" />
                                <button onClick={async () => {
                                        const token = localStorage.getItem('token')
                                        await editarBio(usuarioLogado.id, bio, token)
                                        setEditando(false)
                                        await carregarInformacoes()
                                    }} className={`hover:cursor-pointer border border-transparent ${theme.borderHover} px-1.5 py-1 `}><FontAwesomeIcon icon={faCheck}/></button>
                            </div>
                            :
                            <div className="flex gap-2">
                                <p>{usuarioLogado.bio === '' ? 'Nenhuma bio' : usuarioLogado.bio}</p>
                                <button onClick={() => setEditando(true)} className="hover:cursor-pointer"><FontAwesomeIcon icon={faPen}/></button>
                            </div>
                        }
                        
                    </div>

                    

                </div>

            </div>

            <MyPosts posts={myPosts}/>
        </div>
    )
}

export default  MyAccount