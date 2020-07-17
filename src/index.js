import './styles.css';
import '../node_modules/toastr/build/toastr.css';
import toastr, { options } from 'toastr';
import { refs } from './js/refs';
import fetchCountries from './js/fetchCountries';

import countriesTemp from './templates/countries.hbs';
import singleCountryTemp from './templates/single-country.hbs';

const debounce = require('lodash.debounce');

toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: true,
  progressBar: true,
  positionClass: 'toast-top-right',
  preventDuplicates: true,
  onclick: null,
  showDuration: '100',
  hideDuration: '1000',
  timeOut: '2000',
  extendedTimeOut: '1000',
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut',
};

refs.input.addEventListener('input', debounce(handleInput, 500));

function handleInput() {
  const searchInput = refs.input.value;
  clear();

  if (searchInput !== '') {
    fetchCountries(searchInput)
      .then(data => {
        const countriesObj = data.map(country => country);
        return countriesObj;
      })
      .then(countriesObj => {
        if (countriesObj.length >= 2 && countriesObj.length <= 10) {
          renderOutput(countriesObj);

          toastr.success(`Найдено ${countriesObj.length} стран(ы)`, 'Успешно');
        } else if (countriesObj.length === 1) {
          renderSingleOutput(countriesObj);

          toastr.success('Найдена одна страна', 'Успешно');
        } else {
          toastr.warning('Слишком много совпадений', 'Уточните запрос');

          return;
        }
      })
      .catch(() => {
        toastr.error(`Ничего не найдено`, 'Ошибка');

        clear();
      });
  }
}

function renderSingleOutput(obj) {
  refs.output.insertAdjacentHTML('beforeend', singleCountryTemp(obj));
}

function renderOutput(obj) {
  refs.output.insertAdjacentHTML('beforeend', countriesTemp(obj));
}

function clear() {
  refs.output.textContent = '';
  // refs.input.value = '';
}
