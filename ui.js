const elementoResultados = document.getElementById("resultados-busca");
const elementoFavoritos = document.getElementById("lista-favoritos");
const elementoErro = document.getElementById("mensagem-erro");
const elementoLoading = document.getElementById("loading");

function _criarCardPersonagem(personagem, jaFavoritado) {

  const textoBotao = jaFavoritado ? "★ Remover dos favoritos" : "☆ Favoritar";
  const classeBotao = jaFavoritado ? "btn-favorito ativo" : "btn-favorito";
 
  return `
    <div class="card-personagem" data-id="${personagem.id}">
      <img src="${personagem.image}" alt="${personagem.name}" class="card-imagem">
      <div class="card-info">
        <h3 class="card-nome">${personagem.name}</h3>
        <p class="card-detalhe">Status: ${personagem.status}</p>
        <p class="card-detalhe">Espécie: ${personagem.species}</p>
        <button
          class="${classeBotao}"
          data-id="${personagem.id}"
          data-acao="${jaFavoritado ? "remover" : "salvar"}"
        >
          ${textoBotao}
        </button>
      </div>
    </div>
  `;
}
 
function renderizarResultados(personagens, verificarFavorito) {
  limparResultados();
 
  if (!personagens || personagens.length === 0) {
    elementoResultados.innerHTML = "<p>Nenhum resultado para exibir.</p>";
    return;
  }
 
  const htmlCards = personagens
    .map((personagem) =>
      _criarCardPersonagem(personagem, verificarFavorito(personagem.id))
    )
    .join("");
 
  elementoResultados.innerHTML = htmlCards;
}
 

function renderizarFavoritos(favoritos) {
  if (!favoritos || favoritos.length === 0) {
    elementoFavoritos.innerHTML = "<p>Você ainda não tem favoritos salvos.</p>";
    return;
  }

  const htmlCards = favoritos
    .map((personagem) => _criarCardPersonagem(personagem, true))
    .join("");
 
  elementoFavoritos.innerHTML = htmlCards;
}
 
function mostrarErro(mensagem) {
  elementoErro.textContent = mensagem;
  elementoErro.classList.remove("escondido");
}

function limparErro() {
  elementoErro.textContent = "";
  elementoErro.classList.add("escondido");
}

function mostrarLoading() {
  limparErro();
  elementoLoading.classList.remove("escondido");
}

function esconderLoading() {
  elementoLoading.classList.add("escondido");
}

function limparResultados() {
  elementoResultados.innerHTML = "";
}

function atualizarBotaoFavorito(id, novoEstadoFavoritado) {

  const botoes = document.querySelectorAll(
    `.btn-favorito[data-id="${id}"]`
  );
 
  botoes.forEach((botao) => {
    if (novoEstadoFavoritado) {
      botao.textContent = "★ Remover dos favoritos";
      botao.classList.add("ativo");
      botao.dataset.acao = "remover";
    } else {
      botao.textContent = "☆ Favoritar";
      botao.classList.remove("ativo");
      botao.dataset.acao = "salvar";
    }
  });
}