import * as React from 'react';
import './App.css';
import './include/bootstrap';
import { CheckAllReimbursements } from './components/check/check-reimbursements.components';
import { ReimbursementComponent } from './components/reimbursement/reimbursement.component';
import { AppNav } from './components/nav/nav.component';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { CheckStatus } from './components/status/status.component';


class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <div>
          <AppNav />
          <div id="main-content-container">
            <Switch>
              <Route path="/check-reimbursements" component={CheckAllReimbursements} />
              <Route path="/reimbursement" component={ReimbursementComponent} />
              <Route path="/home" component={HomeComponent} />
              <Route path="/sign-in" component={SignInComponent} />
              <Route path="/sign-up" component={SignUpComponent} />
              <Route path="/check-status" component = {CheckStatus}/>


              <Route component={HomeComponent} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
