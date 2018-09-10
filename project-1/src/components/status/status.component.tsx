import * as React from 'react';
import { environment } from '../../environment';
import { updateUsername } from '../../actions/sign-in/sign-in.actions';

export class CheckStatus extends React.Component<any, any>  {

  public constructor(props: any) {
    super(props);
    const userJSON = localStorage.getItem("user")
    const user = userJSON !== null ? JSON.parse(userJSON) : updateUsername
    this.state = {
      reimbursements: [],
      username: user
    }
  }

  public componentDidMount() {

    let usersId = this.state.username.usersId
    console.log(this.state.username.roleId)
    usersId = Number(usersId);
    
    fetch(environment.context + `reimbursements/${usersId}`, {
      // body: JSON.stringify(user),
      credentials: 'include',
    })
      .then(resp => resp.json())
      .then(reimbursements => {

        this.setState({ reimbursements })
        console.log(reimbursements)
      })
      .catch(err => {
        console.log(err)
      })
  }

  public render() {
    // console.log(localStorage.getItem("user"))
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
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody id="reimbursement-table-body">
          {
            this.state.reimbursements.map((reimbursement: any) => (
              <tr key={reimbursement.id} >
                <td>{reimbursement.id}</td>
                <td>{reimbursement.amount}</td>
                <td>{reimbursement.submitted}</td>
                <td>{reimbursement.resolved}</td>
                <td>{reimbursement.description}</td>
                <td>{reimbursement.author}</td>
                <td>{reimbursement.resolver}</td>
                <td>{reimbursement.typeId === 0? "Lodging":
                 reimbursement.typeId === 2? "Travel":
                  reimbursement.typeId === 3? "Food":
                   "Other" }</td>
                <td>{reimbursement.statusId === 0 ? "pending" : reimbursement.statusId === 1 ? "approved" : "denied"}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}
