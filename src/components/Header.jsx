import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Header({ userLogged }) {

    return (
        <div className="fixed top-0 z-50 bg-white w-full p-5 border-b border-black/30 ">
            <div className="flex gap-2 items-center">
                <FontAwesomeIcon icon={faUser} className="px-1.5 py-2 rounded-full border"/>
                <h1 className="font-medium">{userLogged}</h1>
            </div>
        </div>
    )
}
