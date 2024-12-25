document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img');

  images.forEach(image => {
    image.addEventListener('click', function() {
      if (this.src.includes('nao_favorito.png')) {
        this.src = this.src.replace('nao_favorito.png', 'favorito.png');
      } else if (this.src.includes('favorito.png')) {
        this.src = this.src.replace('favorito.png', 'nao_favorito.png');
      }
    });
  });
});


function fetchCountries() {
  const api_url = "https://restcountries.com/v3.1/all";

  $.ajax({
      url: api_url,
      method: "GET",
      success: function(data) {
          console.log(data);
          displayCountries(data);
          const sortedCountries = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
      },
      error: function() {
          alert("Erro na pesquisa dos países");
      }
  });
}

function fetchCountries() {
  const api_url = "https://restcountries.com/v3.1/all";

  $.ajax({
      url: api_url,
      method: "GET",
      success: function(data) {
          console.log(data);
          displayCountries(data);
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
  countriesArray.sort((a, b) => a.name.common.localeCompare(b.name.common));

  countriesArray.forEach(country => {
      var cardCountry = `<div class="col-md-2 mb-2">
          <div class="card h-100">
              <img src="${country.flags.png}" class="card-img-top" alt="Bandeira de ${country.name.common}">
              <div class="card-body">
                  <h5 class="card-title">${country.name.common}</h5>
                  <p class="card-text">Capital: ${country.capital ? country.capital[0] : 'N/A'}</p>
                  <p class="card-text">Região: ${country.region}</p>
                  <p class="card-text">População: ${country.population.toLocaleString()}</p>
              </div>
          </div>
      </div>`;
      countrieslist.append(cardCountry);
  });
}

$(document).ready(function() {
  fetchCountries();
});