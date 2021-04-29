export interface SoundsProps {
    [key: string]: GameSound
}

export interface GameSoundConstructorProps {
    autoplay?: boolean
    loop?: boolean
    remote?: boolean
    muted?: boolean
}

export class GameSound {
    sound: HTMLAudioElement;

    constructor(src: string, {
        remote = false,
        autoplay = false,
        loop = false,
        muted = false,
    } = {} as GameSoundConstructorProps) {
        this.sound = document.createElement('audio');
        this.sound.src = src;
        this.sound.setAttribute('preload', 'auto');
        this.sound.setAttribute('controls', 'none');
        this.sound.autoplay = autoplay;
        this.sound.loop = loop;
        this.sound.muted = muted;
        this.sound.style.display = remote ? 'block' : 'none';

        document.body.appendChild(this.sound);

        this.unmute = this.unmute.bind(this);
    }

    play() {
        return this.sound.play();
    }

    stop() {
        this.sound.pause();
    }

    reload() {
        this.sound.load();
    }

    unmute() {
        this.sound.muted = false;
    }

    trigger() {
        this.reload();
        this.play();
    }

    change(src: string) {
        this.stop();
        this.sound.src = src;

        return this.play();
    }

    remove() {
        this.sound.remove();
    }
}
