'use strict';

(function () {
  var mapWidth = document.querySelector('.map').clientWidth;
  var PRICES = [2000, 2500, 3000, 3500];
  var types = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  var CHECK_IN = ['12:00', '13:00', '14:00'];
  var CHECK_OUT = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer, elevator', 'conditioner'];
  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  var apartmentsAmount = 8;

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

  window.data = {
    apartment: getApartment,
    apartments: apartments,
    types: types,
  };
})();
