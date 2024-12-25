// Função para alterar a imagem no hover
function trocarImagem(event, novaImagem) {
  event.target.src = novaImagem;
}

// Função para restaurar a imagem original
function restaurarImagem(event, imagemOriginal) {
  event.target.src = imagemOriginal;
}

// Selecionar todas as imagens dentro do UL
const imagens = document.querySelectorAll("ul img");

// Configurar as imagens de hover e originais
imagens.forEach(img => {
  const imagemOriginal = img.src; // Salva a imagem original
  const novaImagem = imagemOriginal.replace(".png", "_hover.png"); 

  // Adiciona os eventos de hover
  img.addEventListener("mouseover", (event) => trocarImagem(event, novaImagem));
  img.addEventListener("mouseout", (event) => restaurarImagem(event, imagemOriginal));
});

// Ligação a API

$.ajax({
  method: "GET",
  url: "https://restcountries.com/v3.1/all",
  data: {name: "Brazil", fullText: true},
})