import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
//import 'antd/dist/antd.min.css'
//import 'antd/dist/reset.css'
const root = createRoot(document.getElementById("root"));
root.render(
   <BrowserRouter>
   <App /></BrowserRouter>
    

);
