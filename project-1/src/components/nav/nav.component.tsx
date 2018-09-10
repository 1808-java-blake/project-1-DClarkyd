import * as React from 'react';
import { Link } from 'react-router-dom';
export const AppNav: React.StatelessComponent<{}> = () => {
  
  const bgColors = { 
                    "Blue": "#00B1E1",
                    "Cyan": "#37BC9B",
                    "Default": "#81b71a",
                    "Green": "#8CC152",
                    "Red": "#E9573F",
                    "Yellow": "#F6BB42",
};

  return (
    
    <div>
      <nav className="navbar navbar-toggleable-md navbar-expand-lg navbar-light bg-light display-front nav-pad" >
        <div className="navbar-header c-pointer shift-left" >
        </div>
        <button  className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarsExample04">
          <ul className="navbar-nav ml-auto margin-nav">
            <li style={{backgroundColor: bgColors.Yellow}} className="nav-item active">
              <Link to="/check-status" className="unset-anchor nav-link">Home</Link>
            </li>
            <li style={{backgroundColor: bgColors.Cyan}} className="nav-item active">
              <Link to="/sign-in" className="unset-anchor nav-link">Sign In</Link>
            </li>

            <li style={{backgroundColor: bgColors.Yellow}} className="nav-item active">
              <Link to="/check-reimbursements" className="unset-anchor nav-link">Check All Reimbursements</Link>
            </li>

            <li style={{backgroundColor: bgColors.Cyan}}className="nav-item active">
              <Link to="/add-reimbursement" className="unset-anchor nav-link">New Reimbursement</Link>
            </li>

                        <li style={{backgroundColor: bgColors.Yellow}} className="nav-item active">
              <Link to="/check-status" className="unset-anchor nav-link">Check Status of Reimbursement</Link>
            </li>

            <li style={{backgroundColor: bgColors.Cyan}} className="nav-item active">
              <Link to="/log-out" className="unset-anchor nav-link">Log Out</Link>
            </li>
            <li className="nav-item active">

            </li>
          </ul>
        </div>
      </nav>
    </div >
  );
}