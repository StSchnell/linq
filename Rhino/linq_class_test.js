
var System = {
  log : function(outText) {
    java.lang.System.out.println(outText);
  }
}

load("linq.class.js");

/* Begin----------------------------------------------------------------
 *
 * Checked with Rhino JavaScript engine releases 1.7.15, 1.7.14
 * and 1.7.R4
 */

var Enumerable = LINQ();

// Main-----------------------------------------------------------------
var data = [
  { id: 1, name: "one", category: 'fruits', countries: ["Italy", "Austria"] },
  { id: 2, name: "two", category: 'vegetables', countries: ["Italy", "Germany"] },
  { id: 3, name: "three", category: 'vegetables', countries: ["Germany"] },
  { id: 4, name: "four", category: 'fruits', countries: ["Japan"] },
  { id: 5, name: "five", category: 'fruits', countries: ["Japan", "Italy"] }
];

var enumerable = Enumerable.from(data);

var result;

/* Get count of elements------------------------------------------------
 *
 * length is equivalent to count
 */
System.log('# Get count of elements');

result = enumerable.count();
// result = data.length;

/*
result => 5
*/

System.log(result);
System.log('\n');


// Get single element (or null) on list with singleOrDefault------------
System.log('# Get single element (or null) on list with singleOrDefault');

result = enumerable.singleOrDefault( function(item) {
  return item.name == "one";
});

/*
result => { id: 1, name: "one", ... };
*/

System.log(result.id + ", " + result.name + ", " + result.category +
  ", " + result.countries);
System.log('\n');


/* Projection on one or more properties with select---------------------
 *
 * map is equivalent to select
 */
System.log('# Projection on one or more properties with select');

result = enumerable.select( function(item) {
  return item.id;
}).toArray();
// result = data.map( function(item) {
//   return item.id;
// });

/*
result => [1, 2, 3, 4, 5];
*/

System.log(result.toString());
System.log('\n');


/* Filter elements with where-------------------------------------------
 *
 * filter is equivalent to select
 */
System.log('# Filter elements with where');

result = enumerable.where( function(item) {
  return item.name == 'two';
}).toArray();
// result = data.filter( function(item) {
//   return item.name == 'two';
// });

/*
result => [{ id: 2, name: "two", ... }];
*/

System.log(JSON.stringify(result));
System.log('\n');


// Make a groupBy on each group-----------------------------------------
System.log('# Make a groupBy on each group');

result = enumerable.groupBy( function(item) {
  return item.category;
}).toArray();

/*
result => [
  {"id": 1, "name": "one", ...},
  {"id": 4, "name": "four", ...},
  {"id": 5, "name": "five", ...}
], [
  {"id": 2, "name": "two", ...},
  {"id": 3, "name": "three", ...}
];
*/

for (var i = 0; i < result.length; i++) {
  System.log(JSON.stringify(result[i].toArray()));
}
System.log('\n');


// Merge two arrays with concat-----------------------------------------
System.log('# Merge two arrays with concat');

var otherData = [
  { id: 7, name: "seven", category: 'vegetables' }, 
  { id: 8, name: "eight", category: 'fruit' }
];

result = enumerable.concat(otherData).toArray();

/*
result => [
	{ id: 1, name: "one", ... },
	{ id: 2, name: "two", ... },
	{ id: 3, name: "three", ... },
	{ id: 4, name: "four", ... },
	{ id: 5, name: "five", ... }, 
	{ id: 7, name: "seven", ... }, 
	{ id: 8, name: "eight", ... }
];
*/

for (var i = 0; i < result.length; i++) {
  System.log(JSON.stringify(result[i]));
}
System.log('\n');


// Get distinct elements without repetitions----------------------------
System.log('# Get distinct elements without repetitions');

var extraData = ["A", "D", "B", "C", "B", "A", "D", "C", "D"];

result = Enumerable.from(extraData).distinct().toArray();

/*
result => ["A", "B", "C", "D"];
*/

for (var i = 0; i < result.length; i++) {
  System.log(result[i]);
}
System.log('\n');


/* Sort ascending using orderBy-----------------------------------------
 *
 * orderBy is equivalent to sort with >
 */
System.log('# Sort ascending using orderBy');

result = enumerable.orderBy( function(item) {
  return item.name;
}).toArray();
// result = data.sort( function (item1, item2) {
//  return  item1.name > item2.name ? 1 : -1;
// });

/*
result => [
	{ id: 5, name: "five", ... },
	{ id: 4, name: "four", ... },
	{ id: 1, name: "one", ... },
	{ id: 3, name: "three", ... },
	{ id: 2, name: "two", ... }
];
*/

for (var i = 0; i < result.length; i++) {
  System.log(result[i].id + ", " + result[i].name +
    ", " + result[i].category + ", " + result[i].countries);
}
System.log('\n');


/* Sort descending using orderByDescending------------------------------
 *
 * orderByDescending is equivalent to sort with <
 */
System.log('# Sort descending using orderByDescending');

result = enumerable.orderByDescending( function(item) {
  return item.name;
}).toArray();
// result = data.sort( function (item1, item2) {
//   return  item1.name < item2.name ? 1 : -1;
// });

/*
result => [
	{ id: 2, name: "two", ... },
	{ id: 3, name: "three", ... },
	{ id: 1, name: "one", ... },
	{ id: 4, name: "four", ... },
	{ id: 5, name: "five", ... }
];
*/

for (var i = 0; i < result.length; i++) {
  System.log(result[i].id + ", " + result[i].name +
    ", " + result[i].category + ", " + result[i].countries);
}
System.log('\n');


// Select multiple elements with selectMany-----------------------------
System.log('# Select multiple elements with selectMany');

result = enumerable.selectMany( function(item) {
  return item.countries;
}).toArray();

/*
result => [
  "Italy", "Austria", "Italy", "Germany",
  "Germany", "Japan", "Japan", "Italy"
];
*/

for (var i = 0; i < result.length; i++) {
  System.log(result[i]);
}
System.log('\n');


// Get the first matching element with firstOrDefault-------------------
System.log('# Get the first matching element with firstOrDefault');

result = enumerable.firstOrDefault( function(item) {
  return item.category == "vegetables";
});

/*
result => { id: 2, name: "two", ... };
*/

System.log(result.id + ", " + result.name +
  ", " + result.category + ", " + result.countries);
System.log('\n');


// Get the last matching element with lastOrDefault---------------------
System.log('# Get the last matching element with lastOrDefault');

result = enumerable.lastOrDefault( function(item) {
  return item.category == "vegetables";
});

/*
result => { id: 3, name: "three", ... };
*/

System.log(result.id + ", " + result.name +
  ", " + result.category + ", " + result.countries);
System.log('\n');


/* Check if at least one elements matchs expression with any------------
 *
 * some is equivalent to any
 */
System.log('# Check if at least one elements matchs expression with any');

result = enumerable.any( function(item) {
  return item.name == "two";
});
// result = data.some( function(item) {
//   return item.name == "two";
// });

/*
result => true;
*/

System.log(result);
System.log('\n');


/* Check if all elements match expression with all----------------------
 *
 * every is equivalent to all
 */
System.log('# Check if all elements match expression with all');

result = enumerable.all( function(item) {
  return item.countries.length > 0;
});
// result = data.every( function(item) {
//   return item.countries.length > 0;
// });

/*
result => true;
*/

System.log(result);
System.log('\n');


// Skip the number of specified elements with skip----------------------
System.log('# Skip the number of specified elements with skip');

result = enumerable.skip(3).toArray();

/*
result => [
	{ id: 4, name: "four", ... },
	{ id: 5, name: "five", ... }
];
*/

for (var i = 0; i < result.length; i++) {
  System.log(result[i].id + ", " + result[i].name +
    ", " + result[i].category + ", " + result[i].countries);
}
System.log('\n');


// Take the number of specified elements with take----------------------
System.log('# Take the number of specified elements with take');

result = enumerable.take(2).toArray();

/*
result => [
	{ id: 1, name: "one", ... },
	{ id: 2, name: "two", ... }
];
*/

for (var i = 0; i < result.length; i++) {
  System.log(result[i].id + ", " + result[i].name +
    ", " + result[i].category + ", " + result[i].countries);
}
System.log('\n');


// Get the maximum element using specific expression with max-----------
System.log('# Get the maximum element using specific expression with max');

result = enumerable.max( function(item) {
  return item.id;
});

/*
result => 5;
*/

System.log(result);
System.log('\n');


// Get the minimum element using specific expression with min-----------
System.log('# Get the minimum element using specific expression with min');

result = enumerable.min( function(item) {
  return item.id;
});

/*
result => 1;
*/

System.log(result);
System.log('\n');


// Get elements contained on two array with intersect-------------------
System.log('# Get elements contained on two array with intersect');

var otherData = [
  { id: 2, name: "two", category: 'vegetables' }, 
  { id: 8, name: "eight", category: 'fruit' }
];

result = enumerable.intersect(otherData, function(item) {
  return item.id;
}).toArray();

/*
result => [
	{ id: 2, name: "two", ... }
];
*/

for (var i = 0; i < result.length; i++) {
  System.log(result[i].id + ", " + result[i].name +
    ", " + result[i].category + ", " + result[i].countries);
}
System.log('\n');


// Remove one element using except--------------------------------------
System.log('# Remove one element using except');

var copyEnumerable = enumerable;
var elementToRemove = copyEnumerable.where( function(item) {
  return item.id == 2;
}).toArray();

result = copyEnumerable.except(elementToRemove).toArray();

/*
result => [
	{ id: 1, name: "one", ... },
	{ id: 3, name: "three", ... },
	{ id: 4, name: "four", ... },
	{ id: 5, name: "five", ... }
];
*/

for (var i = 0; i < result.length; i++) {
  System.log(result[i].id + ", " + result[i].name +
    ", " + result[i].category + ", " + result[i].countries);
}
System.log('\n');


// Remove, from source array, specified elements with except------------
System.log('# Remove, from source array, specified elements with except');

copyEnumerable = enumerable;

var elementsToSubtract = [
  { id: 2, name: "two", category: 'vegetables', countries: ["Italy", "Germany"] },
  { id: 4, name: "four", category: 'fruits', countries: ["Japan"] },
  { id: 7, name: "seven", category: 'vegetables' }
];

result = enumerable.except(elementsToSubtract, function(item) {
  return item.id;
}).toArray();

/*
result => [
	{ id: 1, name: "one", ... },
	{ id: 3, name: "three", ... },
	{ id: 5, name: "five", ... }
];
*/

for (var i = 0; i < result.length; i++) {
  System.log(result[i].id + ", " + result[i].name +
    ", " + result[i].category + ", " + result[i].countries);
}
System.log('\n');


// Sum numeric values with sum------------------------------------------
System.log('# Sum numeric values with sum');

result = enumerable.sum( function(item) {
  return item.id;
});
// result = data.map( function(item) { return item.id; });
// result = result.reduce( function(item1, item2) { return item1 + item2 });

/*
result => 15
*/

System.log(result);
System.log('\n');


// Calculate average on numeric values with average---------------------
System.log('# Calculate average on numeric values with average');

var sampleData = [
  { value: 3 },
  { value: 2 },
  { value: 5 },
  { value: 2 },
];

result = Enumerable.from(sampleData).average( function(item) { 
  return item.value; 
});
// result = sampleData.map( function(item) { return item.value; });
// result = result.reduce( function(item1, item2) { return item1 + item2 });
// result = result / sampleData.length;

/*
result => 3
*/

System.log(result);
System.log('\n');


// Chain multiple methods-----------------------------------------------
System.log('# Chain multiple methods');

result = enumerable
  .where( function(item) { return item.category == 'fruits' })
  .select( function(item) { return item.id; })
  .toArray();
// result = data
//   .filter( function(item) { return item.category == 'fruits'; })
//   .map( function(item) { return item.id });

/*
result => [1, 4, 5];
*/

for (var i = 0; i < result.length; i++) {
  System.log(result[i]);
}
System.log('\n');


// Initializing from objects--------------------------------------------
System.log('# Initializing from objects');

var object = {foo: "a", "bar": 100, "foobar": true};
Enumerable.from(object).forEach( function(obj) {
  System.log(obj.key + ":" + obj.value) 
});

/*
result =>
  foo:a
  bar:100
  foobar:true
*/

System.log('\n');


// Continue and break when iterating------------------------------------
System.log('# Continue and break when iterating');

Enumerable.repeat("foo", 10).forEach( function(value, index) {
  if (index % 2 == 0) return; // continue
  if (index > 6) return false; // break
  System.log(index + ":" + value);
});

/*
result =>
  1:foo
  3:foo
  5:foo
*/

System.log('\n');


// Grouping and ref/value compare---------------------------------------
System.log('# Grouping and ref/value compare');

var objects = [
  { Date: new Date(2000, 1, 1), Id: 1 },
  { Date: new Date(2010, 5, 5), Id: 2 },
  { Date: new Date(2000, 1, 1), Id: 3 }
];

// ref compare, cannot do grouping
Enumerable.from(objects)
  .groupBy("$.Date", "$.Id", function (key, group) {
    return { date: key, ids: group.toJoinedString(',')}
  })
  .log("$.date + ':' + $.ids").toJoinedString();

// use fourth argument to groupBy (compareSelector)
Enumerable.from(objects)
  .groupBy("$.Date", "$.Id", function (key, group) {
    return { date: key, ids: group.toJoinedString(',')}
  }, function (key) { return key.toString() })
  .log("$.date + ':' + $.ids").toJoinedString();

/*
return =>
2.0
2.0
*/

System.log('\n');


// Regular Expression matches-------------------------------------------
System.log('# Regular Expression matches');

var input = "abcdefgABzDefabgdg";
Enumerable.matches(input, "ab(.)d", "i").forEach(function(match) {
  for (var prop in match) {
    System.log(prop + " : " + match[prop]);
  }
  System.log("toString() : " + match.toString());
});

/*
return =>
  0 : abcd
  1 : c
  index : 0
  input : abcdefgABzDefabgdg
  toString() : abcd,c
  0 : ABzD
  1 : z
  index : 7
  input : abcdefgABzDefabgdg
  toString() : ABzD,z
  0 : abgd
  1 : g
  index : 13
  input : abcdefgABzDefabgdg
  toString() : abgd,g
*/

System.log('\n');


// LazyEvaluation and InfinityList--------------------------------------
System.log('# LazyEvaluation and InfinityList');

// First radius of a circle with area over 10000
var result = Enumerable.toInfinity(1).where( function(r) {
  return r * r * Math.PI > 10000
}).first();

/*
result => 57
*/

System.log(result);
System.log('\n');


// Dictionary-----------------------------------------------------------
System.log('# Dictionary');

// sample class
var cls = function (a, b) {
  this.a = a;
  this.b = b;
}
var instanceA = new cls("a", 100);
var instanceB = new cls("b", 2000);

// create blank dictionary
var dict = Enumerable.empty().toDictionary();
// create blank dictionary (using compareSelector)
var dict = Enumerable.empty().toDictionary("","",function (x) { return x.a + x.b });

dict.add(instanceA, "zzz");
dict.add(instanceB, "huga");
System.log(dict.get(instanceA)); // zzz
System.log(dict.get(instanceB)); // huga

// enumerable (to keyvaluePair)
dict.toEnumerable().forEach(function (kvp) {
  System.log(kvp.key.a + ":" + kvp.value);
});

/*
result =>
  zzz
  huga
  a:zzz
  b:huga
*/

System.log('\n');

// End------------------------------------------------------------------
