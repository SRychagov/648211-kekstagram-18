'use strict';

(function () {
  window.load = function (onSuccess, onError) {
    // console.log('Создаем объект xhr');
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        // console.log('Данные получили, отправляем в onSucsess');
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

    xhr.open('GET', 'https://js.dump.academy/kekstagram/data');
    xhr.send();
    // console.log('Отправили запрос на сервер');
  };
})();


