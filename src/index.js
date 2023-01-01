import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';
const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
input.style.fontSize = '22px';
input.style.borderColor = 'blue';
const countryList = document.querySelector('.country-list');
countryList.style.listStyle = 'none';
countryList.style.fontSize = '28px';
const countryInfo = document.querySelector('.country-info');

input.addEventListener(
  'input',
  debounce(e => {
    const trim = input.value.trim();
    reset();
    if (trim) {
      fetchCountries(trim).then(list => {
        if (list.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (!list.length) {
          Notiflix.Notify.failure('Oops, there is no country with that name');
        } else if (list.length >= 2 && list.length <= 10) {
          showCountryList(list);
        } else if (list.length === 1) {
          showCountry(list);
        }
      });
    }
  }, DEBOUNCE_DELAY)
);

function reset() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}

function showCountryList(countries) {
  const markup = countries
    .map(country => {
      return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="50" hight="30">
         <b>${country.name.official}</p>
                </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}

function showCountry(countries) {
  const markup = countries
    .map(country => {
      return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${
        country.name.official
      }" width="90" hight="60">
         <b>${country.name.official}</b></p>
            <p><b>Capital</b>: ${country.capital}</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>Languages</b>: ${Object.values(country.languages)} </p>
                </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}
