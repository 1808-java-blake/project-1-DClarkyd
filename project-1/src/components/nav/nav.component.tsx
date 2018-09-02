import * as React from 'react';
import { Link } from 'react-router-dom';
export const AppNav: React.StatelessComponent<{}> = () => {
  return (
    <div>
      <nav className="navbar navbar-toggleable-md navbar-expand-lg navbar-light bg-light display-front nav-pad">
        <div className="navbar-header c-pointer shift-left">
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarsExample04">
          <ul className="navbar-nav ml-auto margin-nav">
            <li className="nav-item active">
              <Link to="/home" className="unset-anchor nav-link">Home</Link>
            </li>
            <li className="nav-item active">
              <Link to="/sign-in" className="unset-anchor nav-link">Sign In</Link>
            </li>
            <li className="nav-item active">
              <Link to="/sign-up" className="unset-anchor nav-link">Sign Up</Link>
            </li>

            <li className="nav-item active">
              <Link to="/check-reimbursements" className="unset-anchor nav-link">Check All Reimbursements</Link>
            </li>

            <li className="nav-item active">
              <Link to="/reimbursement" className="unset-anchor nav-link">New Reimbursement</Link>
            </li>

                        <li className="nav-item active">
              <Link to="/check-status" className="unset-anchor nav-link">Check Status of Reimbursement</Link>
            </li>



            <li className="nav-item active dropdown">
              <a className="nav-link dropdown-toggle pointer" id="examples-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Examples</a>
              <div className="dropdown-menu" aria-labelledby="examples-dropdown">
                    </div>
            </li>
            <li className="nav-item active">

            </li>
          </ul>
        </div>
      </nav>
    </div >
  );
}