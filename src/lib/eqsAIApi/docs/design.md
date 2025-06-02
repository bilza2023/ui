

Here is my suggestion for EqDeckBuilder Api


const globalSp = ....


const deck  = new EqDeckBuilder();

deck.setGlobalSp(globalSp);

//line 1
deck.title(endTime, content/data);   
//gets global sp

//line 2
deck.heading(endTime, content/data);  
deck.setSp([....]) /// if -->deck.setSp([]); //empty means keep sp clean. 
//gets its own 
//line 3
deck.text(endTime, content/data);  
//gets global sp


== have a totally seperate API for creating sp items that we can create and finall add here 

const sp = new Sp();

sp.title(....)
sp.table(....)
sp.tableCode(....)

deck.setSp(sp.getComponents());