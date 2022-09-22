// npm i lodash.debounce - загрузка одного метода debounce
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;

// npm i notiflix — инсталяция, значки с раздела Notiflix Notify
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// импорт результата http-запроса
import fetchCountries from './js/fetchCountries';

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

console.log(refs.input);
console.log(refs.countryList);
console.log(refs.countryInfo);

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
    fetchCountries(searchResult).then(renderCountriesCards).catch(
      onFetchError
      // error => Notify.failure('Oops, there is no country with that name')
    );
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

// 2. Обработать http-запрос и зарендерить разметку
function renderCountriesCards(countries) {
  console.log(countries.length);
  console.log(countries);
  if (countries.length > 10) {
    // Очистить разметку списка стран и одной страны
    // если пользователь удалит буквы в поиске
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';

    return Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
  // Вывести список стран - от 2 до 10
  if (countries.length >= 2 && countries.length <= 10) {
    renderSmallCountriesCards(countries);
  }
  // вывести одну страну с расширенными параметрами
  else {
    renderOneBiggerCountriesCard(countries);
  }
}

// Функция - вывести страны в количестве от 2 до 10 включительно
// в виде имя-флаг без других характеристик
function renderSmallCountriesCards(countries) {
  // Очистить разметку одной страны
  // если пользователь удалит буквы в поиске
  refs.countryInfo.innerHTML = '';
  const markup = countries
    .map(country => {
      return `<li class = "card-container">
  		<img src="${country.flags.svg}" alt="country flag" class = "card-img" width = "40" height = "40">
  		<h2 class = "card-title">${country.name.official}</h2></li>`;
    })
    .join('');
  return (refs.countryList.innerHTML = markup);
}

// Функция - вывести одну большую карточку с 1 страной
function renderOneBiggerCountriesCard(countries) {
  // Очистить разметку списка стран, чтоб не остался
  // когда пользователь добавит очередную букву в поиске
  refs.countryList.innerHTML = '';

  const markup = countries
    .map(country => {
      return `<li class = "card-container"><img src="${
        country.flags.svg
      }" alt="country flag" class = "card-img" width = "40" height = "40">
  		<h2 class = "card-title">${country.name.official}</h2></li>
      	<p class = "card-capital">Capital: ${country.capital}</p>
  		<p class = "card-population"> Population: ${country.population}</p>
      <p class = "card-languages"> Languages: ${Object.values(
        country.languages
      )}</p>
  	`;
    })
    .join('');
  return (refs.countryInfo.innerHTML = markup);
}

// Функция - вывести окно с ошибкой
function onFetchError(error) {
  // Очистить разметку списка стран и одной страны
  // если пользователь после правильного поиска
  // начал добавлять неправильный
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
  Notify.failure('Oops, there is no country with that name');
}
