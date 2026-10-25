/**
 * Refined, decluttered content for DEEP WORK.
 * Official promotional website for the Google Play published app.
 */

export const brand = {
  name: 'Deep Work',
  wordmark: 'DEEP WORK',
  tagline: 'Where silence meets absolute discipline.',
  playStoreUrl: 'https://play.google.com/store/apps/details?id=com.deepworkapp',
  minAndroid: 'Android 7.0+',
  developer: {
    name: 'Sidharth R',
    github: 'https://github.com/trahdiscode',
    repo: 'https://github.com/trahdiscode/DeepWorkApp',
  },
};

export const nav = [
  { label: 'Themes', href: '#themes' },
  { label: 'Features', href: '#features' },
  { label: 'Soundscapes', href: '#sounds' },
  { label: 'Get App', href: '#download' },
];

export const appThemes = [
  {
    id: 'espresso',
    name: 'Espresso',
    label: 'Warm Monastic',
    subtitle: 'Default Monastic Theme',
    typography: 'Lora Serif Typography',
    desc: 'Deep warm espresso background paired with a caramel-gold countdown ring. Tuned for quiet evening sessions and deep reading.',
    image: '/screenshots/theme_espresso.jpg',
    accentColor: '#D4A373',
    paletteName: 'Warm Espresso & Caramel Gold',
    mode: 'Dark Mode',
  },
  {
    id: 'aurora',
    name: 'Aurora',
    label: 'Nordic Slate',
    subtitle: 'High-Tech Engineering',
    typography: 'Outfit Geometric Sans',
    desc: 'Cool obsidian-slate backdrop with an icy frost-white countdown ring. Engineered for complex programming and analytical architecture.',
    image: '/screenshots/theme_aurora.jpg',
    accentColor: '#8EBBFF',
    paletteName: 'Nordic Slate & Frost Ice',
    mode: 'Dark Mode',
  },
  {
    id: 'blush',
    name: 'Blush / Noir',
    label: 'Porcelain Light',
    subtitle: 'Daylight Productivity',
    typography: 'Outfit SemiBold',
    desc: 'Radiant porcelain surface with soft dusty rose and wine accents. Crafted for bright morning light and gentle visual contrast.',
    image: '/screenshots/theme_blush.jpg',
    accentColor: '#A6596A',
    paletteName: 'Porcelain & Dusty Rose',
    mode: 'Light Mode',
  },
  {
    id: 'nothing',
    name: 'Nothing OS Inspired',
    label: 'Dot-Matrix Industrial',
    subtitle: 'Radical Typographic Restraint',
    typography: 'Dot-Matrix LED Glyph',
    desc: 'Pure monochrome pitch black with a dot-matrix digital clock and stark red focus point. Inspired by iconic industrial hardware.',
    image: '/screenshots/theme_nothing.jpg',
    accentColor: '#E11D48',
    paletteName: 'Pure Black & Industrial Red',
    mode: 'Dark Mode',
  },
];

export const corePillars = [
  {
    step: '01',
    title: 'Shorts & Reels Anti-Scroll Engine',
    desc: 'Automated barrier intercepts YouTube Shorts and Instagram Reels the instant they render. Disables picture-in-picture bypass and kills the infinite dopamine loop before it starts.',
    badge: '0.0ms Interception',
  },
  {
    step: '02',
    title: 'Granular YouTube Channel Filter',
    desc: 'Keep access to educational coding lectures and university tutorials while locking out clickbait and entertainment channels via local Room database rules.',
    badge: 'Whitelist & Blacklist',
  },
  {
    step: '03',
    title: 'Acoustic Resonance & Custom Audio',
    desc: 'Built-in offline sound machine with 40Hz Gamma Focus, 10Hz Alpha Flow, Deep Brown Noise, and Monastic Rain. Long-press to loop any custom audio file.',
    badge: '40Hz Gamma Synced',
  },
  {
    step: '04',
    title: 'Monastic Strict Mode & Password Lock',
    desc: 'Dynamic launcher lock with emergency friction challenges and PIN/password protection. Ensures you cannot impulsively quit before the timer expires.',
    badge: 'Tamper-Proof Lock',
  },
];

export const audioTracks = [
  {
    id: 'gamma',
    title: '40Hz Gamma Focus',
    sub: 'Cognitive synchrony & deep problem-solving',
    file: '/audio/sound_gamma_40hz.ogg',
    badge: 'Binaural Carrier',
    accent: '#D4A373',
  },
  {
    id: 'alpha',
    title: '10Hz Alpha Flow',
    sub: 'Relaxed alertness, learning & clarity',
    file: '/audio/sound_alpha_10hz.ogg',
    badge: 'Binaural Flow',
    accent: '#8EBBFF',
  },
  {
    id: 'brown',
    title: 'Deep Brown Noise',
    sub: 'Sub-bass acoustic mask against background noise',
    file: '/audio/sound_brown_noise.ogg',
    badge: 'Acoustic Shield',
    accent: '#d97706',
  },
  {
    id: 'rain',
    title: 'Monastic Rainfall',
    sub: 'Natural rhythmic white noise for calm',
    file: '/audio/sound_rain.ogg',
    badge: 'Natural White Noise',
    accent: '#38bdf8',
  },
];
