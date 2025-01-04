function mostrarFavoritos() {
  var favoritos = JSON.parse(localStorage.getItem("paisesFavoritos")) || [];

  var listaFavoritos = document.getElementById("lista-favoritos");
  listaFavoritos.innerHTML = ''; // Limpa a lista antes de adicionar os novos favoritos

  if (favoritos.length === 0) {
      listaFavoritos.innerHTML = '<p>Não há países favoritos.</p>';
      return;
  }

  // Fazer uma requisição à API para obter os detalhes dos países
  fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(countries => {
          // Filtra apenas os países que estão nos favoritos
          var favoritosDetalhados = countries.filter(country =>
              favoritos.includes(country.name.common)
          );

          favoritosDetalhados.forEach(function (country) {
              // Criar o card com as informações do país
              var cardFavorito = document.createElement("div");
              cardFavorito.className = "col-md-4 mb-4";

              cardFavorito.innerHTML = `
                  <div class="card h-100">
                      <img src="${country.flags.png}" 
                           class="card-img-top" 
                           alt="Bandeira de ${country.name.common}">
                      <div class="card-body text-center">
                          <h5 class="card-title">${country.name.common}</h5>
                          <p class="card-text">Capital: ${country.capital ? country.capital[0] : 'N/A'}</p>
                          <p class="card-text">Região: ${country.region}</p>
                          <p class="card-text">População: ${country.population.toLocaleString()}</p>
                          <button type="button" 
                                  class="btn btn-outline-primary mb-2" 
                                  onclick="location.href='detalhes_do_pais.html?country=${country.cca3}'">
                              Detalhes
                          </button>
                          <img class="favorito" 
                               src="assets/img/favorito.png" 
                               alt="Favorito" 
                               onclick="toggleFavorito('${country.name.common}', this)">
                      </div>
                  </div>`;

              listaFavoritos.appendChild(cardFavorito);
          });
      })
      .catch(error => {
          console.error('Erro ao buscar dados da API:', error);
          listaFavoritos.innerHTML = '<p>Erro ao carregar os favoritos. Tente novamente mais tarde.</p>';
      });
}

function toggleFavorito(pais, elemento) {
  var favoritos = JSON.parse(localStorage.getItem("paisesFavoritos")) || [];

  if (favoritos.includes(pais)) {
      // Remove o país dos favoritos
      favoritos = favoritos.filter(function (item) {
          return item !== pais;
      });

      // Troca para ícone de "não favorito"
      elemento.src = 'assets/img/nao_favorito.png';
  } else {
      // Adiciona o país aos favoritos
      favoritos.push(pais);

      // Troca para ícone de "favorito"
      elemento.src = 'assets/img/favorito.png';
  }

  // Atualiza o localStorage
  localStorage.setItem("paisesFavoritos", JSON.stringify(favoritos));

  // Atualiza a UI
  mostrarFavoritos();
}

window.onload = function () {
  mostrarFavoritos();
};


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