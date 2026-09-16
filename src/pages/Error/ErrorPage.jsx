import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"
import { ThemeContext } from "../../context/ThemeContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons"

function ErrorPage() {
    const location = useLocation()
    const mensagem = location.state?.message

    const navigate = useNavigate()

    const [segundos, setSegundos] = useState(5)

    const {theme} = useContext(ThemeContext )
    
    console.log(segundos)

    useEffect(() => {
        const intervalo = setInterval(() => {
            setSegundos((prevSegundos) => prevSegundos - 1)
        }, 1000);
        
        return () => clearInterval(intervalo)
        
    }, [])
    
    useEffect(() => {
        
        if(segundos === 0) {
            navigate('/app')
        }

    }, [segundos])


    return (
        <div className={`w-full h-screen flex flex-col gap-3 justify-center items-center p-5 ${theme.bg} ${theme.text} font-[Space_Mono]`}>

            <div className={`flex justify-center items-center flex-col gap-2 text-2xl p-15 border ${theme.border} transition-all hover:rounded-2xl animate-pulse`}>
                <FontAwesomeIcon icon={faCircleExclamation} className="text-4xl text-red-400"/>
                <h1>{mensagem}</h1>
            </div>

            <div>
                <p className="text-sm">Redirecionando você em <span className="text-2xl">{segundos}</span>s</p>
                
            </div>

        </div>
    )
}

export default ErrorPage