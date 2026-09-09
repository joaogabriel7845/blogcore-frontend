import { useState } from "react"
import Form from "../../components/Form"
import { Link, useNavigate } from "react-router"
import { login } from "../../services/api"

function Login() {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const [error, setError] = useState('')

    const formularioValido = email.includes("@") && senha.length >= 8

    async function handleSubmit(e) {
        e.preventDefault()

        if(!formularioValido) {
            return
        }

        try {
            const response = await login(email, senha)

            console.log(response.status)
    
            if(response.ok) {
                const dados = await response.json()
                localStorage.setItem('token', dados.token)
                navigate('/app')
                setError('')
            }else {
                const data = await response.json()
                setError(data.message)
            }
        } catch (error) {
            console.log(error)
            setError('Não foi possível conectar ao servidor.')
        }
        
        
    }


    return (
        <div className="w-full min-h-screen anti flex justify-center p-5">
            
            <div className="w-full flex flex-col gap-5 justify-center items-center">

                <div className="p-5">
                    <h1 className="text-3xl font-medium">Bem-vindo ao BlogCore</h1>
                </div>

                <Form mode={"login"} error={error} setError={setError} formularioValido={formularioValido} handleSubmit={handleSubmit} email={email} senha={senha} setSenha={setSenha} setEmail={setEmail}/>

                <span>Ainda não é cadastrado? <Link className="text-blue-400 hover:underline" to={"/register"}>Cadastrar</Link> </span>
            </div>

        </div>
    )
}

export default Login