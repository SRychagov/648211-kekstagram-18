'use strict';

var MESSAGE_COMMENTS = [
  'В целом всё неплохо. Но не всё',
  'Всё отлично !',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у нее получилась фотография лучше',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный комент ?!'
];
var NAMES = ['Артем', 'Николай', 'Юля', 'Анастасия', 'Данила', 'Александр'];

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var pictureContainer = document.querySelector('.pictures');

var getPhoto = function (n) {
  var result = [];
  for (var i = 0; i < n; i++) {
    result.push(createPhoto(i + 1));
  }
  return result;
};

var createPhoto = function (index) {
  return {
    url: 'photos/' + index + '.jpg',
    description: 'Описание фотографии',
    likes: getRandom(15, 200),
    comments: getComments(),
  };
};

var getComments = function () {
  var commentsCount = getRandom(1, 6);
  var commentsArr = [];
  for (var i = 0; i < commentsCount; i++) {
    commentsArr.push(createComment());
  }
  return commentsArr;
};

var createComment = function () {
  return {
    avatar: 'img/' + getRandom(1, 6) + '.svg',
    message: getMessage(),
    name: getRandomItem(NAMES),
  };
};

var getRandomItem = function (arr) {
  return arr[getRandom(0, arr.length - 1)];
};

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getMessage = function () {
  var sentenceCount = getRandom(1, 2);
  var message = [];
  for (var i = 0; i < sentenceCount; i++) {
    message.push(getRandomItem(MESSAGE_COMMENTS));
  }
  return message.join(' ');
};

var picturesFragment = document.createDocumentFragment();

var pictures = getPhoto(25);
for (var i = 0; i < pictures.length; i++) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = pictures[i].url;
  pictureElement.querySelector('.picture__likes').textContent = pictures[i].likes;
  pictureElement.querySelector('.picture__comments').textContent = pictures[i].comments.length;
  pictureElement.querySelector('.picture__info').textContent = pictures[i].description;

  picturesFragment.appendChild(pictureElement);
}
pictureContainer.appendChild(picturesFragment);
