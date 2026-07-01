

const elementoResultados = document.getElementById("resultados-busca");
const elementoFavoritos  = document.getElementById("lista-favoritos");
const elementoErro       = document.getElementById("mensagem-erro");
const elementoLoading    = document.getElementById("loading");

function _escaparHtml(valor) {
  return String(valor ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function _criarCardPersonagem(personagem, jaFavoritado) {
  const id = _escaparHtml(personagem.id);
  const nome = _escaparHtml(personagem.name);
  const imagem = _escaparHtml(personagem.image);
  const autor = _escaparHtml(personagem.status);
  const tipoOuLink = _escaparHtml(personagem.species);
  const textoBotao = jaFavoritado ? "★ Remover dos favoritos" : "☆ Favoritar";
  const classeBotao = jaFavoritado ? "btn-favorito ativo" : "btn-favorito";

  const ehUrl = personagem.species && personagem.species.startsWith("http");
  const linhaEspecie = ehUrl
    ? `<p class="card-detalhe card-link">
         <a href="${tipoOuLink}" target="_blank" rel="noopener noreferrer">
           Ver perfil no Unsplash ↗
         </a>
       </p>`
    : `<p class="card-detalhe">Tipo: ${tipoOuLink}</p>`;

  return `
    <div class="card-personagem" data-id="${id}">
      <img src="${imagem}" alt="${nome}" class="card-imagem">
      <div class="card-info">
        <h3 class="card-nome" title="${nome}">${nome}</h3>
        <p class="card-detalhe">Autor: ${autor}</p>
        ${linhaEspecie}
        <button
          class="${classeBotao}"
          data-id="${id}"
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
  elementoResultados.innerHTML = personagens
    .map((p) => _criarCardPersonagem(p, verificarFavorito(p.id)))
    .join("");
}

function renderizarFavoritos(favoritos) {
  if (!favoritos || favoritos.length === 0) {
    elementoFavoritos.innerHTML = "<p>Você ainda não tem favoritos salvos.</p>";
    return;
  }
  elementoFavoritos.innerHTML = favoritos
    .map((p) => _criarCardPersonagem(p, true))
    .join("");
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
  document.querySelectorAll(`.btn-favorito[data-id="${id}"]`).forEach((botao) => {
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
