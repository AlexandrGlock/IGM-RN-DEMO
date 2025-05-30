export const lightTheme = {
  colors: {
    primary: '#007BFF',
    secondary: '#6C757D',
    background: '#FFFFFF',
    text: '#212529',
    amigosRed: '#ff3f33',
    border: '#CCCCCC',
    card: '#F9F9F9',
    buttonText: '#FFFFFF',
    // Add other colors as needed
  },
  icons: {
    appIcon: require('../assets/images/Amigos-logo-black.png'),
    // Add other icon paths as needed
  },
  // Add other theme properties like fonts, spacing, etc.
};

export const darkTheme = {
  colors: {
    primary: '#0056b3',
    secondary: '#545b62',
    background: '#212529',
    text: '#F8F9FA',
    amigosRed: '#ff3f33',
    border: '#555555',
    card: '#333333',
    buttonText: '#F8F9FA',
    // Add other colors as needed
  },
  icons: {
    appIcon: require('../assets/images/Amigos-logo.png'),
    // Add other icon paths as needed
  },
  // Add other theme properties like fonts, spacing, etc.
};

export type Theme = typeof lightTheme; 