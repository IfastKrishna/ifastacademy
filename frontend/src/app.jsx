/* eslint-disable perfectionist/sort-imports */

import './global.css';

import { useScrollToTop } from './hooks/use-scroll-to-top';

import Router from './routes/sections';
import ThemeProvider from './theme';
import { SearchProvider } from './context/NavSerch';
import { UIProvider } from './context/CostomeUi';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();
  return (
    <ThemeProvider>
      <UIProvider>
        <SearchProvider>
          <Router />
        </SearchProvider>
      </UIProvider>
    </ThemeProvider>
  );
}
