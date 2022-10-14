import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { refs } from './refs';

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

export {
  renderCountriesCards,
  renderSmallCountriesCards,
  renderOneBiggerCountriesCard,
};
