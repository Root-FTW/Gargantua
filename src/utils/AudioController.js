export class AudioController {
    constructor() {
        this.audio = document.getElementById('backgroundMusic');
        this.indicator = document.getElementById('audioIndicator');
        this.status = document.getElementById('audioStatus');
        this.initialized = false;
        this.context = null;

        this.setupListeners();
    }

    setupListeners() {
        if (this.indicator) {
            this.indicator.addEventListener('click', () => this.toggleAudio());
        }

        // Auto-hide logic
        this.interactionTimeout = null;
        ['mousemove', 'click', 'keydown'].forEach(event => {
            document.addEventListener(event, () => this.handleInteraction(), { passive: true });
        });
    }

    handleInteraction() {
        if (this.indicator && this.indicator.style.display !== 'none') {
            this.indicator.style.opacity = '0.8';
            clearTimeout(this.interactionTimeout);
            this.interactionTimeout = setTimeout(() => {
                this.indicator.style.opacity = '';
            }, 3000);
        }
    }

    async init() {
        if (this.initialized) return;

        try {
            this.context = new (window.AudioContext || window.webkitAudioContext)();
            this.initialized = true;
            await this.attemptAutoplay();
        } catch (e) {
            console.warn('Web Audio API not supported or failed to initialize', e);
        }
    }

    async attemptAutoplay() {
        if (!this.audio) return;

        try {
            await this.audio.play();
            this.updateStatus('🔊 Audio playing');
            this.showIndicator();
        } catch (error) {
            // Fallback to muted
            this.audio.muted = true;
            await this.audio.play();
            this.updateStatus('🔇 Click to enable audio');
            this.showIndicator();
        }
    }

    toggleAudio() {
        if (!this.audio) return;

        if (this.audio.muted) {
            this.audio.muted = false;
            this.updateStatus('🔊 Audio playing');
        } else {
            if (this.audio.paused) {
                this.audio.play();
                this.updateStatus('🔊 Audio playing');
            } else {
                this.audio.pause();
                this.updateStatus('🔇 Audio paused');
            }
        }
    }

    updateStatus(text) {
        if (this.status) this.status.textContent = text;
    }

    showIndicator() {
        if (this.indicator) this.indicator.style.display = 'block';
    }
}
