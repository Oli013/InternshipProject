import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
function Tick(){

  const name="Saisha Prabhu";

  const element=(
    <div>
      <h1>Hey {name}!!!!</h1>
      <h2>Let us go home.</h2>
      
      <h2>It is  {new Date().toLocaleTimeString()}</h2>
    </div>
  );
  root.render(element);
}
setInterval(Tick,1000);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
