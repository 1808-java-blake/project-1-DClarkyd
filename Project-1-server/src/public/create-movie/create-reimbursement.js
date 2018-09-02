console.log('loading js');
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

  fetch('http://localhost:3010/reimbursement', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reimbursement)
  })
    .then(resp => resp.json())
    .then(resp => {
      window.location = 'http://localhost:3010/home/home.html';
    })
    .catch(err => {
      console.log(err);
    });
}