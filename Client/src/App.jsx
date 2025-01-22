import { useState } from 'react';
import TextEditor from './Components/TextEditor';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { v4 as uuidV4 } from "uuid";

import Navbar from "./Components/Navbar";
import HeroSection from "./Components/HeroSection";
import FeatureSection from "./Components/FeatureSection";
import Workflow from "./Components/Workflow";
import Footer from "./Components/Footer";
import Testimonials from "./Components/Testimonials";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            // element={<Navigate to={`/documents/${uuidV4()}`} replace />} 
            element={<Navigate to="/home" replace />} 
          />
          <Route
            path="/home"
            element={
              <div>
                <Navbar />
                  <div className="max-w-7xl mx-auto pt-20 px-6">
                    <HeroSection />
                    <FeatureSection />
                    <Workflow />
                    <Testimonials />
                    <Footer />
                  </div>
              </div>
          } 
          />
          <Route
            path="/documents/:id"
            element={<TextEditor />} 
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
