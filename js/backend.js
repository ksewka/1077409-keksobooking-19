'use strict';

(function () {
  var urlGet = 'https://js.dump.academy/keksobooking/data';
  var urlPost = 'https://js.dump.academy/keksobooking';
  var TIMEOUT_IN_MS = 10000;
  var makeRequest = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT_IN_MS;
    return xhr;
  };

  var download = function (onLoad, onError) {
    var request = makeRequest(onLoad, onError);
    request.open('GET', urlGet);
    request.send();
  };

  var upload = function (data, onLoad, onError) {
    var request = makeRequest(onLoad, onError);
    request.open('POST', urlPost);
    request.send(data);
  };

  window.backend = {
    download: download,
    upload: upload,
  };

})();
