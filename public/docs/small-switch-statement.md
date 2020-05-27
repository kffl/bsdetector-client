# Not enough case clauses in switch statement

The minimum recommended number of case clauses in the switch statement is: 3.

## Sample occurrence

```javascript
const expr = 'Papayas';
switch (expr) {
    case 'Oranges':
        console.log('Oranges are $0.59 a pound.');
        break;
    default:
        console.log(`Sorry, we are out of ${expr}.`);
}
```