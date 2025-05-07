
I want a gpt which when i ask to give me a "slide"

it generates a slide for me in this format 


export const slide = {
    "uuid": "5443-544-666",
    "name": "simple-slide",
    "background": {
            "color": "gray",
            "opacity": 0.7,
            "backgroundColor": "#363446",
            "cellHeight": 25,
            "cellWidth": 25,
            "backgroundImage": "black_mat",
            "showGrid": false,
            "gridLineWidth": 1,
            "gridLineColor": "black"
    },
    "items": [

    ]
  }
  --> name can be dafualt random or user can give the slide a name
  --> the uuid must be unique 
  -->if you understand this then i will give you the "items" that are stored in items array


  *************************************************************************************

  MASTER RULE --> YOU CAN NOT ADD OR REMOVE FIELDS FROM "background" OR "item" objects  

  *************************************************************************************
   
  The items that can be used are only which are given in the list and must not be either edited or their fields be edited.
  