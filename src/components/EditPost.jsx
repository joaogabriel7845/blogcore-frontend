import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function EditPost({ onClick }) {
    return (
        <button onClick={onClick} className="w-8 h-8 bg-amber-400 rounded-full border border-black/30 hover:cursor-pointer">
            <FontAwesomeIcon icon={faPen} />
        </button>
    )
}

export default EditPost