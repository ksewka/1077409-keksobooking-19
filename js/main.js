'use strict';

var types = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var PRICES = [2000, 2500, 3000, 3500];
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
  var copyArray = array.slice();
  copyArray.length = getRandomNumber(1, array.length);
  return copyArray;
};

// Функция для создания одного объекта
var getApartment = function (index) {
  var locationX = getRandomNumber(0, mapWidth);
  var locationY = getRandomNumber(130, 630);
  var apartment = {
    author: {
      avatar: 'img/avatars/user0' + (index + 1) + '.png'
    },

    offer: {
      title: 'Предложение №' + (index + 1),
      address: locationX + ', ' + locationY,
      price: PRICES[getRandomNumber(0, PRICES.length - 1)],
      type: Object.keys(types)[getRandomNumber(0, Object.keys(types).length - 1)],
      rooms: getRandomNumber(1, 5),
      guests: getRandomNumber(1, 8),
      checkin: CHECK_IN[getRandomNumber(0, CHECK_IN.length - 1)],
      checkout: CHECK_OUT[getRandomNumber(0, CHECK_OUT.length - 1)],
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

var popupTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

// Функция копирует img и свойству src присваивает значение элементов сгенерированного массива
var getPhotoPopup = function (photoArray) {
  var photoPopup = popupTemplate.querySelector('.popup__photo');
  var fragmentOfPhoto = document.createDocumentFragment();
  for (var k = 0; k < photoArray.length; k++) {
    var clonedPhoto = photoPopup.cloneNode(true);
    photoPopup.remove();
    clonedPhoto.src = photoArray[k];
    fragmentOfPhoto.appendChild(clonedPhoto);
  }
  return fragmentOfPhoto;
};

// Заполняем карточку элемента данными из объекта
var setCard = function (apartment) {
  popupTemplate.querySelector('.popup__title').textContent = apartment.offer.title;
  popupTemplate.querySelector('.popup__text--address').textContent = apartment.offer.address;
  popupTemplate.querySelector('.popup__text--price').textContent = apartment.offer.price + '₽/ночь';
  popupTemplate.querySelector('.popup__type').textContent = types[apartment.offer.type];
  popupTemplate.querySelector('.popup__text--capacity').textContent = apartment.offer.rooms + ' комнаты для ' + getApartment(1).offer.guests + ' гостей';
  popupTemplate.querySelector('.popup__text--time').textContent = 'Заезд после ' + apartment.offer.checkin + ', выезд до ' + getApartment(1).offer.checkout;
  popupTemplate.querySelector('.popup__features').textContent = apartment.offer.features;
  popupTemplate.querySelector('.popup__description').textContent = apartment.offer.description;
  popupTemplate.querySelector('.popup__photos').appendChild(getPhotoPopup(apartment.offer.photos));
  popupTemplate.querySelector('.popup__avatar').src = apartment.author.avatar;
  return popupTemplate;
};

// Вставляем в заполненную карточку перед блоком  '.map__filters-container'
var fragmentOfCard = document.createDocumentFragment();
var filtersContainer = document.querySelector('.map__filters-container');
fragmentOfCard.appendChild(setCard(apartments[0]));
filtersContainer.before(fragmentOfCard);
