import Example1 from './example1';
import Example2 from './example2';
import Example3 from './example3';
import {Routes, Route, HashRouter} from "react-router-dom"
import React from 'react';

function MainFunc() {
  return (
    <HashRouter>
      <Routes>
        <Route >
          <Route path="/" element={<Example1 />} />
          <Route path="/example1" element={<Example1 />} />
          <Route path="/example2" element={<Example2 />} />
          <Route path="/example3" element={<Example3 />} />
          <Route path="*" element={<h1>Invalid</h1>} />
        </Route>
      </Routes>
    </HashRouter>);
}

export default MainFunc;
