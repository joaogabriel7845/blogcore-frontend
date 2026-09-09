import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

function Input({ mode = "normal", name, onChange, placeHolder, className, value}) {

    const [verSenha, setVerSenha] = useState(false)
    
    if (mode === "password") {
        return (
            <div className="w-full max-w-xl flex flex-col gap-2">

                <p className="text-xl">{name}</p>

                <div className="w-full relative flex justify-between gap-4">


                    <input onChange={onChange} value={value} placeholder={placeHolder} type={verSenha ? "text" : "password"} className={`${className} pr-10 flex flex-1 outline-0 px-4 py-3.5 rounded-md border border-black/30`} />
                    

                    <button type="button" className="absolute right-0 top-0 px-3 h-full hover:cursor-pointer" onClick={() => setVerSenha(!verSenha)}>
                        <FontAwesomeIcon icon={verSenha ? faEye : faEyeSlash }/>
                    </button>

                </div>

                {value.length > 0 && value.length < 8 &&
                    <span className="text-red-500">Sua senha deve ter no mínimo 8 carácteres</span>
                }
                
            </div>
        )
    }

    return (
        <div className="w-full max-w-xl flex flex-col gap-2">

            <p className="text-xl">{name}</p>
            <input onChange={onChange} value={value} placeholder={placeHolder} className={`${className} outline-0 px-4 py-3.5 rounded-md border border-black/30`} />
            
        </div>
    )
}

export default Input