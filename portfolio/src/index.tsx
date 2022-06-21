import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  Routes,
  BrowserRouter as Router
} from 'react-router-dom';
import App from './App';
import HomeIndex from './pages/Home';

import './index.scss';
import ProjectsIndex from './pages/Projects';


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
            <Route path="test"  element={<div style={{ padding: "3rem" }}>test</div>}/>
          </Route>

          <Route path="/test2" element={<div style={{ padding: "3rem" }}>no header / footer</div>} />
          
        </Routes>
      </Suspense>
    </Router>
  </React.StrictMode>
);
