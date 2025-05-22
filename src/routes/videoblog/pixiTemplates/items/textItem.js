

 export function textItem(props = {}) {
   return {
    type: "text",
    text: "Normal Text",
    themeRole: "primaryColor", 
    x: 0,
    y: 0,
    width: 200,
    height: 50,

    fontSize: 35,
    fontFamily: "Georgia",
    textAlign: "center",
    lineHeight: 1.2,
    padding: 20,

    backgroundColor: null,
    borderColor: null,
    borderWidth: 0,
    showAt: 0,

    rotation: 0,
    zIndex: 0,
    visible: true,

    ...props
  };
}
