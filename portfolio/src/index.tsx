import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  Routes,
  BrowserRouter as Router
} from 'react-router-dom';
import './index.scss';

import App from './App';
import HomeIndex from './pages/Home';
import ProjectsIndex from './pages/Projects';
import AboutIndex from './pages/About';
import ContactIndex from './pages/Contact';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <Router>
      <Suspense fallback={<div style={{ background: "#333" }}>Loading...</div>}>
        <Routes>
          <Route path="*" element={<div>404 Not Found</div>} />

          <Route path="/" element={<App />}>
            <Route index element={<HomeIndex />} />
            <Route path="projects" element={<ProjectsIndex />} />
            <Route path="about" element={<AboutIndex />} />
            <Route path="contact" element={<ContactIndex />} />

            <Route path="test"  element={<div style={{ padding: "3rem" }}>test route</div>}/>
          </Route>

          <Route path="/test2" element={<div style={{ padding: "3rem" }}>no header / footer</div>} />
          
        </Routes>
      </Suspense>
    </Router>
  </React.StrictMode>
);
