# Rhino

To use linq with Rhino it is necessary to modify the source code of linq.js to the conditions of Rhino:

* Rhino does not support variable declaration with `let` and `const`, therefore these must be replaced by `var`.
* Rhino does not support `export` declaration, therefore the line `export default Enumerable;` at the end must be deleted.
* Rhino has no console window, therefore it is recommended to replace the code sequences `if (typeof console !== Types.Undefined) { console.log(...); }` with `java.lang.System.out.println(...)`.

You can find a suitably modified version of linq.js as [linq.class.js](https://github.com/StSchnell/linq/blob/master/Rhino/linq.class.js) here. With the load command you can use it inside Rhino JavaScript. An [example](https://github.com/StSchnell/linq/blob/master/Rhino/linq_class_test.js) is available here, this shows how it works.

**Hint:** Rhino supports arrow functions since version 1.7.8. 

**Hint:** linq supports only lambda syntax (dot notation) and not query expression.
