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

function fetchCountries() {
  const api_url = "https://restcountries.com/v3.1/all";

  $.ajax({
      url: api_url,
      method: "GET",
      success: function(data) {
          console.log(data);
          displayRandomCountries(data);
      },
      error: function() {
          alert("Erro na pesquisa dos países");
      }
  });
}

function displayRandomCountries(countriesArray) {
  var countrieslist = $("#countrieslist");
  countrieslist.empty();

  // Selecionar 3 países aleatórios
  var randomCountries = [];
  while (randomCountries.length < 3) {
      var randomIndex = Math.floor(Math.random() * countriesArray.length);
      if (!randomCountries.includes(countriesArray[randomIndex])) {
          randomCountries.push(countriesArray[randomIndex]);
      }
  }

  randomCountries.forEach(country => {
      var cardCountry = `<div class="col-md-4 mb-4">
          <div class="card h-100">
              <img src="${country.flags.png}" class="card-img-top" alt="Bandeira de ${country.name.common}" onclick="document.location='detalhes_do_pais.html?country=${country.cca3}'">
              <div class="card-body">
                  <h5 class="card-title">${country.name.common}</h5>
              </div>
          </div>
      </div>`;
      countrieslist.append(cardCountry);
  });
}

$(document).ready(function() {
  fetchCountries();
});
