function ModalConfirmation({ confirmar, cancelar }) {
    return (
        <div className="fixed inset-0 z-90 flex justify-center items-center bg-black/50">
            <div className="w-full z-100 flex flex-col gap-5 relative max-w-4xl p-7 bg-white rounded-md shadow-md overflow-hidden font-[Outfit]">
                <p className="text-xl text-center">Você deseja deletar essa postagem ?</p>

                <div className="flex justify-center gap-3">
                    <button onClick={cancelar} className="p-3 bg-red-500 rounded-md">Cancelar</button>
                    <button onClick={confirmar} className="p-3 bg-green-500 rounded-md">Confirmar</button>
                </div>
            </div>
        </div>
    )
}

export default ModalConfirmation