
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

class AudioSystem {
    private ctx: AudioContext | null = null;
    private isMuted: boolean = false;
    private gainNode: GainNode | null = null;
    private initialized: boolean = false;
    
    // BGM State
    private bgmAudio: HTMLAudioElement;
    private isBgmPlaying: boolean = false;

    // Volume State
    private bgmVolume: number = 0.5;
    private sfxVolume: number = 0.5;
  
    constructor() {
      // Check localStorage for preference
      const savedMute = localStorage.getItem('tkynox_muted');
      this.isMuted = savedMute === 'true';

      const savedBgmVol = localStorage.getItem('tkynox_bgm_vol');
      if (savedBgmVol) this.bgmVolume = parseFloat(savedBgmVol);

      const savedSfxVol = localStorage.getItem('tkynox_sfx_vol');
      if (savedSfxVol) this.sfxVolume = parseFloat(savedSfxVol);

      // Initialize BGM with the new track
      this.bgmAudio = new Audio('https://audio.jukehost.co.uk/2yCd1ITDOPEBgavcC0UtQynYZLewrgvs');
      this.bgmAudio.loop = true;
      this.bgmAudio.volume = this.isMuted ? 0 : this.bgmVolume;
    }
  
    public init() {
      if (this.initialized) return;
      
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        this.ctx = new AudioContextClass();
        this.gainNode = this.ctx.createGain();
        this.gainNode.connect(this.ctx.destination);
        this.initialized = true;
      } catch (e) {
        console.error("Audio API not supported", e);
      }
    }
  
    public toggleMute() {
      this.isMuted = !this.isMuted;
      localStorage.setItem('tkynox_muted', String(this.isMuted));
      
      if (this.isMuted) {
          this.bgmAudio.volume = 0;
      } else {
          this.bgmAudio.volume = this.bgmVolume;
          // If unmuting, ensure context is running
          if (this.ctx?.state === 'suspended') {
              this.ctx.resume();
          }
          // If we aren't playing but should be (e.g., app initialized), try to play
          if (!this.isBgmPlaying) {
              this.startBGM();
          }
      }
      
      return this.isMuted;
    }
  
    public getMuteState() {
        return this.isMuted;
    }

    public getBGMVolume() {
        return this.bgmVolume;
    }

    public getSFXVolume() {
        return this.sfxVolume;
    }

    public setBGMVolume(val: number) {
        this.bgmVolume = Math.max(0, Math.min(1, val));
        localStorage.setItem('tkynox_bgm_vol', String(this.bgmVolume));
        if (!this.isMuted) {
            this.bgmAudio.volume = this.bgmVolume;
        }
    }

    public setSFXVolume(val: number) {
        this.sfxVolume = Math.max(0, Math.min(1, val));
        localStorage.setItem('tkynox_sfx_vol', String(this.sfxVolume));
    }

    public startBGM() {
        // Try to play. Browsers may block if no interaction, but this is usually called after click.
        const playPromise = this.bgmAudio.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                this.isBgmPlaying = true;
            }).catch(error => {
                console.warn("Audio playback prevented (likely due to browser policy). Waiting for interaction.", error);
            });
        }
        
        // Ensure SFX system is ready too
        this.init();
    }

    public stopBGM() {
        this.bgmAudio.pause();
        this.isBgmPlaying = false;
    }
  
    private playTone(freq: number, type: OscillatorType, duration: number, volume: number = 0.1, delay: number = 0) {
      if (this.isMuted) return;
      this.init();
      if (!this.ctx || !this.gainNode) return;
  
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
  
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
  
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + delay);
      
      // Calculate effective volume based on master SFX setting
      const effectiveVol = volume * this.sfxVolume;

      // Envelope - Snappier for "fun" feel
      gain.gain.setValueAtTime(0, this.ctx.currentTime + delay);
      gain.gain.linearRampToValueAtTime(effectiveVol, this.ctx.currentTime + delay + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + delay + duration);
  
      osc.connect(gain);
      gain.connect(this.gainNode);
  
      osc.start(this.ctx.currentTime + delay);
      osc.stop(this.ctx.currentTime + delay + duration);
    }
  
    // --- SFX PRESETS ---
  
    public playClick() {
      // Cleaner, higher pitched "Pop"
      this.playTone(1000, 'sine', 0.1, 0.05);
    }
  
    public playHover() {
      // Very subtle high tick
      this.playTone(2000, 'triangle', 0.01, 0.01);
    }
  
    public playSuccess() {
      // Fast Major Arpeggio (C Major) - Bright and Game-like
      const vol = 0.08;
      this.playTone(523.25, 'sine', 0.1, vol, 0);    // C5
      this.playTone(659.25, 'sine', 0.1, vol, 0.05); // E5
      this.playTone(783.99, 'sine', 0.1, vol, 0.10); // G5
      this.playTone(1046.50, 'sine', 0.3, vol, 0.15); // C6
    }
  
    public playError() {
      // Quick descending buzz
      this.playTone(200, 'sawtooth', 0.15, 0.05, 0);
      this.playTone(100, 'sawtooth', 0.15, 0.05, 0.1);
    }
  
    public playNotification() {
      // Gentle chime
      this.playTone(880, 'sine', 0.3, 0.05, 0);
      this.playTone(1760, 'sine', 0.5, 0.03, 0.1);
    }
  
    public playTyping() {
      // Light mechanical click
      const freq = 1200 + Math.random() * 400;
      this.playTone(freq, 'square', 0.015, 0.01);
    }
    
    public playProcessing() {
        // Computer thinking
        this.playTone(800, 'square', 0.05, 0.02, 0);
        this.playTone(1200, 'square', 0.05, 0.02, 0.08);
    }
  }
  
  export const audioSystem = new AudioSystem();
