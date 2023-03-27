import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createHtml, createListHtml } from './js/constructor';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchEl = document.querySelector('#search-box');
const countryInfoEl = document.querySelector('.country-info');
const countryssearchEl = document.querySelector('.country-list');

let isCountryInfoDisplayed = false;

function handleSearchCountry(e) {
    clearResults();
    const name = e.target.value.trim();
    if (!name) {
        clearResults();
        Notify.failure('В інпуті немає даних, для пошуку вкажіть предмет пошуку в інпуті');
        return;
    }
    fetchCountries(name)
        .then(data => {
            console.log(data)
            if (data.length > 10) {
                clearResults();
                Notify.failure('Введіть більш точний запит');
            } else if (data.length > 1 && data.length <= 10) {
                clearResults();
                countryssearchEl.innerHTML = createListHtml(data);
            } else if (data.length === 1) {
                if (!isCountryInfoDisplayed) {
                    clearResults();
                    countryInfoEl.innerHTML = createHtml(data);
                    isCountryInfoDisplayed = true;
                }
            } else {
                isCountryInfoDisplayed = false;
            }
        })
        .catch(() => {
            clearResults();
            Notify.failure('Oops, there is no country with that name');
        });
}

function clearResults() {
    countryInfoEl.innerHTML = '';
    countryssearchEl.innerHTML = '';
    isCountryInfoDisplayed = false;
}

searchEl.addEventListener('input', debounce(handleSearchCountry, DEBOUNCE_DELAY));