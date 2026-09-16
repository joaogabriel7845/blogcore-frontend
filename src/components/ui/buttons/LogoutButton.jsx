import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { ThemeContext } from "../../../context/ThemeContext";

function LogoutButton() {

  const { theme } = useContext(ThemeContext)

  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        localStorage.removeItem("token");
        navigate("/login");
      }}
      className="flex gap-2 items-center"
      title="Sair"
    >
      <FontAwesomeIcon
        icon={faRightFromBracket}
      />
      <p>Sair</p>
      
    </button>
  );
}

export default LogoutButton
