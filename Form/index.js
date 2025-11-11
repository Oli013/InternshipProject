import React from "react";
import ReactDOM from "react-dom/client";

const root=ReactDOM.createRoot(document.getElementById('root'));

function Tick(){
    const element=(
            <div>
            <h1>Hello World</h1>
            <h2>It is {new Date().toLocaleTimeString()}.</h2>
        </div>
    );
    root.render(element);
}
setInterval(Tick,1000);