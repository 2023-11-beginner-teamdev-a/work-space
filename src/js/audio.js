export default class Audio {
  constructor() {
    this.audio = document.getElementById('audio');
    this.toggleAudio = document.getElementById('toggleAudio');
  }

  enableMute() {
    this.toggleAudio.addEventListener('click', () => {
      this.toggleAudio.innerHTML = this.toggleAudio.innerHTML === 'OFF' ? 'ON' : 'OFF';
      this.audio.muted = !this.audio.muted;
    });
  }
}
