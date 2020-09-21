import React, { Fragment, useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import User from './components/users/User'
import axios from 'axios'
import Search from './components/users/Search'
import Alert from './components/layout/Alert'
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import About from './components/pages/About'
import GithubState from './context/github/GithubState'

const App = () => {

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(async ()  => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setUsers(res.data);
    setLoading(false);
  },[]);
    
  const searchUsers = async (text) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setUsers(res.data.items);
    setLoading(false);
  }

  const clearUsers = async () => {
    setUsers([]);
  }

  const showAlert = (msg,type) => {
    setAlert({msg,type});  
    setTimeout(() => { 
      setAlert(null)
    }, 2000)
  }

  const getUser = async (username) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setUser(res.data);
    setLoading(false);
  }

  const getUserRepos = async (username) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setRepos(res.data);
    setLoading(false);
  }

    return (
      <GithubState>
        <BrowserRouter>
          <div className="App">
            <Navbar/>
            <div className="container">
              <Alert alert={alert}/>
              <Switch>
                <Route exact path="/" render={props => (
                  <Fragment>
                    <Search 
                      searchUsers={searchUsers} 
                      clearUsers={clearUsers}
                      showClear = {users.length > 0 ? true : false }
                      setAlert = {showAlert}
                    />
                    <Users loading={loading} users={users}/>
                  </Fragment>   
                )}/>
                <Route exact path="/about" component={About}/>
                <Route exact path="/user/:login" render={props => (
                  <User {...props} getUser={getUser} user={user} loading={loading} getUserRepos={getUserRepos} repos={repos} />
                )}/>
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </GithubState>
    );
}

export default App;
