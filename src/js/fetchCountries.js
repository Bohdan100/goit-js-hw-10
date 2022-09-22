// Функция fetchCountries - верни ответ на http-запрос
// и ответ response переведи в формат json - return response.json

// Переменные базовый URL-адрес - BASE_URL и фильтр запроса - filterFields
const BASE_URL = 'https://restcountries.com/v3.1/name';
const filterFields = 'flags,name,capital,population,languages';

// export default - дефолтный экспорт

// 1 ВАРИАНТ - ЧЕРЕЗ return fetch - обычный http-запрос get
export default function fetchCountries(name) {
  // Шаблонная строка с переменными
  return fetch(`${BASE_URL}/${name}?fields=${filterFields}`).then(response => {
    // console.log(response.json());
    return response.json();
    // response.text();
    // response.blob();
  });
}

// 2 ВАРИАНТ - с asyns и await - АСИНХРОННОЙ ФУНКЦИЕЙ
// export default async function fetchCountries(name) {
//   const response = await fetch(`${BASE_URL}/${name}?fields=${filterFields}`);
//   return await response.json();
// }

// 1 ВАРИАНТ - без сокращений http-запроса в отдельные переменные
// function fetchCountries(name) {
//   return fetch(
//     `https://restcountries.com/v3.1/name/${name}?fields=flags,name,capital,population,languages`
//   ).then(response => {
//     // console.log(response.json());
//     return response.json();
//     // response.text();
//     // response.blob();
//   });
// }
