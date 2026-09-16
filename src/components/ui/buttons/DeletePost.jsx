import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function DeletePost({ onClick }) {
    return (
        <button onClick={onClick} className="w-8 h-8 bg-amber-400 rounded-full border border-black/30 hover:cursor-pointer">
            <FontAwesomeIcon icon={faTrash} />
        </button>
    )
}

export default DeletePost