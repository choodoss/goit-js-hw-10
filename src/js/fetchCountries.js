function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}`)
        .then(response => {
            if (!response.ok) {
                console.error();
                throw new Error(response.status);
            }
            console.log(response)
            console.log(response.json())
            return response.json();
        })
        .catch(error => console.log(error));
};
