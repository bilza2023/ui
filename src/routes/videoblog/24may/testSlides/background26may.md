


1: remove from here -->{backgroundColor: "#ceef10"} and just add a method to deckbuilder as 
--> overRideSlideBackgroundColor(color); //some better name
// this color is assigned to the backgroundColor of last aslide in the deck.

// deck.add(templates.slide.titleWith3Bullets, 4, 
// {title: "Why Taleem?",bullets: ["Affordable", "Accessible", "AI-powered"]},
// {backgroundColor: "#ceef10"}
// );


2: This is the shape / strucutre of defaultBackground object
(this is from the old notes) and this deal with image and patterns NOT WITH background 

{
  backgroundImage: string | null,
  backgroundImageOpacity: number (0.0 to 1.0),
  pattern: Pattern | null
}

3: The confusion is the difference of shpae between background object in editor and background object in Player / goldStandard

this is shape of goldStandard data

      startTime: 0,
      endTime: 5,
      background: { backgroundColor: "#467ae2" },

and this is what we have in mind to implement at editor

{
  backgroundImage: string | null,
  backgroundImageOpacity: number (0.0 to 1.0),
  pattern: Pattern | null
}

===>Conceptual Clerity

1: lets just have 1 background object

{
  backgroundColor: "#467ae2",  
  backgroundImage: string | null,
  backgroundImageOpacity: number (0.0 to 1.0),
  pattern: Pattern | null
}

2: All there items inside are non-competing meaning they are 3 layers first the color  then the image and then the patters - if one does not exist it is not drawn (backgroundColor: "#467ae2" is must) --

3: if we change the goldStandard data with 

{
  backgroundColor: "#467ae2",  
  backgroundImage: string | null,
  backgroundImageOpacity: number (0.0 to 1.0),
  pattern: Pattern | null
}
i think nothing will break --- top level contract is still intact -   backgroundColor: "#467ae2",   is required rest of the 2 are optional any ways--we just have to handle them in player...

4: The colors come from globalTheme --SO in deck builder there is a contact between globalTheme and the background Object where background Object copies backgroundColor from globalTheme and backgroundColor can also be over ridden if user want
- now this transaction is very clear because 
 - when user adds a template --> set background.backgroundColor as per globalTheme
 - later if user calls over-ride-slide0backxxx then its clear what to do

5: The name globalTheme is also confusing . it gives an impression that as if the slide has its own theme. where as all a slide can do is over-ride the background color.    