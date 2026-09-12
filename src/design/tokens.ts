export const tokens = {
  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
  radius: { sm: 8, md: 14, lg: 22, pill: 999 },
  typography: { body: 16, title: 28, caption: 13 },
} as const;

export const lightTheme = {
  background: '#FFFFFF',
  surface: '#F6F7F9',
  text: '#0D1117',
  muted: '#667085',
  primary: '#111827',
  border: '#E5E7EB',
};
export const darkTheme = {
  background: '#0B0D10',
  surface: '#15181D',
  text: '#F9FAFB',
  muted: '#98A2B3',
  primary: '#FFFFFF',
  border: '#2A2F36',
};
