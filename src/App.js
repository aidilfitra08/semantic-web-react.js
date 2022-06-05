import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import About from './components/About';

import Navbar from './components/Navbar';
import AdvancedSearch from './components/ShowData/AdvanceSearch';
import Home from './components/ShowData/Home';

function App() {
  return (
   <Router>
     <Navbar />
     <Routes>
       <Route path="/" element={<Home />}/>
       <Route path="/advanced" element={<AdvancedSearch />}/>
       <Route path="/about" element={<About />}/>
     </Routes>
   </Router>
  );
}

export default App;
