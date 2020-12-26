import React,{Component} from 'react';
import './App.css';
import Header from './componnents/Header/Header';
import Sidebar from './componnents/SideBar/Sidebar';
import Games from './componnents/Games/Games';
import TopStreams from './componnents/TopStreams/TopStreams';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Live from './componnents/Live/Live';
import GamesStreams from './componnents/GamesStreams/GamesStreams';
import {Helmet} from "react-helmet";
import Resultat from './componnents/Resultat/Resultat';




class App extends Component {

 
  render(){
 

  return (

      <Router>
        <div className="App">
          <Helmet>
            <title>Twitch clone app</title>
          </Helmet>
          <Header />
          <Sidebar />
          <Switch>
            <Route exact path="/" component={Games}  />
            <Route exact path="/top-streams" component={TopStreams}/>
            <Route exact path="/live/:slug" component={Live} />
            <Route exact path="/game/:slug" component={GamesStreams} />
            <Route exact path="/resultat/:slug" component={Resultat} />
          </Switch>
          
      </div>
    </Router>
    );
  }
 
}

export default App;
