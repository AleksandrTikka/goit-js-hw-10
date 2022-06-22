import debounce from 'lodash.debounce';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    ul: document.querySelector('.country-list'),
    info: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInputCountry, DEBOUNCE_DELAY));

function onInputCountry() {
    fetchСountries()
        .then((countries) => renderCountriesList(countries))
        .catch((error) => console.log(error));
}


function fetchСountries() {
    return fetch("https://restcountries.com/v3.1/name/{name}").then(

        (response) => {
            if (!response.ok) {
                throw new Error(response.ststus);
            }
            return response.json();
        }
    )
};

function renderCountriesList(countries) {

};
