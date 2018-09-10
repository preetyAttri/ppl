import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
// import Home from './home';
//import Reset from './reset';
import RenderAll from "./renderAll";
import {Provider} from 'react-redux'
import Store from './stores/Store'
import registerServiceWorker from "./registerServiceWorker";

const render = function() {
  ReactDOM.render(
    <Provider store={Store}>
  <Router>
    <RenderAll />
  </Router>
  </Provider>,
  document.getElementById("root")
);
};
render();
Store.subscribe(render);

