import './App.css';
import { Routes, Route } from "react-router-dom";
import Login from './containers/login';
import Dashboard from './containers/dashboard/dashboard';

const App = () => {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/user-dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
