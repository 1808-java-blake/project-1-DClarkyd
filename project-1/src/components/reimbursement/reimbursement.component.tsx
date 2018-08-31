import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface IState {
  credentials: {
    reimbAmount: number,
    reimbSubmitted: string,
    reimbDescription: string,
    reimbAuthor: string
  },
  errorMessage: string
}

export class ReimbursementComponent extends React.Component<RouteComponentProps<{}>, IState>{

  constructor(props: any) {
    super(props);
    this.state = {
      credentials: {
        reimbAmount: 0,
        reimbAuthor: '',
        reimbDescription: '',
        reimbSubmitted: ''
      },
      errorMessage: ''
    }
  }

  public reimbAmountSet = (e: any) => {
    this.setState({
      ...this.state,
      credentials: {
        ...this.state.credentials,
        reimbAmount: e.target.value
      }
    });
  }

  public reimbAuthorSet = (e: any) => {
    this.setState({
      ...this.state,
      credentials: {
        ...this.state.credentials,
        reimbAuthor: e.target.value
      }
    });
  }

  public reimbSubmittedSet = (e: any) => {
    this.setState({
      ...this.state,
      credentials: {
        ...this.state.credentials,
        reimbSubmitted: e.target.value
      }
    });
  }

  public reimbDescriptionSet = (e: any) => {
    this.setState({
      ...this.state,
      credentials: {
        ...this.state.credentials,
        reimbDescription: e.target.value
      }
    });
  }

  public submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch('http://localhost:3000/users/reimbursement', {
      body: JSON.stringify(this.state.credentials),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then(resp => {
        console.log(resp.status)
         if (resp.status === 200) {
          return resp.json();
        } else {
          this.setState({
            ...this.state,
            errorMessage: 'Failed to submit the reimbursement at this time'
          });
        }
        throw new Error('Failed to reimburse');
      })
      .catch(err => {
        console.log(err);
      })
    }

  public render() {
       const { errorMessage, credentials } = this.state;
       const date = new Date()
       console.log(date)
       return (
         <form className="form-signup" onSubmit={this.submit}>
           <h1 className="h3 mb-3 font-weight-normal">Please fill in the reimbursement information</h1>
            {this.reimbSubmittedSet}

           <label htmlFor="inputReimbAmount" className="sr-only">Reimbursement Amount</label>
           <input
             onChange={this.reimbAmountSet}
             value={credentials.reimbAmount}
             type="number"
             id="inputReimbAmount"
             className="form-control"
             placeholder="Reimbursement Amount"
             required />
   
           <label htmlFor="inputReimbAuthour" className="sr-only">Reimbursement Author</label>
           <input
             onChange={this.reimbAuthorSet}
             value={credentials.reimbAuthor}
             type="text"
             id="inputReimbAuthor"
             className="form-control"
             placeholder="Reimbursement Author"
             required />
   
           <label htmlFor="inputReimbDescription" className="sr-only">Reimbursement Description</label>
           <input
             onChange={this.reimbDescriptionSet}
             value={credentials.reimbDescription}
             type="text"
             id="inputEmail"
             className="form-control"
             placeholder="Reimbursement Description"
             required />
   
           {/* <label htmlFor="inputReimbSubmitted" className="sr-only">Reimbursement Submitted</label>
           <div
             onChange={this.reimbSubmittedSet}
             value={credentials.reimbDescription}
             type="date"
             id="inputEmail"
             className="form-control"
             placeholder="Reimbursement Description"
              /> */}

           <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
           {errorMessage && <p id="error-message">{errorMessage}</p>}
         </form>
       );
     }
}

