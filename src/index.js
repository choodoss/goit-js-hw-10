import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createHtml, createListHtml } from './js/constructor'
const DEBOUNCE_DELAY = 300;

const searchEl = document.querySelector('#search-box');
const countryInfoEl = document.querySelector('.country-info');
const countryssearchEl = document.querySelector('.country-list');

function handleSearchCountry(e) {
    let name = e.target.value.trim();
    if (!name) {
        return Notify.failure('В інпуті немає даних, для пошуку вкажіть предмет пошуку в інпуті');
    }
    fetchCountries(name)
        .then(data => {
            console.log(data.length)
            if (data.length > 1 || data.length < 10) { // якщо в масиві більше 1 елементу, оновлюємо список країн
                countryssearchEl.innerHTML = createListHtml(data);
                countryInfoEl.innerHTML = ''; // очистити інформацію про країну
                console.log(data.length > 1)
            } else { // якщо в масиві всього 1 елемент, оновлюємо інформацію про країну
                countryInfoEl.innerHTML = createHtml(data);
                countryssearchEl.innerHTML = ''; // очистити список країн
            }
        })
        .catch(() => Notify.failure('Error 404', 'Такої країни не знайдено!', 'Зрозуміло'));
    console.log(name);
}

searchEl.addEventListener('input', debounce(handleSearchCountry, 300));