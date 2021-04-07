Tween24.js
=========
Tween24.js is animation library that enables fast coding using method chains.

Sample
--------------------------
- http://a24.github.io/tween24js/sample/index.html
- http://a24.github.io/tween24js/sample/timer.html
- http://a24.github.io/tween24js/sample/easing.html
```js
// Single Tween
Tween24.tween(target, 1).x(860).play();

// Serial Tween
Tween24.serial(
  Tween24.prop(".box").opacity(0),
  Tween24.tween("#box1", 1, Ease24._6_ExpoInOut).x(860).opacity(1),
  Tween24.tween("#box2", 1, Ease24._6_ExpoInOut).x(860).opacity(1),
  Tween24.tween("#box3", 1, Ease24._6_ExpoInOut).x(860).opacity(1)
).play();

// Parallel Tween
Tween24.parallel(
  Tween24.prop(".box").opacity(0),
  Tween24.tween("#box1", 1, Ease24._6_ExpoInOut).x(860).opacity(1),
  Tween24.tween("#box2", 1, Ease24._6_ExpoInOut).x(860).opacity(1),
  Tween24.tween("#box3", 1, Ease24._6_ExpoInOut).x(860).opacity(1)
).play();

// Serial & Parallel Tween
Tween24.serial(
  Tween24.parallel(
    Tween24.tween(".box", 2, Ease24._6_ExpoInOut).x(860),
    Tween24.serial(
      Tween24.tween(".box", 1, Ease24._3_CubicIn).scaleX(1.3).skewX(70),
      Tween24.tween(".box", 1, Ease24._3_CubicOut).scaleX(1).skewX(0)
    )
  ),
  Tween24.tween(".box", 1.5, Ease24._6_ExpoOut).x(0).rotation(180).borderRadius(50),
).play();

// Timer sample
var time = 5;
let timer = Tween24.serial(
  Tween24.prop(this, { time: this.time }),
  Tween24.tween(this, this.time, Ease24._Linear, { time: 0 }).onUpdate(this, update).onComplete(this, finish)
);
function update() {
  document.getElementById("timer").textContent = "Time: " + this.time.toFixed(1);
}
function finish() {
  document.getElementById("timer").textContent = "finish.";
}
```

Property method
--------------------------
- x(...)
- y(...)
- xy(...)
- scaleX(...)
- scaleY(...)
- scaleXY(...)
- scale(...)
- skewX(...)
- skewY(...)
- skewXY(...)
- skew(...)
- rotation(...)
- top(...)
- right(...)
- bottom(...)
- left(...)
- color(...)
- backgroundColor(...)
- borderRadius()
- opacity(...)
- alpha(...)
- delay(...)
- fps(...)
- debug()
- id(...)

Tween & Action method
--------------------------
- Tween24.tween(...)
- Tween24.prop(...)
- Tween24.serial(...)
- Tween24.parallel(...)
- Tween24.wait(...)
- Tween24.func(...)

Control method
--------------------------
- tween.play();
- tween.pause();
- tween.stop();

Callback
--------------------------
- tween.onPlay(...);
- tween.onInit(...);
- tween.onUpdate(...);
- tween.onPause(...);
- tween.onResume(...);
- tween.onStop(...);
- tween.onComplete(...);

Easing
--------------------------
- Ease24._Linear
- Ease24._1_Sine...
- Ease24._2_Quad...
- Ease24._3_Cubic...
- Ease24._4_Quart...
- Ease24._5_Quint...
- Ease24._6_Expo...
- Ease24._7_Circ...
- Ease24._Bounce...
- Ease24._Back...
- Ease24._Back...With
- Ease24._Elastic...
- Ease24._Elastic...With
- Ease24._Blend

Gobal setting
--------------------------
- Tween24.setDefaultEasing(...);
- Tween24.setFPS(...);