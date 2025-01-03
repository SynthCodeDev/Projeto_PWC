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
                // Popula os detalhes no HTML
                const detalhes = `
                    <h2>${country.name.common}</h2>
                    <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
                    <p><strong>Região:</strong> ${country.region}</p>
                    <p><strong>População:</strong> ${country.population.toLocaleString()}</p>
                    <p><strong>Fuso horário:</strong> ${country.timezones[0]}</p>
                    <p><strong>Moeda:</strong> ${country.currencies[Object.keys(country.currencies)[0]].name} (${country.currencies[Object.keys(country.currencies)[0]].symbol})</p>
                    <img src="${country.flags.png}" alt="Bandeira de ${country.name.common}" width="200">
                `;
                $('.detalhes').html(detalhes);
            },
            error: function () {
                $('.detalhes').html('<p>Erro ao carregar os detalhes do país.</p>');
            },
        });
    } else {
        $('.detalhes').html('<p>Nenhum país selecionado.</p>');
    }
});