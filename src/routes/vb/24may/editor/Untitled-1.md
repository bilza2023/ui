

How to add data to deck without handliing json and many templates


my solution:  or some variation of this

const AvailableHeadingFactories;
const AvailableFooterFactories;
const AvailableBodyFactoriesFull;
const AvailableBodyFactoriesHalf;



const slide1 = templates.getFull(AvailableHeadingFactories.heading , AvailableFooterFactories.footer);

templates.addBody(slide1,AvailableBodyFactoriesFull.bullets , 
[
     { text: "Understand Node.js event loop", showAt: 0 },
    { text: "Master async patterns",        showAt: 2 },
    { text: "Implement real-time apps",     showAt: 4 }
]
);

deck.add 