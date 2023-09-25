import React, { ReactNode } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import { styled } from '@mui/system';

interface MainLayoutProps {
  children: ReactNode;
};

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const LayoutWrapper = styled(Box)(({theme}) => ({
  margin: '24px',
  width: 'auto',
  [theme.breakpoints.up('lg')]: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: theme.breakpoints.values.lg,
  },
}));

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
}) => (
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <LayoutWrapper>
      {children}
    </LayoutWrapper>
  </ThemeProvider>
);
