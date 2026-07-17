import { lighten, darken, readableColor } from 'polished';

export const theme = {
  // spacing: {
  //   unit: 5,
  //   sectionHorizontal: ({ spacing }) => spacing.unit * 8,
  //   sectionVertical: ({ spacing }) => spacing.unit * 8,
  // },
  // breakpoints: {
  //   xs: 0,
  //   small: '550px',
  //   medium: '900px',
  //   large: '1200px',
  // },
  colors: {
    purpleButton: {
      main: '#00E664', // Bright Green - ShipStation primary brand color
    },
    tonalOffset: 0.2,
    primary: {
      main: '#11003A', // Deep Indigo - ShipStation primary brand color
      light: ({ colors }) => lighten(colors.tonalOffset, colors.primary.main),
      dark: ({ colors }) => darken(colors.tonalOffset, colors.primary.main),
      contrastText: ({ colors }) => readableColor(colors.primary.main),
    },
    // success: {
    //   main: '#00aa13',
    //   light: ({ colors }) => lighten(colors.tonalOffset * 3, colors.success.main),
    //   dark: ({ colors }) => darken(colors.tonalOffset, colors.success.main),
    //   contrastText: ({ colors }) => readableColor(colors.success.main),
    // },
    // error: {
    //   main: '#e53935',
    //   light: ({ colors }) => lighten(colors.tonalOffset * 2, colors.error.main),
    //   dark: ({ colors }) => darken(colors.tonalOffset, colors.error.main),
    //   contrastText: ({ colors }) => readableColor(colors.error.main),
    // },
    // warning: {
    //   main: '#d4ad03',
    //   light: ({ colors }) => lighten(colors.tonalOffset * 2, colors.warning.main),
    //   dark: ({ colors }) => darken(colors.tonalOffset, colors.warning.main),
    //   contrastText: ({ colors }) => readableColor(colors.warning.main),
    // },
    // info: {
    //   main: '#4782cb',
    //   light: ({ colors }) => lighten(colors.tonalOffset * 2, colors.info.main),
    //   dark: ({ colors }) => darken(colors.tonalOffset, colors.info.main),
    //   contrastText: ({ colors }) => readableColor(colors.info.main),
    // },
    text: {
      primary: '#11003A', // Deep Indigo for text
      // secondary: '#4e566d',
    },
    // border: {
    //   dark: 'rgba(0,0,0, 0.15)',
    //   light: '#ffffff',
    // },
    // responses: {
    //   success: {
    //     color: ({ colors }) => colors.success.main,
    //     backgroundColor: ({ colors }) => transparentize(0.9, colors.success.main),
    //   },
    //   error: {
    //     color: ({ colors }) => colors.error.main,
    //     backgroundColor: ({ colors }) => transparentize(0.9, colors.error.main),
    //   },
    //   redirect: {
    //     color: ({ colors }) => colors.warning.main,
    //     backgroundColor: ({ colors }) => transparentize(0.9, colors.responses.redirect.color),
    //   },
    //   info: {
    //     color: ({ colors }) => colors.info.main,
    //     backgroundColor: ({ colors }) => transparentize(0.9, colors.responses.info.color),
    //   },
    // },
    http: {
      get: '#00B750', // Mid Green
      post: '#00AAFF', // Cyan
      put: '#5C50FF', // Indigo
      options: '#FFB400', // Marigold
      patch: '#00E664', // Bright Green
      delete: '#e27a7a', // Keep existing for visibility
      basic: '#999',
      link: '#00AAFF', // Cyan
      head: '#5C50FF', // Indigo
    },
    navbar: {
      main: '#F7F8FA', // Grey background from branding
      gradient: ({ colors }) => darken(colors.tonalOffset / 2, colors.navbar.main),
      contrastText: '#11003A', // Deep Indigo text
      activeBgColor: '#E5FCEF', // Light green tint for active state
    },
    footer: {
      main: '#11003A', // Deep Indigo footer
      contrastText: '#FFFFFF' // White text on dark footer
    },
  },

  sidebar: {
    backgroundColor: '#F7F8FA', // Light gray background like Launchpad
    width: '280px',
  },

  typography: {
    fontSize: '16px', // Slightly smaller like Launchpad
    fontColor: '#11003A', // Deep Indigo
    lineHeight: '1.6em', // More line height for readability
    fontWeightRegular: '400',
    fontWeightBold: '600',
    fontWeightLight: '300',
    fontFamily: 'Figtree,Helvetica,Arial,sans-serif', // ShipStation brand font
    headings: {
      fontFamily: 'Figtree,Helvetica,Arial,sans-serif', // ShipStation brand font
      fontWeight: '600',
    },
    heading1: {
      fontSize: '60px',
      fontWeight: '600',
      fontFamily: ({ typography }) => typography.headings.fontFamily,
      lineHeight: ({ typography }) => typography.lineHeight,
      color: '#11003A', // Deep Indigo
      capitalize: true,
    },
    heading2: {
      fontSize: '43.2px',
      fontWeight: '600',
      color: '#11003A', // Deep Indigo
      fontFamily: ({ typography }) => typography.headings.fontFamily,
      lineHeight: ({ typography }) => typography.lineHeight,
      capitalize: false,
    },
    heading3: {
      fontSize: '1.27em',
      fontWeight: '600',
      color: '#11003A', // Deep Indigo
      fontFamily: ({ typography }) => typography.headings.fontFamily,
      lineHeight: ({ typography }) => typography.lineHeight,
      capitalize: false,
    },
    // heading4: {
    // // ...
    // },
    // heading5: {
    // // ...
    // },
    // heading6: {
    // // ...
    // },
    code: {
      color: '#5C50FF', // Indigo for code
    },
    links: {
      color: '#5C50FF', // Indigo for links (like Launchpad)
      visited: ({ typography }) => typography.links.color,
      hover: '#00E664', // Bright Green on hover
    },
  },
  rightPanel: {
    backgroundColor: '#1A1D2E', // Darker, cleaner background
    width: '40%',
    // textColor: '#ffffff',
  },
  schema: {
    nestedBackground: '#fafafa',
    // linesColor: theme => lighten( theme.colors.tonalOffset, desaturate(theme.colors.tonalOffset, theme.colors.primary.main) ),
    // defaultDetailsWidth: '75%',
    // typeNameColor: theme => theme.colors.text.secondary,
    // typeTitleColor: theme => theme.schema.typeNameColor,
    // requireLabelColor: theme => theme.colors.error.main,
    // labelsTextSize: '0.9em',
    // nestingSpacing: '1em',
    // arrow: {
    //   size: '1.1em',
    //   color: theme => theme.colors.text.secondary,
    // },
  },
  // codeBlock: {
  //   backgroundColor: ({ rightPanel }) => darken(0.1, rightPanel.backgroundColor),
  //   tokens: {},
  // },
};
