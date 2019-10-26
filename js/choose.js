'use strict';

(function () {
  window.choose = function (onReadFile) {
    var fileElement = document.querySelector('#upload-file');

    fileElement.addEventListener('change', function (evt) {
      var file = evt.target.files[0];
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        onReadFile(reader.result);
      });
      reader.readAsDataURL(file);
    });
  };
})();

