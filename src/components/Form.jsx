import { OrbitProgress } from "react-loading-indicators"
import Input from "./ui/inputs/Input"
import SubmitButton from "./ui/buttons/SubmitButton"

function Form({ mode, carregando, error, setError, nome, setNome, email, setEmail, senha, setSenha, verSenha, setVerSenha, confirmarSenha, setConfirmarSenha, handleSubmit, formularioValido}) {

    if (mode === "register") {
        return (
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 justify-center items-center">
                <Input onChange={(e) => {
                        setNome(e.target.value)
                        setError('')
                    }} value={nome} mode="normal" name={"Nome"}/>
                <Input onChange={(e) => {
                        setEmail(e.target.value)
                        setError('')
                    }} value={email} type={"email"} mode="normal" name={"E-mail"}/>
                <Input onChange={(e) => {
                        setSenha(e.target.value)
                        setError('')
                    }} value={senha} verSenha={verSenha} setVerSenha={setVerSenha} mode="password" name={"Senha"}/>
                <Input onChange={(e) => {
                        setConfirmarSenha(e.target.value)
                        setError('')
                    }} value={confirmarSenha} verSenha={verSenha} setVerSenha={setVerSenha} mode="password" name={"Confirme a sua senha"} className={confirmarSenha != "" && confirmarSenha != senha ? "focus:ring focus:ring-red-500" : "ring-0"}/>

                {senha.length > 0 && senha.length < 8 &&
                    <span className="text-red-500">Sua senha deve ter no mínimo 8 carácteres</span>
                }

                {error != '' &&
                    <span className="text-red-500">{error}</span>
                }

                {carregando &&
                    <OrbitProgress color="#000" size="small" text="" textColor="" />
                }

                <SubmitButton modo={"register"} disabled={!formularioValido}/>
                
            </form>
        )
    } else {
        return (
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 justify-center items-center">

                <Input onChange={(e) => {
                        setEmail(e.target.value)
                        setError('')
                    }} value={email} mode="normal" name={"E-mail"}/>
                <Input onChange={(e) => {
                        setSenha(e.target.value)
                        setError('')
                    }} value={senha} verSenha={verSenha} setVerSenha={setVerSenha} mode="password" name={"Senha"}/>

                {error != '' &&
                    <span className="text-red-500">{error}</span>
                }

                {carregando &&
                    <OrbitProgress color="#000" size="small" text="" textColor="" />
                }

                <SubmitButton modo={"login"}/>
            </form>
        )
    }
}

export default Form