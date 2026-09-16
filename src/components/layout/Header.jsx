import { faAngleDown, faMoon, faRightFromBracket, faSun, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { useNavigate } from "react-router";

export function Header({ userLogged }) {

    const { theme, isDark, setIsDark } = useContext(ThemeContext)
    const [menu, setMenu] = useState(false)

    const navigate = useNavigate()

    return (
        <div className={`fixed top-0 z-70 ${theme.bgHeader} ${theme.text} w-full flex justify-between md:px-10 px-5 py-4 border-b ${theme.border} font-[Raleway] `}>

            <div className="relative">

                <button onClick={() => setMenu(!menu)} className={`flex gap-2.5 items-center pl-1.5 pr-3.5 py-1.25 border ${theme.border} rounded-full hover:cursor-pointer`}>
                    <FontAwesomeIcon icon={faUser} className={`px-1 py-1.5 rounded-full border ${theme.border} `}/>
                    <p className="text-sm font-[Space_Mono] font-semibold ">{userLogged.nome}</p>
                    <FontAwesomeIcon icon={faAngleDown}/>
                </button>

                {menu && 
                    <div onClick={() => setMenu(false)} className="fixed inset-0"></div>
                }
                
                <div className={`${menu ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"} z-50 transition-all mt-1.5 flex flex-col absolute top-full rounded-md ${theme.bg} border ${theme.border} text-sm font-[monospace]`}>

                    <button onClick={() => {
                        navigate(`/me/${userLogged.id}`)
                    }} className="flex px-3 py-2.5 gap-2 items-center hover:cursor-pointer">
                        <FontAwesomeIcon icon={faUser}/>
                        <p>Minha conta</p>
                    </button>

                    <button onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/login");
                    }} className={`flex px-3 py-2.5 gap-2 items-center border-t ${theme.border} text-red-400 hover:cursor-pointer hover:bg-red-400/20`}>
                       <FontAwesomeIcon
                            icon={faRightFromBracket}
                        />
                        <p>Sair</p>
                    </button>

                </div>
                
            </div>

            <div className="relative flex gap-3 justify-center items-center">
                <button
                    className={`transition-all px-1.5 py-1 rounded-full border ${theme.border} hover:cursor-pointer ${isDark ? "hover:bg-neutral-800/70" : "hover:bg-gray-200"}`}
                    onClick={() => isDark ? setIsDark(false) : setIsDark(true)}
                >
                    <FontAwesomeIcon icon={isDark ? faSun : faMoon} color={isDark ? "white" : "black"}/>
                </button>
            </div>


        </div>
    )
}
