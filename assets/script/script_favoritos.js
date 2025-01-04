function mostrarFavoritos() {
    var favoritos = JSON.parse(localStorage.getItem("paisesFavoritos")) || [];

    var listaFavoritos = document.getElementById("lista-favoritos");
    listaFavoritos.innerHTML = ''; // Limpa a lista antes de adicionar os novos favoritos

    favoritos.forEach(function(pais) {
        var itemFavorito = document.createElement("li");
        itemFavorito.textContent = pais;
        listaFavoritos.appendChild(itemFavorito);
    
    
    
    });
}

window.onload = function() {
    mostrarFavoritos();
}

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
