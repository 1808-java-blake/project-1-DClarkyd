function addReimbursementToTable(reimbursement) {
  const tbody = document.getElementById('reimbursement-table-body');
  let status = 'processing'
  if (reimbursement.statusId === 1) {
    status = 'accepted'
  }
  else if (reimbursement.statusId === 2) {
    status = 'denied'
  }

  tbody.innerHTML += `
  <tr>
    <th scope="row">${reimbursement.amount}</th>
    <td>${reimbursement.author}</td>
    <td>${reimbursement.description}</td>
    <td>${status}</td>
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