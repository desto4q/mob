import {StatusBar} from 'react-native';

import {Dimensions} from 'react-native';
export const {width, height} = Dimensions.get('window');

export const colors = {
  primary: '#102855',
  primaryLight: '#10285566',
  secondary: '#E61949',
  white: '#FFFFFF',
  black: '#000000',
  red: '#FF0000',
  lightRed: '#E61949',
  inactive: '#D1D1D1',
  stroke: '#E8E8E8',
  icons: '#292D32',
  // inputBox: '#F4F4F4',
  inputBox: '#F3F7FF',
  header: '#121212',
  body: '#828282',
  placeholder: '#A0A0A0',
  dark: '#3A3A3A',
  gray: '#bec3c9',
  textGray: '#5D5D5D',
  'slight-gray': 'rgba(0, 0, 0, 0.1)',
  green: '#219653',
  'deep-space-blue': '#28374C',
  'pale-silver': '#DDDEE7',
  cream: '#FFF8E8',
  'pale-azure': '#D5EEFF59',
  'blue-gray': '#28384F',
  'transparent-gray': '#28384F1F',
  primaryDark: '#28384F',
  yellow: '#FFC640',
  lightGray: '#CDD5DF',
  tabGray: 'rgba(40, 56, 79, 0.45)',
  borderGray: 'rgba(255, 255, 255, 0.43)',
  bgGray: '#EBF2FF',
  faintBlue: '#F3F7FF',
  faintGray: '#10285533',
  lightPrimary: "'rgba(16, 40, 85, 0.2)'",
  lightBorder: '#1028551F',
  borderBg: 'rgba(16, 40, 85, 0.15)',
  bgLightBlue: '#E1EAF9',
  borderBlue: 'rgba(5, 41, 64, 0.45)',
  borderPrimary: 'rgba(16, 40, 85, 0.1)',
  borderPrimaryLighter: 'rgba(16, 40, 85, 0.35)',
  faintRed: 'rgba(230, 25, 73, 1)',
  faintPrimary: 'rgba(16, 40, 85, 1)',
  indicator: 'rgba(16, 40, 85, 0.3)',
  indicatorBg: 'rgba(16, 40, 85, 0.15)',
};
export const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
export const PASSWORD_REGEX = /[A-Z][a-z][0-9][#?!@$%^&*-]/;
export const fonts = {
  text: {
    largeText: 36,
    onboardingHeader: 32,
    h1: 24,
    h2: 20,
    h3: 18,
    textRegular: 16,
    button: 16,
    smallText: 14,
    mediumText: 12,
    small: 10,
    xs: 9,
  },
};

export const greetings = () => {
  const time = new Date().getHours();
  let greeting: string;
  if (time < 12) {
    greeting = 'Good Morning';
  } else if (time < 16) {
    greeting = 'Good Afternoon';
  } else {
    greeting = 'Good Evening';
  }
  return greeting;
};
const variant = {
  xxl4: 120,
  xxl3: 96,
  xxl2: 80,
  xxl1: 72,
  xxl: 56,
  xl: 40,
  lg: 32,
  md: 24,
  sm: 16,
  xs: 8,
  xxs: 4,
};
export const globalStyles = {
  wrapper: 20,
  statusbarHeight: StatusBar.currentHeight,
  radius: {
    lg: 20,
    md: 16,
    sm: 8,
    xmd: 10,
    xs: 4,
  },
  margin: variant,
  padding: variant,
};
export const unicodes = {
  naira: '\u20A6',
  bullet: '\u2022',
  nbsp: '\u00A0',
  apostrophe: '\u0027',
};
export const modalAnimationConfig = {
  animationOutTiming: 500,
  animationInTiming: 100,
  animationIn: 'fadeInUp',
  animationOut: 'slideOutDown',
  statusBarTranslucent: true,
  backdropColor: colors.dark,
  backdropOpacity: 0.6,
  backdropTransitionOutTiming: 100,
  avoidKeyboard: true,
  useNativeDriverForBackdrop: true,
  useNativeDriver: true,
};
export function containsSpecialCharacters(str: string) {
  // Regular expression to match any of the characters $, /, or -
  const regex = /[&.$/-]/;
  // Use test method to check if the string contains any of the characters
  return regex.test(str);
}

// export * from './images';
// export * from './icons';
