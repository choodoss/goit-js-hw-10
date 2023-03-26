// import fetchCountries from './js/fetchCountries';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;

function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages,translations&lang=uk`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        }).catch(err => console.log(err))
};

const searchEl = document.querySelector('#search-box');
const countryInfoEl = document.querySelector('.country-info');

function handleSearchCountry(e) {
    let name = e.target.value;
    console.log(name)
}

searchEl.addEventListener('input', debounce(handleSearchCountry, 300));