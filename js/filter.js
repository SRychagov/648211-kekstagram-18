'use strict';

(function () {
  var BUTTON_CLASS = 'img-filters__button';

  var pictures = [];

  var getRandomPictures = function () {
    var res = [];
    var tempPics = pictures.slice();
    for (var i = 0; i < 10; i++) {
      var randomIndex = window.util.getRandom(0, tempPics.length - 1);
      var splicedItem = tempPics.splice(randomIndex, 1);
      res.push(splicedItem[0]);
    }
    return res;
  };

  var getDiscussedPictures = function () {
    var tempPics = pictures.slice();
    tempPics.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    return tempPics;
  };

  var getFilteredPictures = function (filterType) {
    switch (filterType) {
      case 'filter-popular': return pictures;
      case 'filter-random': return getRandomPictures();
      case 'filter-discussed' : return getDiscussedPictures();
      default: return [];
    }
  };

  var filtersFormElement = document.querySelector('.img-filters__form');

  filtersFormElement.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.classList.contains(BUTTON_CLASS)) {
      var activeButtonElement = filtersFormElement.querySelector('.' + BUTTON_CLASS + '--active');
      activeButtonElement.classList.remove(BUTTON_CLASS + '--active');
      target.classList.add(BUTTON_CLASS + '--active');
      debouncedAction(target.id);
    }
  });

  var debouncedAction = window.util.debounce(function (id) {
    var filteredPictures = getFilteredPictures(id);
    window.renderPictures(filteredPictures);
  });

  var showFilters = function (pics) {
    pictures = pics;
    var imgFilterElement = document.querySelector('.img-filters');
    imgFilterElement.classList.remove('img-filters--inactive');
  };

  window.showFilters = showFilters;
})();
