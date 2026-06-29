const API_BASE_URL = "https://rickandmortyapi.com/api/character";
 
async function buscarPersonagens(nomePersonagem) {

  const url = `${API_BASE_URL}?name=${encodeURIComponent(nomePersonagem)}`;
 
  try {
    const resposta = await fetch(url);
 

    if (resposta.status === 404) {
      throw new Error("Nenhum personagem encontrado com esse nome.");
    }
 
    if (!resposta.ok) {
      throw new Error(`Erro ao consultar a API (status ${resposta.status}).`);
    }
 

    const dados = await resposta.json();
    return dados;
 
  } catch (erro) {
    
    if (erro instanceof TypeError) {
      throw new Error(
        "Não foi possível conectar à API. Verifique sua conexão com a internet."
      );
    }
 
    throw erro;
  }
}
 
async function buscarPersonagemPorId(id) {
  const url = `${API_BASE_URL}/${id}`;
 
  try {
    const resposta = await fetch(url);
 
    if (!resposta.ok) {
      throw new Error(`Erro ao buscar personagem (status ${resposta.status}).`);
    }
 
    const dados = await resposta.json();
    return dados;
 
  } catch (erro) {
    if (erro instanceof TypeError) {
      throw new Error(
        "Não foi possível conectar à API. Verifique sua conexão com a internet."
      );
    }
    throw erro;
  }
}