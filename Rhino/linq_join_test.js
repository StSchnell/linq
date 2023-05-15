
var System = {
  log : function(outText) {
    java.lang.System.out.println(outText);
  }
}

load("linq.class.js");

/* Begin----------------------------------------------------------------
 *
 * Checked with Rhino JavaScript engine release 1.7.14 and 1.7.R4
 */

var Enumerable = LINQ();

var products = Enumerable.from([
  { ProductId: 1, Name: "Book nr 1", Price: 25.10 },
  { ProductId: 2, Name: "Book nr 2", Price: 15.25 },
  { ProductId: 3, Name: "Book nr 3", Price: 20.00 },
  { ProductId: 5, Name: "Book nr 5", Price: 16.06 }
]);

var orders = Enumerable.from([
  { OrderId: 1, ProductId: 1 },
  { OrderId: 2, ProductId: 1 },
  { OrderId: 3, ProductId: 2 },
  { OrderId: 4, ProductId: null },
  { OrderId: 5, ProductId: 4 }
]);

/* (Inner) Join---------------------------------------------------------
 *
 * Returns the records that have matching in both tables.
 *
 * Left table (outer) = products
 * Right table (inner) = orders
 */

var innerJoin = products
  .join(
    orders,
    function(outer) { return outer.ProductId; },
    function(inner) { return inner.ProductId; },
    function(outer, inner) {
      return {
        OrderId: inner.OrderId,
        ProductId: outer.ProductId,
        Name: outer.Name
      };
    }
  )
  .toArray();

/*
result => [
             {"OrderId":1, "ProductId":1, "Name":"Book nr 1"},
             {"OrderId":2, "ProductId":1, "Name":"Book nr 1"},
             {"OrderId":3, "ProductId":2, "Name":"Book nr 2"}
          ]
*/

System.log(JSON.stringify(innerJoin));

/* Left (Outer) Join----------------------------------------------------
 *
 * Returns all records from the left table and matches records from the
 * right table.
 *
 * Left table (outer) = products
 * Right table (inner) = orders
 */

var leftOuterJoin = products
  .groupJoin(
    orders,
    function(outer) { return outer.ProductId; },
    function(inner) { return inner.ProductId; },
    function(outer, inner) {
      return { product: outer, order: inner };
    }
  )
  .selectMany(
    // Projects each element of a source sequence to a result enumerable
    // and flattens the resulting sequences into one sequence.
    function(source) {
      // A sequence of values to project.
      return source.order.defaultIfEmpty();
    },
    function(source, result) {
      // Transform function to apply to each element.
      return {
        OrderId: result != null ? result.OrderId : null,
        ProductId: source.product.ProductId,
        Name: source.product.Name
      };
    }
  )
  .toArray();

/*
result => [
            {"OrderId":   1, "ProductId":1, "Name":"Book nr 1"},
            {"OrderId":   2, "ProductId":1, "Name":"Book nr 1"},
            {"OrderId":   3, "ProductId":2, "Name":"Book nr 2"},
            {"OrderId":null, "ProductId":3, "Name":"Book nr 3"},
            {"OrderId":null, "ProductId":5, "Name":"Book nr 5"}
          ]
*/

System.log(JSON.stringify(leftOuterJoin));

/* Right (Outer) Join---------------------------------------------------
 *
 * Returns all records from the right table and matches records from the
 * left table.
 *
 * Hint: A right outer join is not possible with LINQ, it supports only
 * left outer joins. Therefore the tables are swapped and a left outer
 * join is used.
 *
 * Left table (outer) = orders
 * Right table (inner) = products
 */

var rightOuterJoin = orders
  .groupJoin(
    products,
    function(outer) { return outer.ProductId; },
    function(inner) { return inner.ProductId; },
    function(outer, inner) {
      return { order: outer, product: inner };
    }
  )
  .selectMany(
    function(source) {
      return source.product.defaultIfEmpty();
    },
    function(source, result) {
      return {
        OrderId: source.order.OrderId,
        ProductId: result != null ? result.ProductId : null,
        Name: result != null ? result.Name : null
      };
    }
  )
  .toArray();

/*
result => [
            {"OrderId":1, "ProductId":   1, "Name":"Book nr 1"},
            {"OrderId":2, "ProductId":   1, "Name":"Book nr 1"},
            {"OrderId":3, "ProductId":   2, "Name":"Book nr 2"},
            {"OrderId":4, "ProductId":null, "Name":null},
            {"OrderId":5, "ProductId":null, "Name":null}
          ]
*/

System.log(JSON.stringify(rightOuterJoin));

/* Full Outer Join------------------------------------------------------
 *
 * Returns all records when there is a match in either left or right
 * table.
 *
 * Hint: This approach works only with complex data type.
 */

var fullOuterJoin = Enumerable.from(leftOuterJoin)
  .union(rightOuterJoin)
  .distinct( function(source) { return JSON.stringify(source); } )
  .toArray();

/*
result => [
            {"OrderId":   1, "ProductId":   1, "Name":"Book nr 1"},
            {"OrderId":   2, "ProductId":   1, "Name":"Book nr 1"},
            {"OrderId":   3, "ProductId":   2, "Name":"Book nr 2"},
            {"OrderId":null, "ProductId":   3, "Name":"Book nr 3"},
            {"OrderId":null, "ProductId":   5, "Name":"Book nr 5"},
            {"OrderId":   4, "ProductId":null, "Name":null},
            {"OrderId":   5, "ProductId":null, "Name":null}
          ]
*/

System.log(JSON.stringify(fullOuterJoin));

/* Cross Join-----------------------------------------------------------
 *
 * Returns the Cartesian product of both tables, which means it
 * combines each record from the left table with each record from the
 * right table.
 *
 * Left table (outer) = products
 * Right table (inner) = orders
 */

var crossJoin = products
  .selectMany(
    function(source) {
      return orders.select(
        function(item) {
          return {
            OrderId: item.OrderId,
            ProductId: source.ProductId,
            Name: source.Name
          }
        }
      )
    }
  )
  .toArray();

/*
result => [
            {"OrderId":1, "ProductId":1, "Name":"Book nr 1"},
            {"OrderId":2, "ProductId":1, "Name":"Book nr 1"},
            {"OrderId":3, "ProductId":1, "Name":"Book nr 1"},
            {"OrderId":4, "ProductId":1, "Name":"Book nr 1"},
            {"OrderId":5, "ProductId":1, "Name":"Book nr 1"},
            {"OrderId":1, "ProductId":2, "Name":"Book nr 2"},
            {"OrderId":2, "ProductId":2, "Name":"Book nr 2"},
            {"OrderId":3, "ProductId":2, "Name":"Book nr 2"},
            {"OrderId":4, "ProductId":2, "Name":"Book nr 2"},
            {"OrderId":5, "ProductId":2, "Name":"Book nr 2"},
            {"OrderId":1, "ProductId":3, "Name":"Book nr 3"},
            {"OrderId":2, "ProductId":3, "Name":"Book nr 3"},
            {"OrderId":3, "ProductId":3, "Name":"Book nr 3"},
            {"OrderId":4, "ProductId":3, "Name":"Book nr 3"},
            {"OrderId":5, "ProductId":3, "Name":"Book nr 3"},
            {"OrderId":1, "ProductId":5, "Name":"Book nr 5"},
            {"OrderId":2, "ProductId":5, "Name":"Book nr 5"},
            {"OrderId":3, "ProductId":5, "Name":"Book nr 5"},
            {"OrderId":4, "ProductId":5, "Name":"Book nr 5"},
            {"OrderId":5, "ProductId":5, "Name":"Book nr 5"}
          ]
*/

System.log(JSON.stringify(crossJoin));

// End------------------------------------------------------------------
