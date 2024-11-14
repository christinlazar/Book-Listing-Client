import logo from './logo.svg';
import './App.css';
import UserRoute from './routes/UserRoute';
import { Route, Routes,BrowserRouter as Router } from 'react-router-dom';
function App() {
  return (
    <Router>
      <div className="">
      <Routes>
        <Route path='/*' element={<UserRoute/>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
