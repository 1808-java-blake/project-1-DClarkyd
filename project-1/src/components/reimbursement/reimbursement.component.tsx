import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { environment } from '../../environment';
import { updateUsername } from '../../actions/sign-in/sign-in.actions';

interface IState {
  credentials: {
    reimbAmount: number,
    reimbDescription: string,
    reimbAuthor: number,
    reimbType: number
  },
  errorMessage: string
}

export class ReimbursementComponent extends React.Component<RouteComponentProps<{}>, IState>{

  constructor(props: any) {
    super(props);
    this.onReimbAmountSet = this.onReimbAmountSet.bind(this)
    this.onReimbDescriptionSet = this.onReimbDescriptionSet.bind(this)
    this.onReimbTypeSet = this.onReimbTypeSet.bind(this)

    const userJSON = localStorage.getItem("user")
    const user = userJSON !== null ? JSON.parse(userJSON) : updateUsername
    
    this.state = {
      credentials: {
        reimbAmount: 0,
        reimbAuthor: Number(user.usersId),
        reimbDescription: '',
        reimbType: 0
      },
      errorMessage: ''
    }
  }

  public onReimbAmountSet = (e: any) => {
    this.setState({
      ...this.state,
      credentials: {
        ...this.state.credentials,
        reimbAmount: e.target.value
      }
    });
  }

  public onReimbDescriptionSet = (e: any) => {
    this.setState({
      ...this.state,
      credentials: {
        ...this.state.credentials,
        reimbDescription: e.target.value
      }
    });
  }

  public onReimbTypeSet = (e: any) => {
    
    this.setState({
      ...this.state,
      credentials: {
        ...this.state.credentials,
        reimbType: e.target.value
      }
    });
    console.log(this.state)
  }

  public onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(environment.context + 'reimbursements/add-reimbursement', {

      body: JSON.stringify(this.state.credentials),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then(resp => {
        // console.log(resp.status)
        if (resp.status === 401) {
          this.setState({
            ...this.state,
            errorMessage: 'Invalid Credentials'
          });
        } else if (resp.status === 201) {
          return resp.json();
        } else {
          this.setState({
            ...this.state,
            errorMessage: 'Failed to submit the reimbursement at this time'
          });
        }
        throw new Error('Failed to reimburse');
      })
      .then(resp => {
        localStorage.setItem('reimbursement', JSON.stringify(resp));
        this.props.history.push('/home');
      })
      .catch(err => {
        console.log(err);
      })
  }

  public render() {
    const { errorMessage, credentials } = this.state;
    // const date = new Date()
    return (
      <form style={{background: '#ADD8E6'}} className="form-signup" onSubmit={this.onSubmit}>
        <h1 className="h3 mb-3 font-weight-normal">Please fill in the reimbursement information</h1>

        <div>Reimbursement Amount:</div>
        <label htmlFor="inputReimbAmount" className="sr-only">Reimbursement Amount</label>
        <input
          onChange={this.onReimbAmountSet}
          value={credentials.reimbAmount}
          type="number"
          id="inputReimbAmount"
          className="form-control"
          placeholder="Reimbursement Amount"
          required />

        <label htmlFor="inputReimbDescription" className="sr-only">Reimbursement Description</label>
        <input
          onChange={this.onReimbDescriptionSet}
          value={credentials.reimbDescription}
          type="text"
          id="inputEmail"
          className="form-control"
          placeholder="Reimbursement Description"
          required />


        <div className="form-group">
          <label htmlFor="inputReimbType" >Reimbursement Type:</label>
          <select className="form-control"
           id="sel1" 
          onChange={this.onReimbTypeSet}
          value={credentials.reimbType}
          placeholder="Reimbursement Type"
     >
            <option value = "1">Lodging</option>
            <option value = "2">Travel</option>
            <option value = "3">Food</option>
            <option value = "4">Other</option>
          </select>
        </div>

        <button className="btn btn-lg btn-primary btn-block" type="submit" value="Add Node server">Sign in</button>
        {errorMessage && <p id="error-message">{errorMessage}</p>}
      </form>
    );
  }
}

