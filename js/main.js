'use strict';

var TYPE = ['palace', 'flat', 'house', 'bungalo'];
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
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var mapWidth = document.querySelector('.map').clientWidth;

// Функция подбора случайного числа в заданном промежутке
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция возвращающая массив случайной длины
var getRandomLength = function (array) {
  array.length = getRandomNumber(1, array.length);
  return array;
};

// Функция для создания одного объекта
var getApartment = function(index) {
  var locationX = getRandomNumber(0, mapWidth);
  var locationY = getRandomNumber(130, 630);
  var apartment = {
    author: {
      avatar: 'img/avatars/user0' + (index + 1) + '.png'
    },

    offer: {
      title: TYPE[getRandomNumber(0, TYPE.length)],
      address: locationX + ', ' + locationY,
      price: PRICE[getRandomNumber(0, PRICE.length)],
      type: TYPE[getRandomNumber(0, TYPE.length)],
      rooms: getRandomNumber(1, 5),
      guests: getRandomNumber(1, 8),
      checkin: CHECK_IN[getRandomNumber(0, CHECK_IN.length)],
      checkout: CHECK_OUT[getRandomNumber(0, CHECK_OUT.length)],
      features: getRandomLength(FEATURES),
      description: 'someDescription',
      photos: getRandomLength(PHOTOS)
    },

    location: {
      x: locationX,
      y: locationY
    }
  };
  return apartment;
};

// Создаем массив из 8 объектов
var apartments = [];
for (var i = 0; i < apartmentsAmount; i++) {
  apartments.push(getApartment(i));
}
console.log(apartments);

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

// Функция клонирует элемент и заполняет данными из массива объектов
var renderPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = pin.location.x + PIN_WIDTH / 2 + 'px';
  pinElement.style.top = pin.location.y - PIN_HEIGHT + 'px';
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

