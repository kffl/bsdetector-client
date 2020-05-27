# Duplicated identifier 

Every variable' and function' has to be unique within given scope.

## Sample occurrence

```javascript
let x = 1; // variable with identifier 'x' declared here
let x = 2; // duplicated identifier
function x(){} // duplicated identifier
function foo(x){} // duplicated identifier
function foo(){ let x = 3;} // duplicated identifier
```