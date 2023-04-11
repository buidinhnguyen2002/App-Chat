import logo from './logo.svg';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Login from "./page/login/login";

function App() {
  return (
    <div className="app">
        <Login status="login"/>
    </div>
  );
}

export default App;
