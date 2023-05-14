# Rhino

To use linq with Rhino it is necessary to modify the source code of linq.js to the conditions of Rhino:

* Rhino does not support variable declaration with `let` and `const`, therefore these must be replaced by `var`.
* Rhino does not support `export` declaration, therefore the line `export default Enumerable;` at the end must be deleted.
* Rhino has no console window, therefore it is recommended to replace the code sequences `if (typeof console !== Types.Undefined) { console.log(...); }` with `java.lang.System.out.println(...)`.

You can find a suitably modified version of linq.js as [linq.class.js](https://github.com/StSchnell/linq/blob/master/Rhino/linq.class.js) here. With the load command you can use it inside Rhino JavaScript.

A very detailed [example](https://github.com/StSchnell/linq/blob/master/Rhino/linq_class_test.js) is available here, this shows how to use it.

## Hints
* Rhino supports [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) since version 1.7.8. If an older version is used, only [regular functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function) can be used. 

```js
// Begin----------------------------------------------------------------

load("linq.class.js");

// Arrow function expression aka arrow function-------------------------
var Enumerable = LINQ();
var result = Enumerable.range(1, 10)
  .where((i) => i % 3 == 0)
  .select((i) => i * 10);

java.lang.System.out.println(
  JSON.stringify(result.toArray())
); // [30,60,90]

// Function expression aka regular function-----------------------------
var result = Enumerable.range(1, 10)
  .where( function(i) { return i % 3 == 0 } )
  .select( function(i) { return i * 10 } );

java.lang.System.out.println(
  JSON.stringify(result.toArray())
); // [30,60,90]

// End------------------------------------------------------------------
```

* linq supports only lambda syntax (dot notation) and not query expression.
