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
var STEP = 25;
var MIN_VALUE = 25;
var MAX_VALUE = 100;
var ESC_KEYCODE = 27;
var EFFECT_NAME = 'none';
var IS_IN_FOCUS = false;

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var pictureContainer = document.querySelector('.pictures');
var bigPictureElement = document.querySelector('.big-picture');
var pictureCancelElement = bigPictureElement.querySelector('.big-picture__cancel');

pictureCancelElement.addEventListener('click', function () {
  bigPictureElement.classList.add('hidden');
});

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

// <--  Функция создания каждого комментария  -->
var getCommentElement = function (comment) {
  var liElement = document.createElement('li');
  liElement.classList.add('social__comment');
  var pElement = document.createElement('p');
  pElement.classList.add('social__text');
  pElement.textContent = comment.message;
  var imgElement = document.createElement('img');
  imgElement.classList.add('social__picture');
  imgElement.src = comment.avatar;
  imgElement.alt = comment.name;
  imgElement.width = 35;
  imgElement.height = 35;
  liElement.appendChild(imgElement);
  liElement.appendChild(pElement);

  return liElement;
};

// <--  Функция формирования всех комментариев  -->
var getCommentsFragment = function (comments) {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < comments.length; j++) {
    fragment.appendChild(getCommentElement(comments[j]));
  }
  return fragment;
};

var picturesFragment = document.createDocumentFragment();
var pictures = getPhoto(25);
for (var i = 0; i < pictures.length; i++) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.setAttribute('data-id', i);

  pictureElement.querySelector('.picture__img').src = pictures[i].url;
  pictureElement.querySelector('.picture__img').setAttribute('data-id', i);
  pictureElement.querySelector('.picture__likes').textContent = pictures[i].likes;
  pictureElement.querySelector('.picture__comments').textContent = pictures[i].comments.length;
  pictureElement.querySelector('.picture__info').textContent = pictures[i].description;

  picturesFragment.appendChild(pictureElement);
}
pictureContainer.appendChild(picturesFragment);

// <--  -->
pictureContainer.addEventListener('click', function (evt) {
  var target = evt.target;
  if (target.classList.contains('picture__img') || target.classList.contains('picture')) {
    var photoID = target.getAttribute('data-id');
    showBigPicture(pictures[photoID]);
  }
});

// <-- Функция заполнения большого фото данными  -->
var showBigPicture = function (photo) {

  bigPictureElement.querySelector('.big-picture__img img').src = photo.url;
  bigPictureElement.querySelector('.likes-count').textContent = photo.likes;
  bigPictureElement.querySelector('.comments-count').textContent = photo.comments.length; // ?
  bigPictureElement.querySelector('.social__comments').innerHTML = ''; // ?
  bigPictureElement.querySelector('.social__comments').appendChild(getCommentsFragment(photo.comments));
  bigPictureElement.querySelector('.social__caption').textContent = photo.description;
  bigPictureElement.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPictureElement.querySelector('.comments-loader').classList.add('visually-hidden');

  bigPictureElement.classList.remove('hidden');
  document.addEventListener('keydown', onBigPictureEscPress);
};

// <-- Функция закрытия окна с фотографией по кнопке esc  -->
var onBigPictureEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    bigPictureElement.classList.add('hidden');
    document.removeEventListener('keydown', onBigPictureEscPress);
  }
};

var uploadFileElement = document.querySelector('#upload-file');
var buttonCloseElement = document.querySelector('#upload-cancel');
var imageOverlayElement = document.querySelector('.img-upload__overlay');

uploadFileElement.addEventListener('change', function () {
  imageOverlayElement.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
});

// <-- Функция закрытия окна по esc или потери фокуса у поля с тегами  -->
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && !IS_IN_FOCUS) {
    closePopup();
  }
};

// <-- Функция закрытия окна с фотографией -->
var closePopup = function () {
  imageOverlayElement.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

buttonCloseElement.addEventListener('click', function () {
  closePopup();
});

var buttonSmallerElement = document.querySelector('.scale__control--smaller');
var buttonBiggerElement = document.querySelector('.scale__control--bigger');
var inputValueElement = document.querySelector('.scale__control--value');
var imgUploadElement = document.querySelector('.img-upload__preview img');

// <-- Функция изменения масштаба фотографии  -->
var transformSizeImage = function (scale) {
  imgUploadElement.style.transform = 'scale(' + scale / 100 + ')';
};

buttonSmallerElement.addEventListener('click', function () {
  buttonClick(-1);
});

buttonBiggerElement.addEventListener('click', function () {
  buttonClick(1);
});

// <-- Функция получения будущего значения размера фотографии  -->
var buttonClick = function (vector) {
  var inputValue = parseInt(inputValueElement.value, 10);
  var futureValue = inputValue + STEP * vector;

  if (futureValue >= MIN_VALUE && futureValue <= MAX_VALUE) {
    inputValueElement.value = futureValue + '%';
    transformSizeImage(futureValue);
  }
};

var imgUploadPinElement = document.querySelector('.img-upload__effect-level');
var imgUploadEffectsElement = document.querySelector('.img-upload__effects');
var effectLevelValueElement = document.querySelector('.effect-level__value');
var effectLevelValue = effectLevelValueElement.value;

imgUploadEffectsElement.addEventListener('change', function (evt) {
  var effect = evt.target.value;
  if (effect === 'none') {
    imgUploadPinElement.classList.add('hidden');
  } else {
    imgUploadPinElement.classList.remove('hidden');
  }

  EFFECT_NAME = effect;
  imgUploadElement.className = '';
  imgUploadElement.style = '';
  imgUploadElement.classList.add('effects__preview--' + effect);
});

var effectPinElement = document.querySelector('.effect-level__pin');
effectPinElement.addEventListener('mouseup', function () {
  if (EFFECT_NAME !== 'none') {
    imgUploadElement.style.filter = getFilterStyle(EFFECT_NAME, effectLevelValue);
  }
});

// <--  Функция выбора эффекта  -->
var getFilterStyle = function (name, level) {
  switch (name) {
    case 'chrome': return 'grayscale(' + level / 100 + ')';
    case 'sepia': return 'sepia(' + level / 100 + ')';
    case 'marvin': return 'invert(' + level + '%)';
    case 'phobos': return 'blur(' + level / 100 * 3 + 'px)';
    case 'heat': return 'brightness(' + (level / 100 * 2 + 1) + ')';
    default: return '';
  }
};

var hastagsElement = document.querySelector('.text__hashtags');
var textDescriptionElement = document.querySelector('.text__description');

hastagsElement.addEventListener('focus', function () {
  IS_IN_FOCUS = true;
});

hastagsElement.addEventListener('blur', function () {
  IS_IN_FOCUS = false;
});

textDescriptionElement.addEventListener('focus', function () {
  IS_IN_FOCUS = true;
});

textDescriptionElement.addEventListener('blur', function () {
  IS_IN_FOCUS = false;
});

hastagsElement.addEventListener('input', function (evt) {
  var value = evt.target.value;
  evt.target.setCustomValidity(getValidationMessage(value));
});

// <--  Функция проверки каждого тега на валидность  -->
var getValidationMessage = function (value) {
  if (value === '') {
    return '';
  }
  var hashtags = value.toLowerCase().split(' ');
  var validTags = [];
  for (var j = 0; j < hashtags.length; j++) {
    var message = getValidationTag(hashtags[j]);
    if (message === '') {
      if (validTags.indexOf(hashtags[j]) > -1) {
        return 'хэш-тег повторяется';
      }
      if (validTags.length >= 5) {
        return 'нельзя писать больше пять хэш-тегов';
      }
      validTags.push(hashtags[j]);
    } else {
      return message;
    }
  }
  return '';
};

// <--  Функция проверки одного тега на валидность  -->
var getValidationTag = function (tag) {
  if (tag[0] !== '#') {
    return 'хэш-тег должен начинаться с #';
  }
  if (tag === '#') {
    return 'хэш-тег не может состоять только из одной решётки';
  }
  if (tag.length > 20) {
    return 'максимальная длинна хэш-тега 20 символов, включая решётку';
  }
  return '';
};
