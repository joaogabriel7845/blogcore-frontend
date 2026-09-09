import EditPost from "./EditPost";
import DeletePost from "./DeletePost";
import { deletarPosts } from "../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

function PostsSection({
  userLoggedId,
  posts,
  setTituloPost,
  setDescricaoPost,
  setModal,
  setModo,
  setCurrentPost,
  carregarPostagens,
}) {
  console.log(posts);
  function formatarData(data) {
    const date = new Date(data);

    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="w-full flex flex-col flex-1 p-5 pt-25">
      {posts.length === 0 ? (
        <div className="w-full flex flex-col gap-2 flex-1 border border-black/30 justify-center items-center ">
          <FontAwesomeIcon
            icon={faCircleExclamation}
            fontSize={64}
            className="text-gray-400"
          />
          <h1 className="text-3xl font-medium text-gray-400">Sem postagens</h1>
        </div>
      ) : (
        <div className="w-full min-h-full grid gap-6 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
          {posts.map((p) => (
            
            <div
              key={p.id}
              className="relative flex flex-col justify-between rounded-md border border-black/30"
            >
              {userLoggedId === p.usuario_id && (
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
                      const token = localStorage.getItem('token')
                      await deletarPosts(p.id, token);
                      await carregarPostagens();
                    }}
                  />
                </div>
              )}

              <div className="flex items-center flex-1 p-5 border-b border-black/30">
                <h1 className="text-2xl">{p.titulo}</h1>
              </div>

              <div className="flex items-center flex-1 p-5 border-b border-black/30">
                <p>Descrição: {p.descricao}</p>
              </div>

              <div className="flex justify-between items-center flex-1 p-5">
                <p>Postado em {formatarData(p.data_criacao)}</p>
                <p>Usuário: {p.nome}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PostsSection;
