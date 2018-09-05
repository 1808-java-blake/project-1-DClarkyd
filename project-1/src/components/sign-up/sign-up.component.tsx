import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface IState {
  credentials: {
    password: string,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    role: string
  },
  errorMessage: string
}

export class SignUpComponent extends React.Component<RouteComponentProps<{}>, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      credentials: {

        email: '',
        firstName: '',
        lastName: '',
        password: '',
        role: '',
        username: ''
      },
      errorMessage: ''
    }
  }

  public passwordChange = (e: any) => {
    this.setState({
      ...this.state,
      credentials: {
        ...this.state.credentials,
        password: e.target.value
      }
    });
  }

  public usernameChange = (e: any) => {
    this.setState({
      ...this.state,
      credentials: {
        ...this.state.credentials,
        username: e.target.value
      }
    });
  }

  public firstNameChange = (e: any) => {
    this.setState({
      ...this.state,
      credentials: {
        ...this.state.credentials,
        firstName: e.target.value
      }
    });
  }

  public lastNameChange = (e: any) => {
    this.setState({
      ...this.state,
      credentials: {
        ...this.state.credentials,
        lastName: e.target.value
      }
    });
  }
  public emailChange = (e: any) => {
    this.setState({
      ...this.state,
      credentials: {
        ...this.state.credentials,
        email: e.target.value
      }
    });
  }

  public roleChange = (e: any) => {
    this.setState({
      ...this.state,
      credentials: {
        ...this.state.credentials,
        role: e.target.value
      }
    });
  }

  public submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch('http://localhost:3012/users/register', {
      body: JSON.stringify(this.state.credentials),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then(resp => {
        console.log(resp.status)
        if (resp.status === 401) {
          this.setState({
            ...this.state,
            errorMessage: 'Invalid Credentials'
          });
        } else if (resp.status === 200) {
          return resp.json();
        } else {
          this.setState({
            ...this.state,
            errorMessage: 'Failed to register at this time'
          });
        }
        throw new Error('Failed to register');
      })
      .then(resp => {
        localStorage.setItem('user', JSON.stringify(resp));
        this.props.history.push('/sign-in');
      })
      .catch(err => {
        console.log(err);
      });
  }


  public render() {
    const { errorMessage, credentials } = this.state;

    return (
      <form className="form-signup" onSubmit={this.submit}>
        <h1 className="h3 mb-3 font-weight-normal">Please sign up</h1>

        <label htmlFor="inputUsername" className="sr-only">Username</label>
        <input
          onChange={this.usernameChange}
          value={credentials.username}
          type="text"
          id="inputUsername"
          className="form-control"
          placeholder="Username"
          required />

        <label htmlFor="inputPassword" className="sr-only">Password</label>
        <input
          onChange={this.passwordChange}
          value={credentials.password}
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          required />

        <label htmlFor="inputEmail" className="sr-only">Email</label>
        <input
          onChange={this.emailChange}
          value={credentials.email}
          type="text"
          id="inputEmail"
          className="form-control"
          placeholder="Email"
          required />

        <label htmlFor="inputFirstName" className="sr-only">First Name</label>
        <input
          onChange={this.firstNameChange}
          value={credentials.firstName}
          type="text"
          id="inputFirstName"
          className="form-control"
          placeholder="First Name"
          required />

        <label htmlFor="inputLastName" className="sr-only">Last Name</label>
        <input
          onChange={this.lastNameChange}
          value={credentials.lastName}
          type="text"
          id="inputLastName"
          className="form-control"
          placeholder="Last Name"
          required />

        <label htmlFor="inputRole" className="sr-only">Role</label>
        <input
          onChange={this.roleChange}
          value={credentials.role}
          type="text"
          id="inputRole"
          className="form-control"
          placeholder="Role"
          required />

        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        {errorMessage && <p id="error-message">{errorMessage}</p>}
      </form>
    );
  }
}

