import React,{Component} from 'react';
import './App.css';
import Header from './componnents/Header/Header';
import Sidebar from './componnents/SideBar/Sidebar';
import Games from './componnents/Games/Games';
import TopStreams from './componnents/TopStreams/TopStreams';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Live from './componnents/Live/Live';
import GamesStreams from './componnents/GamesStreams/GamesStreams';





class App extends Component {

 
  render(){
 

  return (

      <Router>
        <div className="App">
          <Header />
          <Sidebar />
          <Switch>
            <Route exact path="/" component={Games}  />
            <Route exact path="/top-streams" component={TopStreams}/>
            <Route exact path="/live/:slug" component={Live} />
            <Route exact path="/game/:slug" component={GamesStreams} />
          </Switch>
          
      </div>
    </Router>
    );
  }
 
}

export default App;
