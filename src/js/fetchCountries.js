export function fetchСountries(name) {
    // const name = '';
    const BASE_URL = 'https://restcountries.com/v3.1/name/';
    const filter = '?fields=name,capital,population,flags.svg,languages';
    return fetch(`${BASE_URL}${name}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });
};