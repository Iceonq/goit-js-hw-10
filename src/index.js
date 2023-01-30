import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
import { fetchCountries } from './fetchCountries';

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener(
  'input',

  debounce(() => {
    fetchCountries(searchBox.value.trim())
      .then(response => {
        if (response.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (response.length <= 10 && response.length > 1) {
          response.forEach(country => {
            countryListElement(country);
          });
        } else {
          response.forEach(country => {
            singleCountryElement(country);
          });
        }
      })
      .catch(error =>
        Notiflix.Notify.failure('Oops, there is no country with that name')
      );
  }, 300)
);

const countryListElement = country => {
  countryList.insertAdjacentHTML(
    'beforeend',
    `
  <li class="country-list__item">
  <img src="${country.flags.svg}" alt="${country.flags.svg}"
  <p>${country.name.common}</p>
  </li>`
  );
};

const singleCountryElement = country => {
  countryInfo.innerHTML = `
    <img src="${country.flags.svg}" class="single-flag" alt="${
    country.flags.svg
  }"/>
    <h2>${country.name.common}</h2>
    <p><span class="single-text">Capital: </span> ${country.capital}</p>
    <p><span class="single-text">Population: </span> ${country.population}</p>
    <p><span class="single-text">Languages: </span> ${Object.values(
      country.languages
    )}</>
    `;
};
