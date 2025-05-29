// shared/enums.js

/**
 * Slide template types (core layouts)
 */
export const SlideTemplates = {
    FULL: 'full',
    HALF: 'half'
  };
  
  /**
   * Supported slide item types
   */
  export const ItemTypes = {
    TEXT: 'text',
    ICON: 'icon',
    IMAGE: 'image',
    RICH_TEXT: 'richText',
    // Extend as needed: TABLE, CHART, QUOTE, CODE_BLOCK, etc.
  };
  
  /**
   * Heading levels for heading factories
   */
  export const HeadingLevels = {
    H1: 'h1',
    H2: 'h2',
    // Add H3, H4 if you support more styles
  };
  
  /**
   * Icon types for bullet lists or standalone icons
   */
  export const IconTypes = {
    DISC: 'disc',
    CIRCLE: 'circle',
    // Extend with custom icon names as needed
  };
  
  /**
   * Body factory types for templating
   */
  export const BodyFactories = {
    BULLETS: 'bullets',
    NUMBERED_LIST: 'numberedList',
    SIDE_BY_SIDE: 'sideBySide'
  };
  
  /**
   * Footer factory types
   */
  export const FooterFactories = {
    DEFAULT: 'defaultFooter'
  };
  
  /**
   * Layout slots for templates
   */
  export const TemplateSlots = {
    HEADING: 'heading',
    BODY: 'body',
    LEFT: 'left',
    RIGHT: 'right',
    FOOTER: 'footer'
  };
  
  /**
   * Default configuration keys
   */
  export const ConfigKeys = {
    ICON_TYPE: 'iconType',
    GAP: 'gap',
    AUTHOR: 'author',
    FLIP: 'flip'
  };
  