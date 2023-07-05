import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Contacts from './components/Contacts/Contacts';
import Navbar from './components/Navbar';
import Charts from './components/Charts/ChartsMaps';
import ContactForm from './components/Contacts/ContactForm';


function App() {
  
  return (
    <BrowserRouter>
      <div className='flex flex-row '>
        <Navbar />
        <Routes>
          <Route path='/' element={<Contacts />}></Route>
          <Route path='/form' element={<ContactForm />}></Route> 
          <Route path='/charts' element={<Charts />}></Route>
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
