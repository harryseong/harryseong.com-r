import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Counter } from '../components/counter/Counter';
import { Home } from '../components/home/Home';
import { About } from '../components/about/About'
import { Places } from '../components/places/Places'
import './App.scss';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/counter" element={<Counter />}></Route>
            <Route path="/places" element={<Places />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
