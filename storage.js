const STORAGE_KEY = "linktree_favoritos";

function _obterArrayFavoritos() {
  const dadosSalvos = localStorage.getItem(STORAGE_KEY);
 
  if (!dadosSalvos) {
    return [];
  }
 
  try {
    return JSON.parse(dadosSalvos);
  } catch (erro) {

    console.error("Erro ao ler favoritos do localStorage:", erro);
    return [];
  }
}
 

function _salvarArrayFavoritos(listaFavoritos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(listaFavoritos));
}
 

function favoritoExiste(id) {
  const favoritos = _obterArrayFavoritos();
  return favoritos.some((item) => String(item.id) === String(id));
}
 

function salvarFavorito(personagem) {
  if (favoritoExiste(personagem.id)) {
    return false; 
  }
 
  const favoritos = _obterArrayFavoritos();

  const novoFavorito = {
    id: personagem.id,
    name: personagem.name,
    image: personagem.image,
    status: personagem.status,
    species: personagem.species,
  };
 
  favoritos.push(novoFavorito);
  _salvarArrayFavoritos(favoritos);
  return true;
}

function removerFavorito(id) {
  const favoritos = _obterArrayFavoritos();
  const tamanhoAntes = favoritos.length;
 
  const favoritosAtualizados = favoritos.filter(
    (item) => String(item.id) !== String(id)
  );
 
  _salvarArrayFavoritos(favoritosAtualizados);
 
  return favoritosAtualizados.length < tamanhoAntes;
}

function listarFavoritos() {
  return _obterArrayFavoritos();
}