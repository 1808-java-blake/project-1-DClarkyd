import * as React from 'react';
import { environment } from '../../environment';
import { updateUsername } from '../../actions/sign-in/sign-in.actions';

export class CheckAllReimbursements extends React.Component<any, any>  {

  public constructor(props: any) {
    super(props);
    const userJSON = localStorage.getItem("user")
    const user = userJSON !== null ? JSON.parse(userJSON) : updateUsername
    this.state = {
      reimbursementId: 0,
      reimbursements: [],
      status: [],
      username: user
    }
  }

  public componentDidMount() {
    console.log(this.state.reimbursements)
    if (this.state.reimbursements.length === 0) {
      fetch(environment.context + `reimbursements`, {
        credentials: 'include',
      })
        .then(resp => resp.json())
        .then(reimbursements => {
          this.setState({ reimbursements })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  public onApprove = (reimbursementId: any, e: any) => {
    e.preventDefault()
    console.log("reimbursementId:" + reimbursementId)
    fetch(environment.context + `reimbursements/add-Approve/${reimbursementId}`, {
      body: JSON.stringify(this.state.credentials),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
    .then(resp => resp.json())
    .then(reimbursements => {
      this.setState({ reimbursements })
    })
      .then(resp => {
        localStorage.setItem('reimbursement', JSON.stringify(resp));

      })
      .catch(err => {
        console.log(err);
      })
  }

  public onDeny = (reimbursementId: any, e: any) => {
    e.preventDefault()
    console.log("reimbursementId:" + reimbursementId)
    fetch(environment.context + `reimbursements/add-Deny/${reimbursementId}`, {
      body: JSON.stringify(this.state.credentials),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
    .then(resp => resp.json())
    .then(reimbursements => {
      this.setState({ reimbursements })
    })
      .then(resp => {
        localStorage.setItem('reimbursement', JSON.stringify(resp));
        // this.props.history.push('/home');
      })
      .catch(err => {
        console.log(err);
      })
  }

  public onFilterApproved = (e: any) => {
    e.preventDefault()

    fetch(environment.context + `reimbursements/filter-approved`, {
      credentials: 'include',
    })
      .then(resp => resp.json())
      .then(reimbursements => {
        this.setState({ reimbursements })
      })
      .catch(err => {
        console.log(err)
      })
  }

  public onFilterDenied = (e: any) => {
    e.preventDefault()

    fetch(environment.context + `reimbursements/filter-denied`, {
      credentials: 'include',
    })
      .then(resp => resp.json())
      .then(reimbursements => {
        this.setState({ reimbursements })
      })
      .catch(err => {
        console.log(err)
      })
  }

  public onFilterPending = (e: any) => {
    e.preventDefault()

    fetch(environment.context + `reimbursements/filter-pending`, {
      credentials: 'include',
    })
      .then(resp => resp.json())
      .then(reimbursements => {
        this.setState({ reimbursements })
      })
      .catch(err => {
        console.log(err)
      })
  }

  public render() {
    return (

      <table style={{background: '#ADD8E6'}} className="table table-striped">

        <thead>
          <tr>
            <th scope="col"> #</th>
            <th scope="col">Amount</th>
            <th scope="col">Time Submitted</th>
            <th scope="col">Time Resolved</th>
            <th scope="col">Description</th>
            <th scope="col">Author</th>
            <th scope="col">Resolver</th>
            <th scope="col">Type</th>
            <th scope="col">
              <div>Filter Status By:</div>
              <button className="btn btn-lg btn-primary btn-block"
                onClick={(e) => this.onFilterPending(e)}>
                Pending
           </button>
              <button className="btn btn-lg btn-primary btn-block"
                onClick={(e) => this.onFilterApproved(e)}>
                Approved
           </button>
              <button className="btn btn-lg btn-primary btn-block"
                onClick={(e) => this.onFilterDenied(e)}>
                Denied
        </button>
              <div>Status</div>
            </th>
          </tr>
        </thead>
        <tbody id="reimbursement-table-body">
          {
            this.state.reimbursements.map((reimbursement: any) => (
              <tr key={reimbursement.id} >
                <td>{reimbursement.id}

                  <button
                    className="btn btn-lg btn-primary btn-block"
                    onClick={(e) => this.onApprove(reimbursement.id, e)}
                  >Approve</button>

                  <button
                    className="btn btn-lg btn-primary btn-block"
                    onClick={(e) => this.onDeny(reimbursement.id, e)}
                  >Deny</button>

                </td>
                <td>{reimbursement.amount}</td>
                <td>{reimbursement.submitted}</td>
                <td>{reimbursement.resolved}</td>
                <td>{reimbursement.description}</td>
                <td>{reimbursement.author}</td>
                <td>{reimbursement.resolver}</td>
                <td>
                  {reimbursement.typeId === 0 ? "Lodging" : reimbursement.typeId === 2 ? "Travel" : reimbursement.typeId === 3 ? "Food" : "Other"}
                </td>
                <td>{reimbursement.statusId === 0 ? "pending" : reimbursement.statusId === 1 ? "approved" : "denied"}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}
