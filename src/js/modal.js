export default class Modal {
  openModal(message) {
    const modal = document.getElementById('modal');
    const modalResult = document.getElementById('modal-result');
    modal.style.display = 'block';
    modalResult.innerHTML = message;
    modal.addEventListener('click', (event) => {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    });
  }
}
