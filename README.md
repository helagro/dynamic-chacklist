## Note
Anything might happen and I claim no responsibility

## Status
Not finished

### Example of checklistItems.js
```javascript
BLOCK_GOOGLE_DRIVE = true
checklistGroups = [
    {header:"Start", finishedItemsIds:[], collectedTags:[], itemAmountOnScreen:-1, items:[
        {name:"What is your favorite fruit?", type:"select", showRules:{type:"", tags:[]}, items:[
            {text:"Apples", tags:["APPLES", "KNOWS_ABOUT_FRUIT"]}, 
            {text:"Cars", tags:["NOT_FRUIT"]}, 
            {text:"Oranges", tags:["KNOWS_ABOUT_FRUIT"]}, 
            {text:"Bricks", tags:["NOT_FRUIT"]}, 
        ]}
    ]},
    {header:"Elaborate", finishedItemsIds:[], collectedTags:[], itemAmountOnScreen:-1, items:[
        {name:"Why do you like apples?", type:"radio", showRules:{type:"NEEDS", tags:["APPLES"]}, items:[
            {text:"They taste good", tags:[]},
             {text:"I don't like apples, it was a missclick", tags:["CLUMSY"]}
        ]},
        {name:"That was not a fruit", type:"radio", showRules:{type:"NEEDS", tags:["NOT_FRUIT"]}, items:[
            {text:"ok", tags:[]},
            {text:"I know", tags:["KNOWS_ABOUT_FRUIT"]}
        ]},
        {name:"Iq:", type:"number", showRules:{type:"NEEDS", tags:["NOT_FRUIT"]}, items:[]}
    ]},
    //The links are opened immediately!
    {header:"Links", finishedItemsIds:[], collectedTags:[], itemAmountOnScreen:-1, items:[
        {name:"Learn about fruits", type:"link", showRules:{type:"BAN", tags:["KNOWS_ABOUT_FRUIT"]}, items:[
            {text:"https://en.wikipedia.org/wiki/Fruit", tags:[]},
        ]},
        {name:"How to be less clumsy", type:"link", showRules:{type:"NEEDS", tags:["CLUMSY"]}, items:[
            {text:"https://www.google.com/search?q=how+to+be+less+clumsy", tags:[]},
        ]}

    ]}
    main()
]
```