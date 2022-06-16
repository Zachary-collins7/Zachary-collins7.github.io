import React, { Suspense, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import './App.scss';


// pages
const LazyHome = React.lazy(() => import('./pages/Home'));
const LazyR2D2 = React.lazy(() => import('./pages/r2d2'));

function App() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    // if not a hash link, scroll to top
    if (hash === '') {
      window.scrollTo(0, 0);
    }
    // else scroll to id
    else {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView();
        }
      }, 0);
    }
  }, [pathname, hash, key]);

  return (
    <Routes>
      <Route path="*" element={<div>404 Not Found</div>} />
      <Route path='/' element={<LazyHome />} />
      <Route path='/art/r2d2' element={<LazyR2D2 />} />
    </Routes>
  );
}

export default App;