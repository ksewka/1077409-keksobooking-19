'use strict';

(function () {
  var popupTemplate = document.querySelector('#card')
    .content
    .querySelector('.popup');


  // Функция копирует img и свойству src присваивает значение элементов сгенерированного массива
  var getPhotoPopup = function (photoArray) {
    var photoPopup = popupTemplate.querySelector('.popup__photo');
    var fragmentOfPhoto = document.createDocumentFragment();
    for (var k = 0; k < photoArray.length; k++) {
      var clonedPhoto = photoPopup.cloneNode(true);
      clonedPhoto.src = photoArray[k];
      fragmentOfPhoto.appendChild(clonedPhoto);
    }
    return fragmentOfPhoto;
  };

  // Функция генерирует features
  var getFeaturePopup = function (featuresArray) {
    var features = popupTemplate.querySelectorAll('.popup__feature');
    var fragmentOfFeatures = document.createDocumentFragment();
    var clonedOfFeatures = [];
    for (var h = 0; h < featuresArray.length; h++) {
      clonedOfFeatures[h] = features[h].cloneNode(true);
      fragmentOfFeatures.appendChild(clonedOfFeatures[h]);
    }
    return fragmentOfFeatures;
  };

  // Заполняем карточку элемента данными из объекта
  var createCard = function (apartment) {
    var cloneCard = popupTemplate.cloneNode(true);
    cloneCard.querySelector('.popup__title').textContent = apartment.offer.title;
    cloneCard.querySelector('.popup__text--address').textContent = apartment.offer.address;
    cloneCard.querySelector('.popup__text--price').textContent = apartment.offer.price + '₽/ночь';
    cloneCard.querySelector('.popup__type').textContent = window.data.types[apartment.offer.type];
    cloneCard.querySelector('.popup__text--capacity').textContent = apartment.offer.rooms + ' комнаты для ' + window.data.apartment(1).offer.guests + ' гостей';
    cloneCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + apartment.offer.checkin + ', выезд до ' + window.data.apartment(1).offer.checkout;
    cloneCard.querySelector('.popup__features').innerHTML = '';
    cloneCard.querySelector('.popup__features').appendChild(getFeaturePopup(apartment.offer.features));
    cloneCard.querySelector('.popup__description').textContent = apartment.offer.description;
    cloneCard.querySelector('.popup__photos').innerHTML = '';
    cloneCard.querySelector('.popup__photos').appendChild(getPhotoPopup(apartment.offer.photos));
    cloneCard.querySelector('.popup__avatar').src = apartment.author.avatar;
    return cloneCard;
  };

  window.card = {
    createdCard: createCard,
  };
})();
