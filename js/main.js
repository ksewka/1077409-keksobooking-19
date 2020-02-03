'use strict';

var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var USER_NUMBER = [1, 2, 3, 4, 5, 6, 7, 8];
var PRICE = [2000, 2500, 3000, 3500];
var CHECK_IN = ['12:00', '13:00', '14:00'];
var CHECK_OUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer, elevator', 'conditioner'];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var apartmentsAmount = 8;
var PIN_WIDTH = 40;
var PIN_HEIGHT = 44;
var mapWidth = document.querySelector('.map').clientWidth;

// Функция для подбора случайного значения в массиве
var getRandom = function (array) {
  var random = Math.floor(Math.random() * array.length);
  return array[random];
};

// Функция подбора случайного числа в заданном промежутке
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция возвращающая массив случайной длины
var getRandomLength = function (array) {
  array.length = getRandomNumber(1, array.length);
  return array;
};

// Функция возвращает отсортированный случайным образм массив
var shuffle = function (array) {
  array.sort(() => Math.random() - 0.5);
  return array;
};

shuffle(USER_NUMBER);// Перетасовали массив

// Генерируем массив из 8 объектов
var apartments = [];
for (var i = 0; i < apartmentsAmount; i++) {
  var userNumber = '0' + USER_NUMBER[i];
  var location_x = getRandomNumber(130, 630);
  var location_y = getRandomNumber(0, mapWidth);
  var apartment = {
    'author': {
      'avatar': 'img/avatars/user' + userNumber + '.png'
    },

    'offer': {
      'title': getRandom(TYPE),
      'address': location_x + ', '+ location_y,
      'price': getRandom(PRICE),
      'type': getRandom(TYPE),
      'rooms': getRandomNumber(1, 5),
      'guests': getRandomNumber(1, 8),
      'checkin': getRandom(CHECK_IN),
      'checkout': getRandom(CHECK_OUT),
      'features': getRandomLength(FEATURES),
      'description': 'some_description',
      'photos': getRandomLength(PHOTOS)
    },

    'location': {
      'x': location_x,
      'y': location_y
    }
  };
  apartments.push(apartment);
}

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

// Функция клонирует элемент и заполняет данными из массива объектов
var renderPin = function(pin) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = pin.location.x + PIN_WIDTH / 2 + 'px';
  pinElement.style.top = pin.location.y + PIN_HEIGHT + 'px';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;
  return pinElement;
};

var fragment = document.createDocumentFragment();
for (var j = 0; j < apartments.length; j++) {
  fragment.appendChild(renderPin(apartments[j]));
}

var similarListElement = document.querySelector('.map__pins');
similarListElement.appendChild(fragment);

