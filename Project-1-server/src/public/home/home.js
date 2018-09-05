function addMovieToTable(reimbursement) {
  const tbody = document.getElementById('reimbursement-table-body');
  tbody.innerHTML += `
  <tr>
    <th scope="row">${reimbursement.amount}</th>
    <td>${reimbursement.author}</td>
    <td>${reimbursement.description}</td>
  </tr>
  `
}

fetch('http://localhost:9011/reimbursements')
  .then(res => res.json())
  .then(res => {
    res.forEach(reimbursement => {
      addReimbursementToTable(reimbursement);
    })
  })
  .catch(err => {
    console.log(err);
  })