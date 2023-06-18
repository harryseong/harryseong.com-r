import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Counter } from '../components/counter/Counter';
import { Home } from '../components/home/Home';
import { About } from '../components/about/About'
import { Places } from '../components/places/Places'
import './App.scss';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faLocationPin, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

import { useAppSelector } from '../app/hooks';
import { selectAppConfig } from '../components/app-config/AppConfigSlice';

function App() {
  library.add(faLocationPin, faAngleLeft, faAngleRight)

  const darkMode: boolean = useAppSelector(selectAppConfig);

  return (
    <div className={"App " + (darkMode ? "dark" : "light")}>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="/counter" element={<Counter />}></Route>
            <Route path="/places" element={<Places />}></Route>
            <Route path="/about" element={<About />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
