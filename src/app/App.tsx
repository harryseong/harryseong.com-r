import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Home } from '../components/pages/home/Home';
import { Places } from '../components/pages/places/Places'
import './App.scss';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faLocationPin, faAngleLeft, faAngleRight, faFaceMeh } from '@fortawesome/free-solid-svg-icons'

import { useAppSelector } from '../app/hooks';
import { selectAppConfig } from '../components/shared/app-config/AppConfigSlice';
import { Music } from '../components/pages/music/Music';
import { Admin } from '../components/pages/admin/Admin';
import ProtectedRoute from '../utils/auth/protectedRoute';
import ProtectedRouteAdmin from '../utils/auth/protectedRouteAdmin';
import { Authenticated } from '../components/pages/authenticated/Authenticated';


function App() {
  library.add(faLocationPin, faAngleLeft, faAngleRight, faFaceMeh)

  const darkMode: boolean = useAppSelector(selectAppConfig);

  return (
    <div className={"App " + (darkMode ? "dark" : "light")}>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="/places" element={<Places />}></Route>
            <Route path="/music" element={<Music />}></Route>

            <Route path="/authenticated" element={
              <ProtectedRoute>
                <Authenticated />
              </ProtectedRoute>
            }></Route>

            <Route path="/admin" element={
              <ProtectedRouteAdmin>
                <Admin />
              </ProtectedRouteAdmin>
            }></Route>
          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
