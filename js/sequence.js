/**
 * @이름: Sequence.js
 * @설명: 시퀀스 이미지 재생/정지 라이브러리
 * @작성자: 정명학
 * https://github.com/hagi4u/ui.sequenceImages.git
 * Copyright 2016 Jeong Myoung Hak
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */
function Sequence(param) {
  this.width = param.width;
  this.height = param.height;

  this.scene = param.scene;
  this.speed = param.speed;

  this.selector = param.selector;

  this.count = 0;
  this.object = '';

  this.isReplay = param.isReplay;
};

Sequence.prototype.procedure = function() {
  var position = -1 * (this.count * this.width);

  this.selector.style.backgroundPosition = position + 'px 0px';
  this.count++;

  if (this.count === this.scene) {
    position = -1 * (this.count * this.width);
    this.count = 0;
  }
};

Sequence.prototype.play = function(type, callback) {
  // @설명: setInterval 에도 this를 주기 위하여 현재의 this 를 저장
  var _this = this;

  this.object = setInterval(function() {
    // @설명: 한번만 재생
    if (type === "once" && _this.count === _this.scene - 1) {
      _this.stop('pause');

      // @설명: 콜백함수 실행
      if (typeof callback === "function") {
        callback();
        return true;
      }
    }
    _this.procedure();
  }, this.speed);
};

Sequence.prototype.stop = function(type, callback) {
  clearInterval(this.object);

  // @설명: 일시 중지인 경우 clearInterval 만 진행
  if (type === "pause")
    return true;

  this.count = 0;
  this.procedure();

  if (typeof callback === "function") {
    callback();
    return true;
  }
};
