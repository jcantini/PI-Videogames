import './App.css';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from '../components/LandingPage/LandingPage'
import HomePage from '../components/HomePage/HomePage'
import AddVideogame from '../components/AddVideogame/AddVideogame'
import VideoGameDetails from '../components/VideoGameDetails/VideoGameDetails'
 
function App() {
  return (
    <BrowserRouter> 
    <div className='App'>
      <Switch>
        <Route exact path= '/' component = {LandingPage} />
        <Route exact path= '/videogame' component = {AddVideogame} />
        <Route exact path= '/videogame/:id' component = {VideoGameDetails} />
        <Route exact path = '/home' component = {HomePage} />
        <Route path="*" component={LandingPage} />
      </Switch>
    </div>  
    </BrowserRouter>
  );
}

export default App;
