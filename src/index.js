import './css/styles.css';
// import fetchCountries from './js/fetchCountries';
// import Lodash from 'lodash.debounce'
let debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages,translations&lang=uk`)
        .then(response => {
            if (!response.ok) {
                console.error();
                throw new Error(response.status);
            }
            console.log(response)
            return response.json();
        }).then(data => console.log(data))
};

fetchCountries('Ukraine');

const searchEl = document.querySelector('#search-box');
function hendleSerchCountry () {

}


searchEl.addEventListener('input', _.debounce((hendleSerchCountry), 300))

console.log(searchEl)
