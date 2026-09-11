import { useState } from "react"
import Form from "../../components/Form"
import { registrar } from "../../services/api"
import { Link, useNavigate } from "react-router"

function Register() {

    const navigate = useNavigate()
    
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const [error, setError] = useState('')

    const [carregando, setCarregando] = useState(false)

    const [confirmarSenha, setConfirmarSenha] = useState('')

    const formularioValido = nome.trim() != "" && email.includes("@") && senha.length >= 8 && senha === confirmarSenha

    async function handleSubmit(e) {            
        e.preventDefault()

        if(!formularioValido) {
            return
        }

       try {
            setCarregando(true)

            const response = await registrar(nome, email, senha)

            if (response.ok) {
                navigate('/login')
            } else {
                const data = await response.json()
                setError(data.message)
            }
       } catch (error) {
            setError('Não foi possível conectar ao servidor.')
       } finally {
            setCarregando(false)
       }
        
        
    }

    
    
    return (
        <div className="w-full min-h-screen flex justify-center p-5">

            <div className="w-full flex flex-col gap-5 justify-center items-center">

                <div className="p-5">
                    <h1 className="text-3xl font-medium">Bem-vindo ao BlogCore</h1>
                </div>

                <Form mode={"register"} carregando={carregando} error={error} setError={setError} formularioValido={formularioValido} handleSubmit={handleSubmit} email={email} nome={nome} senha={senha} confirmarSenha={confirmarSenha} setSenha={setSenha} setNome={setNome} setEmail={setEmail} setConfirmarSenha={setConfirmarSenha}/>

                <span>Já possuí uma conta ? <Link className="text-blue-400 hover:underline" to={"/login"}>Login</Link> </span>
            </div>

        </div>
    )
}

export default Register