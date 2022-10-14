import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { refs } from './refs';

// Функция - вывести окно с ошибкой
export default function onFetchError(error) {
  // Очистить разметку списка стран и одной страны
  // если пользователь после правильного поиска
  // начал добавлять неправильный
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
  Notify.failure('Oops, there is no country with that name');
}
