function SubmitButton({ disabled, modo }) {
    return (
        <button type="submit" disabled={disabled} className="rounded-md px-7 py-3.5 disabled:opacity-70 disabled:hover:cursor-no-drop bg-green-500" >
            {modo != "register" ? "Login" : "Registrar"}
        </button>
    )
}

export default SubmitButton