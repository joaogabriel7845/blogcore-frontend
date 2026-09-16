import EditPost from "../ui/buttons/EditPost";
import DeletePost from "../ui/buttons/DeletePost";
import { deletarPosts } from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faUser } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

function PostsSection({
  userLoggedId,
  posts,
  setTituloPost,
  setDescricaoPost,
  setModal,
  setModalDelete,
  setModo,
  setCurrentPost,
  carregarPostagens,
}) {

  const { theme } = useContext(ThemeContext)

  const rtf = new Intl.RelativeTimeFormat('pt-BR', { numeric: 'auto'} );

  
  function formatarData(data) {
    const timestamp = Date.now();

    const post = new Date(data).getTime()

    const diferenca =  (timestamp - post) / 1000

    if (diferenca < 60) {
      return "Agora mesmo"
    }
    
    if(diferenca < 3600) {
      const minutos = Math.floor(diferenca / 60)
      return rtf.format(-minutos, "minute")
    }
    
    if(diferenca < 86400) {
      const hora = Math.floor(diferenca / 3600)
      return rtf.format(-hora, "hour")
    }

    if(diferenca < 604800) {
      const dias = Math.floor(diferenca / 86400)
      return rtf.format(-dias, "day")
    }

    if(diferenca < 2592000) {
      const semanas = Math.floor(diferenca / 604800)
      return rtf.format(-semanas, "week")
    }

    if(diferenca < 31536000) {
      const ano = Math.floor(diferenca / 2592000)
      return rtf.format(-ano, "year")
    }

  }

  return (
    <div className={`w-full flex flex-col flex-1 p-5 pt-25 ${theme.text}`}>
      {posts.length === 0 ? (
        <div className={`w-full flex flex-col gap-2 flex-1 border ${theme.border} justify-center items-center font-[Space_Mono]`}>
          <FontAwesomeIcon
            icon={faCircleExclamation}
            fontSize={64}
            className="text-red-400"
          />
          <h1 className="text-3xl font-medium text-gray-400">Sem postagens</h1>
        </div>
      ) : (
        <div className="w-full min-h-full grid gap-6 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
          {posts.map((p) => (
            
            <div
              key={p.id}
              className={`relative flex flex-col justify-between rounded-md border ${theme.border}`}
            >
              {/* {userLoggedId === p.usuario_id && (
                <div className="flex gap-3 absolute top-2 right-2">
                  <EditPost
                    onClick={() => {
                      setModal(true);
                      setCurrentPost(p);
                      setTituloPost(p.titulo);
                      setDescricaoPost(p.descricao);
                      setModo("editar");
                    }}
                  />

                  <DeletePost
                    onClick={async () => {
                      setCurrentPost(p)
                      setModalDelete(true)
                    }}
                  />
                </div>
              )} */}

              <div className={`flex items-center gap-3 p-3 border-b ${theme.border}`}>
                <FontAwesomeIcon icon={faUser} className="px-1 py-1.5 rounded-full "/>
                <p className="font-semibold">{p.nome}</p>
              </div>

              <div className="flex items-center flex-1 p-5 border-b border-black/30">
                <h1 className="text-2xl">{p.titulo}</h1>
              </div>

              <div className="flex items-center flex-1 p-5 border-b border-black/30">
                <p>Descrição: {p.descricao}</p>
              </div>

              <div className="flex justify-between items-center flex-1 p-5">
                <p>{formatarData(p.data_criacao)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PostsSection;
