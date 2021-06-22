# Tween24.js

Tween24.js is animation library that enables fast coding using method chains.

![Example of Tween24](https://a24.github.io/tween24js/images/tween24-example.gif)

# Release notes
- v0.9.3
  - https://ics.media/entry/210622/
- v0.7.6
  - https://ics.media/entry/210409/

# Setup

## Script Install
```html
<script src="tween24.js"></script>
```

## NPM Install
```
$ npm install tween24
```

# Sample
- https://a24.github.io/tween24js/sample/index.html
- https://a24.github.io/tween24js/sample/timer.html
- https://a24.github.io/tween24js/sample/easing.html

```js
// Single Tween
Tween24.tween(target, 1).x(860).play();
```
```js
// Serial Tween (Play in order.)
Tween24.serial(
  Tween24.prop(".box").opacity(0),
  Tween24.tween("#box1", 1, Ease24._6_ExpoInOut).x(860).opacity(1),
  Tween24.tween("#box2", 1, Ease24._6_ExpoInOut).x(860).opacity(1),
  Tween24.tween("#box3", 1, Ease24._6_ExpoInOut).x(860).opacity(1)
).play();
```
```js
// Parallel Tween (Play at the same time.)
Tween24.parallel(
  Tween24.prop(".box").opacity(0),
  Tween24.tween("#box1", 1, Ease24._6_ExpoInOut).x(860).opacity(1),
  Tween24.tween("#box2", 1, Ease24._6_ExpoInOut).x(860).opacity(1),
  Tween24.tween("#box3", 1, Ease24._6_ExpoInOut).x(860).opacity(1)
).play();
```
```js
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
```
```js
// Loop Tween (Play repeatedly.)
Tween24.loop(10,
  Tween24.serial(
    Tween24.tween("#box", 1, Ease24._6_ExpoInOut).x(860).rotation(90),
    Tween24.tween("#box", 1, Ease24._6_ExpoInOut).x(0).rotation(0)
  )
).play();
```
```js
// Lag Tween (Delay multiple targets.)
Tween24.lag(0.1,
  Tween24.tween(".box", 1, Ease24._6_ExpoInOut).x(930)
).play();
```
```js
// Total Lag Tween (Set total delay time.)
Tween24.lagTotal(1,
  Tween24.tween(".box", 1, Ease24._6_ExpoInOut).x(930)
).play();
```
```js
// Sort Lag Tween (Change the order.)
Tween24.lagSort(0.1, Sort24._Shuffle,
    Tween24.tween(".box", 1, Ease24._6_ExpoInOut).x(930)
).play();
```
```js
// Ease Total Lag Tween (Ease the delay.)
Tween24.lagTotalEase(2, Ease24._6_ExpoOut,
    Tween24.tween(".box", 1, Ease24._2_QuadOut).x(930)
).play();
```
```js
// Sort & Ease Total Lag Tween
// (Change the order, and ease the delay.)
Tween24.lagTotalSortEase(2, Sort24._Reverse, Ease24._6_ExpoOut,
    Tween24.tween(".box", 1, Ease24._2_QuadOut).x(930)
).play();
```
```js
// Velocity Tween (Set speed instead of time.)
Tween24.tweenVelocity("#box2", 500).x(860).rotation(180).play();
```
```js
// Text Tween (Character-by-character animation.)
Tween24.serial(
  Tween24.propText("#text").y(-100).opacity(0).letterSpacing(10),
  Tween24.lagSort(0.06, Sort24._Shuffle,
    Tween24.tweenText("#text", 1, Ease24._6_ExpoOut).y(0).opacity(1)
  )
).play();
```
```js
// Set will-change (Optimize animation.)
Tween24.serial(
  Tween24.tween(".box", 1, Ease24._6_ExpoInOut).x(930)
).willChange().play();
```
```js
// Timer sample
var time = 5;
let timer = Tween24.serial(
  Tween24.prop(this, { time: this.time }),
  Tween24.tween(this, this.time, Ease24._Linear, { time: 0 }).onUpdate(update).onComplete(finish)
);
function update() {
  document.getElementById("timer").textContent = "Time: " + this.time.toFixed(1);
}
function finish() {
  document.getElementById("timer").textContent = "finish.";
}
```

# Property method
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
- width(...)
- height(...)
- top(...)
- right(...)
- bottom(...)
- left(...)
- color(...)
- backgroundColor(...)
- borderWidth(...)
- borderColor(...)
- borderRadius(...)
- opacity(...)
- alpha(...)
- delay(...)
- fps(...)
- debug()
- id(...)

### Add v0.9.3
- willChange()
- angle()
- letterSpacing()

# Tween & Action method
- Tween24.tween(...)
- Tween24.prop(...)
- Tween24.serial(...)
- Tween24.parallel(...)
- Tween24.wait(...)
- Tween24.func(...)

### Add v0.9.3
- Tween24.loop()
- Tween24.lag()
- Tween24.lagTotal()
- Tween24.lagSort()
- Tween24.lagTotalEase()
- Tween24.lagTotalSortEase()
- Tween24.tweenVelocity()
- Tween24.propText()
- Tween24.tweenText()
- Tween24.tweenTextVelocity()

# Control method
- tween.play();
- tween.pause();
- tween.stop();

# Callback
- tween.onPlay(...);
- tween.onInit(...);
- tween.onUpdate(...);
- tween.onPause(...);
- tween.onResume(...);
- tween.onStop(...);
- tween.onComplete(...);

# Easing
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

# Gobal setting
- Tween24.setDefaultEasing(...);
- Tween24.setFPS(...);