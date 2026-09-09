import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AddPost({ onClick }) {
    return (
        <button onClick={onClick} className="bg-amber-400 fixed rounded-full bottom-5 right-5 p-4 gap-1 flex items-center border border-black/30 transition-all hover:cursor-pointer hover:-translate-y-1">
            <p className="font-medium">Adicionar</p>
            <FontAwesomeIcon icon={faAdd} />
        </button>
    )
}

export default AddPost