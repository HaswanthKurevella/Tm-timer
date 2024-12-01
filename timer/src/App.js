// import logo from './logo.svg';
import './App.css';
import Error from './error'; 
import Report from './reports';
import Autocomplete from "./comp/autocomplete";
import { BrowserRouter,Route,Routes } from 'react-router-dom';
// import Stopwatch from "./comp/stopwatch";


function App() {
  return (
    
    <>
   
      <div className='hearder'>
    <h1 className='hearder'>Toastmasters Time Keeper</h1> 
    </div>
    <BrowserRouter>
        <Routes>
        <Route path='/' element={<Autocomplete/>}/>
          <Route path='/reports' element={<Report/>}/>
          <Route path='*' element={< Error/>}/>
          
        </Routes>
        </BrowserRouter>
   </>

    
 );}

export default App;
