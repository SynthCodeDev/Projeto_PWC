var allCountries = []; // Variável para armazenar todos os países

function fetchCountries() {
    var api_url = "https://restcountries.com/v3.1/all";

    $.ajax({
        url: api_url,
        method: "GET",
        success: function(data) {
            console.log(data);
            allCountries = data; // Armazena os países na variável global
            displayCountries(allCountries); // Exibe a lista inicial completa
        },
        error: function() {
            alert("Erro na pesquisa dos países");
        }
    });
}

function displayCountries(countriesArray) {
    var countrieslist = $("#countrieslist");
    countrieslist.empty();

    // Ordenar os países por nome comum
    countriesArray.sort(function (a, b) {
        return a.name.common.localeCompare(b.name.common);
    });

    countriesArray.forEach(function (country) {
        var cardCountry = `<div class="col-md-2 mb-2">
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

    // Adicionar evento de clique para as imagens de favorito
    document.querySelectorAll('.favorito').forEach(function (image) {
        image.addEventListener('click', function () {
            if (this.src.includes('nao_favorito.png')) {
                this.src = this.src.replace('nao_favorito.png', 'favorito.png');
            } else if (this.src.includes('favorito.png')) {
                this.src = this.src.replace('favorito.png', 'nao_favorito.png');
            }
        });
    });
}

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
});