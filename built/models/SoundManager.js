class SoundManager {
    static playSound(audio) {
        if (!this.isMuted)
            audio.play();
    }
    static toggleMute() {
        this.isMuted = !this.isMuted;
    }
}
SoundManager.isMuted = false;
