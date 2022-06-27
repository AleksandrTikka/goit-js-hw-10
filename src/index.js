import debounce from 'lodash.debounce';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';
import { fetchСountries } from './js/fetchCountries.js';

const DEBOUNCE_DELAY = 300;
const name = '';

const refs = {
    input: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
    info: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInputCountry, DEBOUNCE_DELAY));



function onInputCountry(e) {
    const searchName = e.currentTarget.value.trim();
    if (searchName === "") {
        refs.list.innerHTML = '';
        refs.info.innerHTML = '';
        return;
    }
    fetchСountries(searchName)
    .then((countries) => {
        if (countries.length > 10) {
            console.log("Too many matches found. Please enter a more specific name.")
        } if (countries.length > 2 && countries.length < 10) {
             renderCountriesList(countries)
        } if (countries.length === 1) {
            renderCountryInfo(country)
        }
     }
   )
        .catch((error) => console.log(error));
    
}







