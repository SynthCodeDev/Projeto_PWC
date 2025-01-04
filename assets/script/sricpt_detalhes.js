$(document).ready(function () {
    // Captura o ID do país da URL
    const urlParams = new URLSearchParams(window.location.search);
    const countryCode = urlParams.get('country');

    if (countryCode) {
        // Faz uma chamada AJAX para obter os detalhes do país
        $.ajax({
            url: `https://restcountries.com/v3.1/alpha/${countryCode}`,
            method: 'GET',
            success: function (data) {
                const country = data[0];
                // Obter latitude e longitude
                const lat = country.latlng[0];
                const lng = country.latlng[1];

                // Popula os detalhes no HTML
                const detalhes = `
                    <h2>${country.name.common}</h2>
                    <p><strong>Bandeira Oficial e respetivo brasão de Armas:</p>
                    <img src="${country.flags.png}" alt="Bandeira de ${country.name.common}" width="200">
                    <img src="${country.coatOfArms.svg}" alt="Brasão de armas de ${country.name.common}" width="200">
                    <p><strong>Nome Oficial:</strong> ${country.name.official}</p>
                    <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
                    <p><strong>Região:</strong> ${country.region}</p>
                    <p><strong>População:</strong> ${country.population.toLocaleString()}</p>
                    <p><strong>Fronteiras com:</strong> ${country.borders}</p>
                    <p><strong>Moeda:</strong> ${country.currencies[Object.keys(country.currencies)[0]].name} (${country.currencies[Object.keys(country.currencies)[0]].symbol})</p>
                    <p><strong>Idiomas:</strong> ${Object.values(country.languages).join(', ')}</p>
                    <p><strong>Área:</strong> ${country.area.toLocaleString()} km²</p>
                    <p><strong>Domínio da Internet:</strong> ${country.tld}</p>
                `;

                // Inserir o mapa com base nas coordenadas
                const mapa = `
                    <h3>Localização no Mapa</h3>
                    <iframe
                        width="100%"
                        height="600"
                        frameborder="0"
                        style="border:0"
                        src="https://www.google.com/maps/embed/v1/view?key=AIzaSyDchQVjsY-QY6FooC0zVif8ypf273-EtVU&center=${lat},${lng}&zoom=5"
                        allowfullscreen>
                    </iframe>
                `;

                $('.detalhes').html(detalhes); // Atualiza os detalhes
                $('.mapa').html(mapa); // Insere o mapa
            },
            error: function () {
                $('.detalhes').html('<p>Erro ao carregar os detalhes do país.</p>');
                $('.mapa').html('<p>Erro ao carregar o mapa do país.</p>');
            },
        });
    } else {
        $('.detalhes').html('<p>Nenhum país selecionado.</p>');
        $('.mapa').html('<p>Nenhum mapa disponível.</p>');
    }
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
