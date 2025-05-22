
// Finalize and export
export const presentationData = {
    designWidth: 1020,
    designHeight: 576,
    slidesData: [
      {
        id: '69623375-54ad-417a-bd32-0bc505f9584f',
        startTime: 0,
        endTime: 5,
        items: [
          {
            type: "icon",
            iconName: "BULB",     // 🔥 Matches Icons.BULB
            x: 460,
            y: 120,
            width: 100,
            height: 100,          // optional since width controls fontSize
            color: 0xffcc00,
            rotation: 0,
            visible: true
          },
          
          {
            type: "text",
            text: "Bright Ideas",
            themeRole: "headingColor",
            x: 260,
            y: 260,
            width: 500,
            height: 80,
            color: 0xffffff,
            fontSize: 44,
            fontFamily: "Arial Black",
            textAlign: "center",
            lineHeight: 1.3,
            padding: 10,
            backgroundColor: null,
            borderColor: null,
            borderWidth: 0,
            showAt: 0,
            rotation: 0,
            zIndex: 2,
            visible: true
          }
        ],
        backgroundColor: '0xb24242',
        background: {}
      }
    ]
  };



//   every slide must have

//   slideData.data 
//   slideData.globalTheme 