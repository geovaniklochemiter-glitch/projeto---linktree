const UNSPLASH_ACCESS_KEY = "omc0ZYklbYa_dbbtg5TQzDmm6dIYN5gMrvqGHzfgl5A";
 
const API_BASE_URL = "https://api.unsplash.com/search/photos";
 
async function buscarPersonagens(termo) {
  
  const params = new URLSearchParams({
    query: termo,
    per_page: 12,
    orientation: "squarish",
    content_filter: "high", 
  });
 
  const url = `${API_BASE_URL}?${params.toString()}`;
 
  try {
    const resposta = await fetch(url, {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        "Accept-Version": "v1",
      },
    });
 
    if (resposta.status === 401) {
      throw new Error(
        "Chave de API inválida. Verifique sua Access Key da Unsplash em api.js."
      );
    }
 
    if (resposta.status === 403) {
      throw new Error(
        "Limite de requisições atingido. Aguarde alguns minutos e tente novamente."
      );
    }
 
    if (!resposta.ok) {
      throw new Error(`Erro ao consultar a API (status ${resposta.status}).`);
    }
 
    const dados = await resposta.json();
 
    if (!dados.results || dados.results.length === 0) {
      throw new Error(
        "Nenhuma foto encontrada para esse termo. Tente outra busca."
      );
    }

    return {
      results: dados.results.map((foto) => ({
        id: foto.id,

        name: foto.description
          || foto.alt_description
          || termo,
 

        image: foto.urls.small,

        status: foto.user.name,

        species: `${foto.user.links.html}?utm_source=linktree_clone&utm_medium=referral`,
      })),
    };
 
  } catch (erro) {
    if (erro instanceof TypeError) {
      throw new Error(
        "Não foi possível conectar à API. Verifique sua conexão com a internet."
      );
    }
    throw erro;
  }
}