export default class Modal {
  constructor() {
    this.modal = document.getElementById('modal');
  }

  displayResults(winner, scores) {
    this.open();
    const modalResult = document.getElementById('modal-result');
    const message = winner === null ? 'Draw' : `Winner is ${winner.symbol}`;
    modalResult.innerHTML = `
      ${message} <br>
      X: ${scores.x}, O: ${scores.o}, Draw: ${scores.draw}
    `;
    this.close();
  }

  open() {
    this.modal.style.display = 'block';
  }

  close() {
    this.modal.addEventListener('click', (event) => {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    });
  }
}
