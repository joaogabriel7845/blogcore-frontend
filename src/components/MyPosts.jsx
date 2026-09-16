import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"

function MyPosts({ posts }) {

    const {theme} = useContext(ThemeContext)
    
    return (
        <div className="w-full flex flex-col gap-5">

            <div className={`border-t ${theme.border}`}></div>

            <h1 className="text-xl font-bold font-[monospace]">Suas postagens</h1>

            <div className="flex flex-col md:flex-row gap-4 font-[monospace]">
                {
                    posts.length === 0 ?
                        <div className={`text-sm flex gap-2 items-center flex-1 p-5 border ${theme.border} `}>
                            <FontAwesomeIcon icon={faTriangleExclamation} className="text-red-400"/>
                            <p>Você ainda não possui postagens</p>
                        </div>
                    :
                    posts.map((p) =>
                        <div key={p.id} className={`w-full max-w-sm p-5 border ${theme.border}`}>
                            <p>{p.titulo}</p>
                        </div>
                    )
                }
            </div>

        </div>
    )
}

export default MyPosts