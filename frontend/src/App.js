
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Login from './components/Accounts/Users/Login';
import Registration from './components/Accounts/Users/Registration';
import HomePage from './pages/HomePage';


// import {Provider} from 'react-redux'
//import store from './redux/store';

function App() {
  return (
    <Router >
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/dashboard" component={HomePage} />
        <Route path="/registration" component={Registration} />
      </Switch>
      {/* <ToastContainer autoClose={3000}/> */}
  <ToastContainer toastStyle={{ backgroundColor: '#2471A3',color:'white' }} autoClose={3000}/>  
    </Router>
  );
}

export default App;
