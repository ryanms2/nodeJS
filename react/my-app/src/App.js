import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import Company from './components/pages/Company';
import NewProject from './components/pages/NewProject';
import Container from './components/layout/Container';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import Projects from './components/pages/Projects';

function App() {
  return (
    <Router>
      <Navbar/>
      <Container customClass="min_height">
        <Routes>
            <Route exact path='/' element={<Home />}></Route>
            <Route exact path='/projects' element={<Projects/>}></Route>
            <Route exact path='/company' element={<Company/>}></Route>
            <Route exact path='/contato' element={<Contact/>}></Route>
            <Route exact path='/newproject' element={<NewProject/>}></Route>
        </Routes>
      </Container>
      <Footer/>
    </Router>
  );
}

export default App;
