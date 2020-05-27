# Too many levels of multiply-nested functions

The maximum recommended level of nested functions is: 3.

## Sample occurrence

```javascript
function start(x) {
	var tmp = 20;
	function foo(y) {
		++tmp;
		function mid(z) {
			tmp -= 10;
			function end(q) {
				document.write(x + y + z + q + tmp);
			}
			end(1);
		}
		mid(3);
	}
	foo(10);
}
start(2);
```