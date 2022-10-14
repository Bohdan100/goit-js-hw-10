// npm i lodash.debounce - загрузка одного метода debounce
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;

// npm i notiflix — инсталяция, значки с раздела Notiflix Notify
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// дефолтный импорт результата http-запроса
// дефолтный импорт - fetchCountries можно без скобок {}
import fetchCountries from './js/fetchCountries';
import onFetchError from './js/onFetchError';
console.log(onFetchError);
// Именнованый импорт с скобками {}
import { refs } from './js/refs';
import {
  renderCountriesCards,
  renderSmallCountriesCards,
  renderOneBiggerCountriesCard,
} from './js/renderCountriesCards';

refs.input.addEventListener('input', debounce(onSearchKeydown, DEBOUNCE_DELAY));

let searchResult = '';

// 1. Получить значение введеных букв поиска в поле input
// В ВАРИАНТЕ 2 ДОБАВИТЬ ПЕРЕД function onSearchKeydown - async !!!
function onSearchKeydown(evt) {
  evt.preventDefault();

  // убрать пробелы в поиске - trim() + к нижнему регистру - toLowerCase()
  searchResult = evt.target.value.trim().toLowerCase();
  console.log('searchResult', searchResult);

  // 1 ВАРИАНТ - ЧЕРЕЗ return fetch - обычный http-запрос
  // Здесь then и catch
  if (searchResult !== '') {
    fetchCountries(searchResult).then(renderCountriesCards).catch(onFetchError);
    // .finally();
  } else {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
  }

  // 2 ВАРИАНТ - с asyns и await - АСИНХРОННОЙ ФУНКЦИЕЙ
  // Здесь try и catch
  // if (searchResult !== '') {
  //   try {
  //     const murkupCountries = await fetchCountries(searchResult);
  //     renderCountriesCards(murkupCountries);
  //   } catch {
  //     onFetchError();
  //   }
  // } else {
  //   refs.countryList.innerHTML = '';
  //   refs.countryInfo.innerHTML = '';
  // }
}
