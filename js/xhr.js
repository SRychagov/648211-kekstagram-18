'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram';

  var getXHR = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 5000;
    return xhr;
  };

  window.load = function (onSuccess, onError) {
    var xhr = getXHR(onSuccess, onError);
    xhr.open('GET', URL + '/data');
    xhr.send();
  };
  window.upload = function (formData, onSuccess, onError) {
    var xhr = getXHR(onSuccess, onError);
    xhr.open('POST', URL);
    xhr.send(formData);
  };
})();


