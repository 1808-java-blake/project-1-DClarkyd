import * as React from 'react';
import './App.css';
import './include/bootstrap';
import { CheckAllReimbursements } from './components/check/check-reimbursements.components';
import { ReimbursementComponent } from './components/reimbursement/reimbursement.component';
import { AppNav } from './components/nav/nav.component';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import { HomeComponent } from './components/home/home.component';
import SignInComponent from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogOutComponent } from './components/log-out/log-out.component';
import { CheckStatus } from './components/status/status.component';
import { Provider } from 'react-redux';
import { store } from './Store';

export class App extends React.Component<any, any> {

  public constructor(props: any) {
    super(props);
    const userJSON = localStorage.getItem("user")
    const user = userJSON !== null ? JSON.parse(userJSON) : null
    this.state = {
      username: user
    }
  }

  public render() {

    return (

      <Provider store={store}>
        <BrowserRouter>
          <div>
            <AppNav />
            <div id="main-content-container">
              <Switch>

                <Route path="/check-reimbursements" component={this.state.username.usersId === 1 ? CheckAllReimbursements : CheckStatus} />

                <Route path="/add-reimbursement" component={ReimbursementComponent} />
                <Route path="/sign-in" component={SignInComponent} />
                <Route path="/sign-up" component={SignUpComponent} />
                <Route path="/check-status" component={CheckStatus} />
                <Route path="/log-out" component={LogOutComponent} />
                <Route component={CheckStatus} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
