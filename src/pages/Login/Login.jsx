import { useState } from "react"
import Form from "../../components/Form"
import { Link, useNavigate } from "react-router"
import { login } from "../../services/api"

function Login() {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const [error, setError] = useState('')

    const [carregando, setCarregando] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setCarregando(true)

            const response = await login(email, senha)
    
            if(response.ok) {
                const dados = await response.json()
                localStorage.setItem('token', dados.token)
                navigate('/app')
                // setError('')
            }else {
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
        <div className="w-full min-h-screen anti flex justify-center p-5 font-[Space_Mono]">
            
            <div className="w-full flex flex-col gap-5 justify-center items-center">

                <div className="flex flex-col gap-2 p-5">
                    <h1 className="text-3xl font-medium">Bem-vindo de volta</h1>
                    <p className="text-center font-light">Compartilhe seus aprendizados !</p>
                </div>

                <Form mode={"login"} carregando={carregando} error={error} setError={setError} handleSubmit={handleSubmit} email={email} senha={senha} setSenha={setSenha} setEmail={setEmail}/>

                <span className="font-light text-gray-600">Ainda não é cadastrado? <Link className="text-blue-400 hover:underline" to={"/register"}>Cadastrar</Link> </span>
            </div>

        </div>
    )
}

export default Login