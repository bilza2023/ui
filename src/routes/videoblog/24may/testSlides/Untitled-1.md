it has some data that needs to be in a loop and need to have showAt and then some data is not needed in a loop

loop data
lines: [
{ text: "“The ink of the scholar", showAt: 1 },
{ text: "is more sacred", showAt: 2 },
{ text: "than the blood of the martyr.”", showAt: 3 }
],

no loop data
author: { text: "— Prophetic Tradition", showAt: 4 }

//This is case with all components they have some data iver which they loop and some which they dont and need some config etc etc

here is new recommended signature

from this 
export default function quoteComponent(globalTheme, data = {}) {

To
// data must have showAt 
data = [
{ text: "“The ink of the scholar", showAt: 1 },
{ text: "is more sacred", showAt: 2 },
{ text: "than the blood of the martyr.”", showAt: 3 }
];

const config = {
 author: { text: "— Prophetic Tradition", showAt: 4 }
}
export default function quoteComponent(globalTheme, data,config) {