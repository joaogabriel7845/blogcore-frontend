import { faAt, faEye, faEyeSlash, faLock, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function Input({ mode = "normal", name, verSenha, setVerSenha, onChange, className, value}) {
    
    if (mode === "password") {
        return (
            <div className="w-full max-w-xl flex flex-col gap-2">

                <div className="w-full relative flex justify-between gap-4">

                    <div className="flex justify-center items-center absolute left-0 top-0 px-3 h-full">
                        <FontAwesomeIcon icon={faLock} className="text-gray-500"/>
                    </div>

                    <input onChange={onChange} value={value} placeholder={name} type={verSenha ? "text" : "password"} className={`${className} pl-10 pr-10 flex flex-1 outline-0 px-4 py-3.5 border border-black/30 shadow-md transition-all focus:ring focus:ring-gray-600 `} />                    

                    <button type="button" className="absolute right-0 top-0 px-3 h-full hover:cursor-pointer" onClick={() => setVerSenha(!verSenha)}>
                        <FontAwesomeIcon icon={verSenha ? faEye : faEyeSlash }/>
                    </button>

                </div>
                
            </div>
        )
    }

    return (
        <div className="w-full max-w-xl flex flex-col relative">

            <div className="flex justify-center items-center absolute left-0 top-0 px-3 h-full">
                <FontAwesomeIcon icon={name === "E-mail" ? faAt : faUser} className="text-gray-500"/>
            </div>
            <input onChange={onChange} value={value} placeholder={name} className={`${className} pl-10 outline-0 px-4 py-3.5  border border-black/30 shadow-md transition-all focus:ring focus:ring-gray-600 `} />
            
        </div>
    )
}

export default Input