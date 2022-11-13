import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Layout from './components/Layout';
import Explore from './pages/Explore';
import Feed from './pages/Feed';
import Login from './pages/Login';

function App() {
    return(
        <Router>
            <Layout>
                <Routes>
                    <Route exact path="/" element = {<Explore/>} />
                    <Route path= "/explore" element = {<Explore/>} />
                    <Route path = "/feed" element = {<Feed/>} />
                    <Route path = "/login" element = {<Login/>} />
                </Routes>
            </Layout>
        </Router>
    );
};
export default App;