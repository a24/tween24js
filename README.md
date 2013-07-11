tween24.js
=========

Tween24 for JavaScript.

**lastest version:** 0.2.0

Property method
--------------------------
- x()
- y()
- xy()
- alpha()
- delay()

Tween method
--------------------------
- tween()
- prop()
- serial()
- parallel()
- wait()
- func()

Sample
--------------------------
```js
// Single Tween
Tween24.tween(target, 1, Ease24._6_ExpoInOut).xy(400, 400).alpha(0.5).delay(1).play();

// Serial Tween
Tween24.serial(
    Tween24.tween(target, 1, Ease24._6_ExpoInOut).x(400),
    Tween24.tween(target, 1, Ease24._6_ExpoInOut).y(400),
    Tween24.tween(target, 1, Ease24._6_ExpoInOut).x(0),
    Tween24.tween(target, 1, Ease24._6_ExpoInOut).y(0)
).play();

// Parallel Tween
Tween24.parallel(
    Tween24.tween(target, 1, Ease24._6_ExpoInOut).x(400),
    Tween24.tween(target, 1, Ease24._3_CubicOutIn()).y(400)
).play();

// Wait & Func
Tween24.serial(
    Tween24.wait(1),
    Tween24.func(window, window.alert, "Tween24 for JavaScript!!")
).play();
```
