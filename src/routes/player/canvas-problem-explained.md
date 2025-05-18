Here is a small problem which i want to deal with in forensic depth. Since so much depends on it.

# PROMBLE STATEMENT :

The problem is that i give json data to my Player (canvas) which draw them at different places then they were orignally suppose to be.

# Details

The problem may not be that simple because of:

        - The canvas on page has very special requirement: The canvas has a "YOUTUBE"  kind of lay out in which we try
                    + Make the width of canvas as wide as possible but still maintaing 16:9 ratio   with the height.
                    + However the width should bot be so much that while maintaining the height it move out of the bottom of visible screen.
                    ==> So we need a screen as wide as possible but not so wide that the height scroll out of the bottom of the page.
        - To maintain some structure we have used some design-time-canvas-resolution and since the canvas of screen id of different resolution so that needs to be mapped as well.

        - There is also a grid system which is needs to be translated.

# Finally

What make this problem special is
1: The problem is in layout domain (front end) and in the code domain both
2: Unless we get this right any generated data for slides may have serious errors in the data and may not work whenthe Player is fixed. This can break the apps editor-player contract.

# Notes for GPT

We first discuss the problem in which discussion-mode no-code-mode . we do not try to patch the code one piece a time we take a complete look of it and talk about it and then when we code we just print code files one by one thats it.
