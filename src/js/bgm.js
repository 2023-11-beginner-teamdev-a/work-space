export default class BGM {
  constructor() {
    this.toggleAudio = document.getElementById('toggleAudio');
    this.put = new Audio('../audio/試合終了のゴング.mp3');
    this.enableMute = this.enableMute.bind(this);
  }

  enableMute() {
    this.toggleAudio.innerText = this.toggleAudio.innerText === 'OFF' ? 'ON' : 'OFF';
    if (this.toggleAudio.innerText === 'ON'){
      alert("勝敗決定時に効果音が出ます。音が出ても良い環境で実行してください")
    }
  }

  bgmregister() {
    this.toggleAudio.addEventListener('click', this.enableMute);
  }

  playbgm(){
    if (this.toggleAudio.innerText==='ON'){
      this.put.play();
    }
  }

}

