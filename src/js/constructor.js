export function createHtml(arr) {
    return arr.map(item => {
        return `<div class="country-info__description">
        <img class="country-info__img" src="${item.flags.svg}" alt="flag" width="300">
            <ul class="country-description">
                <li class="country-description__item">
                    <p class="country-description__official-name">Офіційна назва країни: </p><span
                        class="mark-text">${item.name.official}</span>
                </li>
                <li class="country-description__item">
                    <p class="country-description__population">Населення: </p><span class="mark-text">${item.population}</span>
                </li>
                <li class="country-description__item">
                    <p class="country-description__capital">Столиця: </p><span class="mark-text">${item.capital[0]}</span>
                </li>
                <li class="country-description__item">
                    <p class="country-description__languages">Державна мова: </p><span
                        class="mark-text">${Object.values(item.languages)}</span>
                </li>
            </ul>
    </div>`
    }).join('');
};

export function createListHtml(arr) {
    return arr.map(item => {
        return `<li class="country-item">${item.name.official}</li>`
    }).join('');
};