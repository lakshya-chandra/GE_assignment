import React from 'react';
import './App.css';

import Header from './components/Header';
import Sidebar from './components/SideBar';

class App extends React.Component {
  render(){
    return(
      <div className="container px-0" style={{maxWidth:'100%'}}>
        <div className="p-3 bg-info">
          <Header />
        </div>
        <div className="row">
          <Sidebar />
        </div> 
      </div>  
    )
  }
}

export default App;