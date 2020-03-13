import React, {Component} from 'react'
import {Route, Router} from 'react-router-dom'
import {createBrowserHistory} from 'history'

import Curriculumvitae from './curriculumvitae/Curriculumvitae'
import Zotero from './zotero/Zotero'

import SocketContext from './SocketContext'

const history = createBrowserHistory();

interface Props{
}

interface State{
}


class App extends  Component<Props, State> {
  render(){
      return (
        <div>
         <SocketContext.Provider>
            <Router history={history}>
                    <Route path ='/' exact  component={Curriculumvitae} />
                    <Route path ='/zotero' exact  component={Zotero} />
            </Router>
         </SocketContext.Provider>
       </div>
      );
  }
}

export default App;
