'use strict';

(function () {
  var MESSAGE_COMMENTS = [
    'В целом всё неплохо. Но не всё',
    'Всё отлично !',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у нее получилась фотография лучше',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный комент ?!'
  ];
  var NAMES = ['Артем', 'Николай', 'Юля', 'Анастасия', 'Данила', 'Александр'];

  // <--  Функция получения массива фотографий  -->
  var getPhoto = function (n) {
    var result = [];
    for (var i = 0; i < n; i++) {
      result.push(createPhoto(i + 1));
    }
    return result;
  };

  // <--  Функция создания объекта-фотографии  -->
  var createPhoto = function (index) {
    return {
      url: 'photos/' + index + '.jpg',
      description: 'Описание фотографии',
      likes: getRandom(15, 200),
      comments: getComments(),
    };
  };

  // <--  Функция получения массива случайного количества комментариев от 1 до 6  -->
  var getComments = function () {
    var commentsCount = getRandom(1, 6);
    var commentsArr = [];
    for (var i = 0; i < commentsCount; i++) {
      commentsArr.push(createComment());
    }
    return commentsArr;
  };

  // <--  Функция получения комментатора  -->
  var createComment = function () {
    return {
      avatar: 'img/avatar-' + getRandom(1, 6) + '.svg',
      message: getMessage(),
      name: getRandomItem(NAMES),
    };
  };

  // <--  Функция получения случайного элемента из массива  -->
  var getRandomItem = function (arr) {
    return arr[getRandom(0, arr.length - 1)];
  };

  // <--  Функция получения случайного значения  -->
  var getRandom = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // <--  Функция получения 1 или 2 случайных комментариев из массива  -->
  var getMessage = function () {
    var sentenceCount = getRandom(1, 2);
    var message = [];
    for (var i = 0; i < sentenceCount; i++) {
      message.push(getRandomItem(MESSAGE_COMMENTS));
    }
    return message.join(' ');
  };
  window.getPhoto = getPhoto;
})();
