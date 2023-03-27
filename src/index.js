import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createHtml, createListHtml } from './js/constructor';

const DEBOUNCE_DELAY = 300;

const searchEl = document.querySelector('#search-box');
const countryInfoEl = document.querySelector('.country-info');
const countryssearchEl = document.querySelector('.country-list');

let isCountryInfoDisplayed = false;

function handleSearchCountry(e) {
    const name = e.target.value.trim();
    if (!name) {
        clearResults();
        Notify.failure('В інпуті немає даних, для пошуку вкажіть предмет пошуку в інпуті');
        return;
    }
    if (sessionStorage.getItem('contry') !== name) {
        clearResults();

    } // Не знав як по іншому вирішити проблему коли вже є розмітка із країною і я швидко замість неї ввожу нову назву, розмітка не зявлялась, тому вирішив це виправити.

    fetchCountries(name)
        .then(data => {
            if (data.length > 10) {
                clearResults();
                Notify.failure('Введіть більш точний запит');
            } else if (data.length > 1 && data.length < 10) {
                clearResults();
                countryssearchEl.innerHTML = createListHtml(data);
            } else if (data.length === 1) {
                if (!isCountryInfoDisplayed) {
                    clearResults();
                    sessionStorage.setItem('contry', name);
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