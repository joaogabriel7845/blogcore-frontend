const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333';

// Login, Registro e Validação

// Login

export async function login(email, senha) {
    
    console.log("Frontend: dentro de login !")
    const response = await fetch(`${API_URL}/login`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                senha: senha
            })
        }
    )

    return response
}


// Registro

export async function registrar(nome, email, senha) {
    const response = await fetch(`${API_URL}/register`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                email: email,
                senha: senha
            })
        }
    )

    return response
}

// Validação

export async function validarToken(token) {

    const response = await fetch(`${API_URL}/validate-token`,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    )

    return response
}


// // // // // // // // // // // // // // // // // // // // //

// Postagens

export async function carregarPosts() {
    const response = await fetch(`${API_URL}/posts`)
    const posts = await response.json()
    
    return posts
}

export async function criarPost(titulo, descricao, token) {
    const response = await fetch(`${API_URL}/posts`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                titulo: titulo,
                descricao: descricao
            })
        }
    )

    const dados = await response.json()
    return dados
}

export async function editarPost(id, titulo, descricao, token) {
    await fetch(`${API_URL}/posts/${id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                titulo: titulo,
                descricao: descricao
            })
        }
    )
}

export async function deletarPosts(id, token) {
    await fetch(`${API_URL}/posts/${id}`,
        {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    )
}