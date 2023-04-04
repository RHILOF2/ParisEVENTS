import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Search from './pages/Search';
import Header from './components/Header';
import Favorites from './pages/Favorites';
import DetailEvent from './pages/DetailEvent';



function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home/>}></Route>

        <Route path='/recherche' element={<Search/>}></Route>

        <Route path='/favoris' element={<Favorites/>}></Route>
        
        <Route path='/evenementDetail/:id' element={<DetailEvent/>}></Route>



      </Routes>
    </div>
  );
}

export default App;
