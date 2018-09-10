
function createReimbursement(event) {
  event.preventDefault();
  const amount = document.getElementById('input-amount').value;
  const description = document.getElementById('input-description').value;
  const author = document.getElementById('input-author').value;
  const typeId = document.getElementById('input-typeId').value

  const movie = {
    amount,
    description,
    author,
    typeId
  }
  const credentials = { amount, description, author, typeId }
  fetch('http://localhost:9011/reimbursements/add-reimbursement', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(reimbursement)
  })
    .then(resp => resp.json())
    .then(resp => {
      console.log('creating reimbursement')
      window.location = 'http://localhost:9011/home/home.html';
    })
    .catch(err => {
      console.log(err);
    });
}