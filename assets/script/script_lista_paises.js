var allCountries = []; // Variável para armazenar todos os países

// Busca os países da API
function fetchCountries() {
    var api_url = "https://restcountries.com/v3.1/all";

    $.ajax({
        url: api_url,
        method: "GET",
        success: function (data) {
            allCountries = data; // Armazena os países na variável global
            displayCountries(allCountries); // Exibe a lista inicial completa
        },
        error: function () {
            alert("Erro na pesquisa dos países");
        }
    });
}

// Renderiza os países como cards
function displayCountries(countriesArray) {
    var countrieslist = $("#countrieslist");
    countrieslist.empty();

    // Ordenar os países por nome comum
    countriesArray.sort(function (a, b) {
        return a.name.common.localeCompare(b.name.common);
    });

    countriesArray.forEach(function (country) {
        var cardCountry = `<div class="col-md-4 mb-4">
            <div class="card h-100">
                <img src="${country.flags.png}" class="card-img-top" alt="Bandeira de ${country.name.common}">
                <div class="card-body">
                    <h5 class="card-title">${country.name.common}</h5>
                    <p class="card-text">Capital: ${country.capital ? country.capital[0] : 'N/A'}</p>
                    <p class="card-text">Região: ${country.region}</p>
                    <p class="card-text">População: ${country.population.toLocaleString()}</p>
                    <button type="button" class="btn btn-outline-primary" id="maisInfo" onclick="location.href='detalhes_do_pais.html?country=${country.cca3}'">Detalhes</button>
                    <img class="favorito" src="assets/img/nao_favorito.png" alt="Favorito">
                </div>
            </div>
        </div>`;
        countrieslist.append(cardCountry);
    });

    atualizarFavoritosUI(); // Atualiza os estados dos favoritos

    // Adiciona evento de clique para as imagens de favorito
    document.querySelectorAll('.favorito').forEach(function (image) {
        image.addEventListener('click', function () {
            var pais = this.parentElement.querySelector('.card-title').innerText;

            if (this.src.includes('nao_favorito.png')) {
                this.src = 'assets/img/favorito.png';
                addFavoritos(pais);
            } else if (this.src.includes('favorito.png')) {
                this.src = 'assets/img/nao_favorito.png';
                removeFavoritos(pais);
            }
        });
    });
}

// Adiciona um país aos favoritos no localStorage
function addFavoritos(pais) {
    var arrayPaisesFavoritos;

    // Verifica se já existem favoritos no localStorage
    if (localStorage.getItem("paisesFavoritos") === null) {
        arrayPaisesFavoritos = []; // Se não, cria um array vazio
    } else {
        arrayPaisesFavoritos = JSON.parse(localStorage.getItem("paisesFavoritos")); // Caso contrário, recupera a lista de favoritos
    }

    // Adiciona o país à lista
    if (!arrayPaisesFavoritos.includes(pais)) {
        arrayPaisesFavoritos.push(pais);
    }

    // Salva no localStorage
    localStorage.setItem("paisesFavoritos", JSON.stringify(arrayPaisesFavoritos));
}

// Remove um país dos favoritos no localStorage
function removeFavoritos(pais) {
    var arrayPaisesFavoritos = JSON.parse(localStorage.getItem("paisesFavoritos"));

    // Remove o país da lista
    arrayPaisesFavoritos = arrayPaisesFavoritos.filter(function (item) {
        return item !== pais;
    });

    // Salva no localStorage
    localStorage.setItem("paisesFavoritos", JSON.stringify(arrayPaisesFavoritos));
}

// Atualiza os estados dos favoritos no UI
function atualizarFavoritosUI() {
    var arrayFavoritos = JSON.parse(localStorage.getItem("paisesFavoritos")) || [];

    document.querySelectorAll('.favorito').forEach(function (image) {
        var pais = image.parentElement.querySelector('.card-title').innerText;

        // Configura a imagem corretamente com base nos favoritos
        if (arrayFavoritos.includes(pais)) {
            image.src = 'assets/img/favorito.png';
        } else {
            image.src = 'assets/img/nao_favorito.png';
        }
    });
}

// Evento ao carregar a página
$(document).ready(function () {
    fetchCountries();

    // Evento de pesquisa ao digitar
    $("#searchinput").on("input", function () {
        var query = $(this).val().toLowerCase();
        var filteredCountries = allCountries.filter(function (country) {
            return country.name.common.toLowerCase().includes(query);
        });
        displayCountries(filteredCountries);
    });

    // Evento de pesquisa ao clicar no botão
    $("#searchbutton").click(function () {
        var query = $("#searchinput").val().toLowerCase();
        var filteredCountries = allCountries.filter(function (country) {
            return country.name.common.toLowerCase().includes(query);
        });
        displayCountries(filteredCountries);
    });

    window.onload = atualizarFavoritosUI; // Atualiza os favoritos ao recarregar a página
});



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