import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';
import { fetchСountries } from './js/fetchCountries.js';

const DEBOUNCE_DELAY = 300;


const refs = {
    input: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
    info: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInputCountry, DEBOUNCE_DELAY));


function onInputCountry(e) {
    const searchName = e.target.value.trim();
    if (searchName === "") {
        clearList();
        clearInfo();
        Notify.info('I see only spaces... Please enter a valid country name!');
        //  return;
    }
    fetchСountries(searchName)
    .then((countries) => {
        if (countries.length > 10) {
            clearList();
            clearInfo();
            Notify.info("Too many matches found. Please enter a more specific name.")
        } if (countries.length >= 2 && countries.length <= 10) {
            const listMarkup = countries.map(country => renderCountriesList(country))
            refs.list.innerHTML = listMarkup.join('');
            clearInfo();
        } if (countries.length === 1) {
            const infoMarkup = countries.map(country => renderCountryInfo(country))
            refs.info.innerHTML = infoMarkup.join('');
            clearList();
        }
     })
        .catch((error) => {
            
            Notify.failure('Oops, there is no country with that name', `${error}`);
            clearList();
        clearInfo();
            return error;
        });
    
}

function clearList() {
    refs.list.innerHTML = '';
};

function clearInfo() {
    refs.info.innerHTML = '';
};

function renderCountriesList({
    flags,
    name,
}) {
    return `<li class = "country-list__item">
    <img class = "country-list__img"
    src="${flags.svg}" 
    alt= "${name.official}" 
    width= "30"
    />
    <h2 class "country-list__header">${name.official}</h2>
    </li>     
    
    `    
};

function renderCountryInfo({
    flags,
    name,
    capital,
    population,
    languages,
}) {
    return `
        <div class="country-info__wrapper">
            <img class="country-info__img"
        src="${flags.svg}" 
        alt= "${name.official}" 
        width= "30"
        />
        <h2 class = "country-info__header">${name.official}</h2>
        </div >
        <p class = "country-info__paragraph">
            <span class="country-info__bold">Capital:</span>
            ${capital}
        </p>
        <p class = "country-info__paragraph">
            <span class="country-info__bold">Population:</span>
            ${population}
        </p>
        <p class = "country-info__paragraph">
            <span class="country-info__bold">Languages:</span>
            ${Object.values(languages)}
        </p>
    `
    }








