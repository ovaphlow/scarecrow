import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import SignUp from './SignUp';
import SignIn from './SignIn';
import SettingList from './SettingList';
import SettingDetail from './SettingDetail';
import './style.css';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/sign-up">
          <SignUp />
        </Route>
        <Route path="/sign-in">
          <SignIn />
        </Route>

        <Route path="/setting/append">
          <SettingDetail option="新增" />
        </Route>
        <Route path="/setting/:id">
          <SettingDetail option="编辑" />
        </Route>
        <Route path="/setting">
          <SettingList />
        </Route>
      </Switch>
    </Router>
  );
}
