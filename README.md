# linq

This is a JavaScript implementation of the .NET [LINQ](https://msdn.microsoft.com/en-us/library/bb308959.aspx) library.<br>
It contains all the original .NET methods plus a few additions and it is written in pure JavaScript with no dependencies.<br>
This is a fork with the addition to use linq with the [Rhino JavaScript engine](https://github.com/StSchnell/linq/blob/master/README.md#rhino).

## Examples

```js
// C# LINQ - delegate
Enumerable.Range(1, 10)
    .Where(delegate(int i) { return i % 3 == 0; })
    .Select(delegate(int i) { return i * 10; });

// linq.js - anonymous function
Enumerable.range(1, 10)
    .where(function(i) { return i % 3 == 0; })
    .select(function(i) { return i * 10; });
```

```js
// C# LINQ - lambda
Enumerable.Range(1, 10).Where((i) => i % 3 == 0).Select((i) => i * 10);

// linq.js - arrow function
Enumerable.range(1, 10).where((i) => i % 3 == 0).select((i) => i * 10);
```

```js
// C# LINQ - anonymous type
array.Select((val, i) => new { Value: val, Index: i }());

// linq.js - object literal
Enumerable.from(array).select((val, i) => ({ value: val, index: i }));
```

See [sample/tutorial.js](https://github.com/mihaifm/linq/blob/master/sample/tutorial.js) and the [test](https://github.com/mihaifm/linq/tree/master/test) folder for more examples.

# Usage

## Rhino

This engine is programmed in Java and generates a class from the compiled JavaScript code. It was bundled with Java SE 6 and used as a programming interface in some business products. [Rhino](https://github.com/mozilla/rhino/) can be used with Java 8 and above and is mostly compatible with the ECMAScript 5 standard. To use linq with Rhino, download the latest linq release and [modify it as it is described here](https://github.com/StSchnell/linq/blob/master/Rhino/README.md). 

After these preparations you can load it in your code with `load` command and use it:

```js
load("linq.class.js");
var result = Enumerable.range(1, 10)
  .where( function(i) { return i % 3 == 0 } )
  .select( function(i) { return i * 10 } );
java.lang.System.out.println(
  JSON.stringify(result.toArray())
); // [ 30, 60, 90 ]
```

## [Node.js (ES modules)](https://github.com/mihaifm/linq#nodejs-es-modules)

## [Node.js (CommonJS modules)](https://github.com/mihaifm/linq#nodejs-commonjs-modules)

## [TypeScript](https://github.com/mihaifm/linq#typescript)

## [Deno](https://github.com/mihaifm/linq#deno)

## [Browser](https://github.com/mihaifm/linq#browser)

# Credits

[Yoshifumi Kawai](https://github.com/neuecc) developed the [original version](https://github.com/neuecc/linq.js/) of this library.

# License

[MIT License](https://github.com/mihaifm/linq/blob/master/LICENSE)
