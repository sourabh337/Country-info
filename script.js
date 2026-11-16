let searchForm = document.getElementById("searchForm");
let countryInput = document.getElementById("countryInput");
let countryDetails = document.getElementById("countryDetails");

searchForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let countryName = countryInput.value.trim().toLowerCase();

    if (countryName === "") {
        countryDetails.innerHTML = "<p class='error'>Please enter a country name.</p>";
        return;
    }

    countryDetails.innerHTML = "<p class='loading'>Loading...</p>";

    let apiURL = "https://countries.dev/name/" + encodeURIComponent(countryName);

    fetch(apiURL)

    .then(function(response) {

        if (!response.ok) {
            throw new Error("Country not found");
        }

        return response.json();

    })

    .then(function(data) {

        let country = null;

        for (let i = 0; i < data.length; i++) {

            if (data[i].name.toLowerCase() === countryName) {
                country = data[i];
                break;
            }

        }

        if (country === null) {

            countryDetails.innerHTML = `
                <p class="error">
                    Please enter the full country name.
                </p>
            `;

            return;

        }

        let name = country.name;

        let flag = country.flags.png;

        let capital = country.capital || "Not available";

        let population = country.population.toLocaleString();

        let region = country.region;

        let currency = "Not available";

        if (country.currencies && country.currencies.length > 0) {

            let currencyCode = country.currencies[0].code;

            let currencyName = country.currencies[0].name;

            currency = currencyName + " (" + currencyCode + ")";

        }

        countryDetails.innerHTML = `
            <div class="country-card">

                <img src="${flag}" alt="${name} flag">

                <h2>${name}</h2>

                <p><strong>Capital:</strong> ${capital}</p>

                <p><strong>Population:</strong> ${population}</p>

                <p><strong>Region:</strong> ${region}</p>

                <p><strong>Currency:</strong> ${currency}</p>

            </div>
        `;

    })

    .catch(function(error) {

        countryDetails.innerHTML = `
            <p class="error">
                Country not found or internet connection problem.
                Please try again.
            </p>
        `;

    });

});
