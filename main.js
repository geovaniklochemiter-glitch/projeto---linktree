const TAMANHO_MINIMO_BUSCA = 3;

const inputBusca = document.getElementById("campo-busca");
const botaoBuscar = document.getElementById("btn-buscar");

async function executarBusca() {
  const termo = inputBusca.value.trim();

  if (termo.length < TAMANHO_MINIMO_BUSCA) {
    mostrarErro(
      `Digite ao menos ${TAMANHO_MINIMO_BUSCA} caracteres para buscar.`
    );
    limparResultados();
    return;
  }
 
  limparErro();
  limparResultados();
  mostrarLoading();
 
  try {
  
    const dados = await buscarPersonagens(termo);
 
    renderizarResultados(dados.results, favoritoExiste);
 
  } catch (erro) {

    mostrarErro(erro.message);
  } finally {

    esconderLoading();
  }
}

function alternarFavorito(id, dadosPersonagem) {
  if (favoritoExiste(id)) {
    removerFavorito(id);
    atualizarBotaoFavorito(id, false);
  } else {
    salvarFavorito(dadosPersonagem);
    atualizarBotaoFavorito(id, true);
  }
 

  renderizarFavoritos(listarFavoritos());
}
 

function _extrairDadosDoCard(card) {
  return {
    id: card.dataset.id,
    name: card.querySelector(".card-nome").textContent,
    image: card.querySelector(".card-imagem").src,
    status: card
      .querySelector(".card-detalhe")
      .textContent.replace("Status: ", ""),

    species: card.querySelectorAll(".card-detalhe")[1].textContent.replace(
      "Espécie: ",
      ""
    ),
  };
}
 

function _configurarDelegacaoFavoritos(container) {
  container.addEventListener("click", (evento) => {
    const botao = evento.target.closest(".btn-favorito");
    if (!botao) return; 
 
    const card = botao.closest(".card-personagem");
    const dadosPersonagem = _extrairDadosDoCard(card);
 
    alternarFavorito(dadosPersonagem.id, dadosPersonagem);
  });
}
 

function iniciarAplicacao() {

  botaoBuscar.addEventListener("click", executarBusca);

  inputBusca.addEventListener("keyup", (evento) => {
    if (evento.key === "Enter") {
      executarBusca();
    }
  });
 

  _configurarDelegacaoFavoritos(elementoResultados);
  _configurarDelegacaoFavoritos(elementoFavoritos);
 
  renderizarFavoritos(listarFavoritos());
}

document.addEventListener("DOMContentLoaded", iniciarAplicacao);