import Input from "./Input"
import SubmitButton from "./SubmitButton"

function Form({ mode, error, setError, nome, setNome, email, setEmail, senha, setSenha, confirmarSenha, setConfirmarSenha, handleSubmit, formularioValido}) {


    if (mode === "register") {
        return (
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 justify-center items-center">
                <Input onChange={(e) => {
                        setNome(e.target.value)
                        setError('')
                    }} value={nome} mode="normal" name={"Nome"} placeHolder={"Digite o seu nome"}/>
                <Input onChange={(e) => {
                        setEmail(e.target.value)
                        setError('')
                    }} value={email} type={"email"} mode="normal" name={"E-mail"} placeHolder={"Digite seu e-mail"}/>
                <Input onChange={(e) => {
                        setSenha(e.target.value)
                        setError('')
                    }} value={senha} mode="password" name={"Senha"} placeHolder={"Digite a sua senha"}/>
                <Input onChange={(e) => {
                        setConfirmarSenha(e.target.value)
                        setError('')
                    }} value={confirmarSenha} mode="password" name={"Confirme a sua senha"} placeHolder={"Repita a sua senha"} className={confirmarSenha != "" && confirmarSenha != senha ? "ring-2 ring-red-500" : "ring-0"}/>

                {error != '' &&
                    <span className="text-red-500">{error}</span>
                }

                <SubmitButton modo={"register"} onSubmit={handleSubmit} disabled={!formularioValido}/>
                
            </form>
        )
    } else {
        return (
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 justify-center items-center">

                <Input onChange={(e) => {
                        setEmail(e.target.value)
                        setError('')
                    }} value={email} mode="normal" name={"E-mail"} placeHolder={"Digite seu e-mail"}/>
                <Input onChange={(e) => {
                        setSenha(e.target.value)
                        setError('')
                    }} value={senha} mode="password" name={"Senha"} placeHolder={"Digite a sua senha"}/>

                {error != '' &&
                    <span className="text-red-500">{error}</span>
                }

                <SubmitButton modo={"login"} disabled={!formularioValido}/>
            </form>
        )
    }
}

export default Form