---
{
  "title": "JS prototype chain - object, function, class",
  "draft": false,
  "created_at": "2020-10-20",
  "category": "Frontend",
  "tags": ["JavaScript", "OOD"],
  "description": "How can prototype chain connect object, function and class in JS"
}
---

## 1. Prototype chain in JS

Every regular function (not arrow function) is a class constructor. Every function has a property called `prototype`. Calling a function with the `new` operator returns an object that is an instance of the function. Every instance created by `new function()` has a property called `__proto__`, which points to function's `prototype`.

When we access a property of an instance, JS will try to find it in the instance. If it doesn't exist in the instance, JS will try to find it in `instance.__proto__`, if it still doesn't exist in `instance.__proto__`, JS will look up `instance.__proto__.__proto__` until `__proto__` field is null. A plain object's `__proto__` field is null.

Let's have a look on how prototype chain works in class.

```javascript
class Parent{
  static s = 0;
  constructor(v){
    this.v = v;
  }
  f(){
    consol.log(this.v);
  }
}

class Child extends Parent{
  constructor(v, w){
    super(v);
    this.w = w;
  }
  fc(){
    console.log(this.w)
  }
}
```

The class property should be initialized within the class instance. The class method is initialized within the class's prototype.

## 2. _\_proto\_\_,  [[Prototype]] and someFunction.prototype


* Following the ECMAScript standard, the notation `someObject.[[Prototype]]` is used to designate the prototype of `someObject`. The `[[Prototype]]` internal slot can be accessed and modified with the `Object.getPrototypeOf()` and `Object.setPrototypeOf()` functions respectively.  
  This is equivalent to the JavaScript accessor `__proto__` which is non-standard but de-facto implemented by many JavaScript engines.
* `someFunction.prototype` is a property of functions, which instead specifies the `[[Prototype]]` to be assigned to all *instances* of objects created by the given function when used as a constructor.

## 3. Classes are syntax sugar over constructor functions

Let's see an example first

```javascript
class Box {
  constructor(value){
    this.value = value;
  }
  getValue(){
    return this.value;
  }
}
```

Actually, it can be written in another way

```javascript
function Box(value){
  this.value = value;
}

Box.prototype.getValue = function(){
  return this.value;
}
```