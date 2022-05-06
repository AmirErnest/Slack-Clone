import './App.css';
import {useEffect, useState} from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Chat from './components/Chat';
import Login from './components/Login';
import styled from 'styled-components';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import db from './firebase'
import {auth, provider} from './firebase'

function App() {

  /* useState setRooms saves data in docs and it is returned in the function below
  using the unique id for each channel*/
  const[rooms, setRooms] = useState([])
  
  /* convert from string to an object via json.parse and save it in user,
  to store in the local storage of the browser, so user keep logged in when refreshing the page for example*/
  const[user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

const getChannels = () => {
  db.collection('rooms').onSnapshot((snapshot) => {
    setRooms(snapshot.docs.map(doc => {
      return { id: doc.id, name: doc.data().name}
    }))
  })
}

const signOut = () => {
  auth.signOut().then(()=>{
    localStorage.removeItem('user');
    setUser(null);
  })
}

/* useEffect is a function from react that call the function output
 only one time when app is initialized so nothing is repeated*/
useEffect(() => {
  getChannels();
}, [])

  return (
    <div className="App">
      <Router>
        {
          !user ?
          <Login setUser={setUser}/>
          :
        <Container>
          <Header signOut={signOut} user={user}/>
            <Main>
              <Sidebar rooms={rooms}/>
                <Switch>
                  <Route path="/room/:channelId">
                    <Chat user={user}/>
                  </Route>
                  <Route path="/">
                    Select or Create Channel
                  </Route>
                </Switch>
            </Main>
        </Container>
         }
      </Router>
    </div>
  );
}

export default App;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 38px minmax(0, 1fr);
  `;

const Main = styled.div`
  display: grid;
  grid-template-columns: 260px auto;
  `;