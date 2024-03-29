import React from 'react';
import {useState, useEffect} from 'react';
import './App.css';
import {isMobile} from 'react-device-detect';
import {isIE} from 'react-device-detect';
import {browserName, CustomView} from 'react-device-detect';
import {ColorModeContext, useMode} from './theme';
import {CssBaseline, ThemeProvider} from '@mui/material';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from 'react-router-dom';

//Router
import AppStore from './pages/AppStore.jsx';


const router = createBrowserRouter ([
  {
    path: '/',
    element: <AppStore />,
  },
]);

export default function APP () {
  const [type, settype] = useState ('pc');
  const [theme, colorMode] = useMode ();
  const [isSidebar, setIsSidebar] = useState (true);
  // console.log(theme)
  useEffect (() => {
    if (isMobile) {
      settype ('mobile');
    }
    if (isIE) {
      settype ('IE');
    }
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {router.routes.map ((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
