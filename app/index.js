import React from "react";
import ReactDOM from "react-dom";


import ViewPager from './components/ViewPager';
import PlaylistViewer from './components/PlaylistViewer'

import "./index.css";




function App() {

  return (
    <div className="App">
     <div className='container'>
      <PlaylistViewer/>
     </div>
    </div>
  );
}


const rootElement = document.getElementById("app");
ReactDOM.render(<App />, rootElement);
