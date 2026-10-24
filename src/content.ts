/**
 * Complete copy and structured content for DEEP WORK.
 * Official promotional website for the Google Play published focus operating system.
 */

export const brand = {
  name: 'Deep Work',
  wordmark: 'DEEP WORK',
  badge: 'OFFICIAL GOOGLE PLAY RELEASE',
  protocol: 'OFFLINE FOCUS OPERATING SYSTEM',
  version: 'v2.4.0 ON GOOGLE PLAY',
  email: 'monk@deepwork.app',
  playStoreUrl: 'https://play.google.com/store/apps/details?id=com.deepworkapp',
  minAndroid: 'Android 7.0+',
  developer: {
    name: 'Sidharth R',
    github: 'https://github.com/trahdiscode',
    repo: 'https://github.com/trahdiscode/DeepWorkApp',
  },
  tagline: 'WHERE SILENCE MEETS ABSOLUTE DISCIPLINE',
};

export const nav = [
  { label: 'Features', href: '#features' },
  { label: 'Themes', href: '#themes' },
  { label: 'Acoustic Shield', href: '#acoustic' },
  { label: 'Trajectory', href: '#trajectory' },
  { label: 'Get on Google Play', href: '#download' },
];

export const hero = {
  kicker: '// COGNITIVE DEFENSE OS • NOW ON GOOGLE PLAY',
  titleWord1: 'DEEP',
  titleWord2: 'WORK',
  creed: 'WHERE SILENCE MEETS ABSOLUTE DISCIPLINE',
  chronometer: '25 : 00',
  resonance: '432Hz / 40Hz GAMMA',
  flowRate: '100% OFFLINE',
  status: 'NOW AVAILABLE ON GOOGLE PLAY STORE',
  scrollPrompt: 'SCROLL TO EXPLORE FEATURES & THEMES',
};

export const currentFeatures = [
  {
    category: 'ANTI-DISTRACTION DEFENSE',
    title: 'Shorts & Reels Anti-Scroll Engine',
    desc: 'Automated barrier intercepts YouTube Shorts and Instagram Reels at the exact millisecond they render, terminating the algorithmic doom-scroll before dopamine triggers.',
    badge: '0.0ms Interception',
    icon: 'blocker',
  },
  {
    category: 'GRANULAR CONTROL',
    title: 'YouTube Channel Whitelist & Blacklist',
    desc: 'Keep access to educational coding lectures and tutorials while locking out brain-rot channels. Local Room database stores your custom channel rules.',
    badge: 'Custom Rules',
    icon: 'youtube',
  },
  {
    category: 'COGNITIVE RHYTHM',
    title: 'Tactile Focus Timer & Flow Mode',
    desc: 'Instant 25m, 50m, 90m chips plus custom lengths. Includes pre-session box breathing countdown to quiet the nervous system, and infinite Flow Mode.',
    badge: '25 / 50 / 90m',
    icon: 'timer',
  },
  {
    category: 'ACOUSTIC SANCTUARY',
    title: 'Synthesized Binaural Frequencies & Custom Audio',
    desc: 'Built-in offline sound machine with 40Hz Gamma Focus, 10Hz Alpha Flow, Deep Brown Noise, and Monastic Rain. Plus long-press to loop any custom audio file.',
    badge: '40Hz Gamma Synced',
    icon: 'audio',
  },
  {
    category: 'UNBREAKABLE DISCIPLINE',
    title: 'Monastic Strict Mode & Password Lock',
    desc: 'Tamper-proof emergency lock with PIN/password friction delay. Prevents impulsive session abandonment while keeping banking apps safe with conflict resolver.',
    badge: 'Tamper-Proof',
    icon: 'lock',
  },
  {
    category: 'THOUGHT MANAGEMENT',
    title: 'Mind Vault (Thought Dump)',
    desc: 'Capture intrusive stray thoughts and chores with a tactile swipe so they don’t hijack your working memory. Review or clear them when the timer rings.',
    badge: 'Zero Attention Residue',
    icon: 'vault',
  },
  {
    category: 'METRICS & DESKTOP',
    title: 'Focus Analytics & Home Screen Widget',
    desc: 'Track daily session counts, weekly progress dots, total focus hours, and attention residue penalties. Launch sessions instantly via the Android home screen widget.',
    badge: 'Android Widget',
    icon: 'widget',
  },
  {
    category: 'PRIVACY BY DESIGN',
    title: '100% Offline & Zero Telemetry',
    desc: 'Zero account creation, no cloud tracking, no invasive permissions. Your focus history and rules never leave your phone hardware.',
    badge: '100% Private',
    icon: 'shield',
  },
];

export const appThemes = [
  {
    id: 'espresso',
    name: 'Espresso',
    label: 'Warm Monastic (Default)',
    typography: 'Lora Serif / Instrument Serif',
    vibe: 'Warm coffee obsidian background with a caramel-gold progress ring. Built for quiet late-night sessions and library contemplation.',
    image: '/screenshots/theme_espresso.jpg',
    accentColor: '#D4A373',
    bgColor: '#161210',
    status: 'Rich Warm Dark',
    ringColor: '#D4A373',
  },
  {
    id: 'aurora',
    name: 'Aurora',
    label: 'Nordic Slate & Frost',
    typography: 'Outfit Modern Geometric Sans',
    vibe: 'Deep obsidian-slate backdrop with a crisp frost-cyan progress ring. Engineered for high-tech engineering, code architecture, and analytical flow.',
    image: '/screenshots/theme_aurora.jpg',
    accentColor: '#8EBBFF',
    bgColor: '#0A1118',
    status: 'Cool Slate Obsidian',
    ringColor: '#E2E8F0',
  },
  {
    id: 'blush',
    name: 'Blush / Noir',
    label: 'Porcelain Light Mode',
    typography: 'Outfit SemiBold / High-Visibility',
    vibe: 'Clean, radiant porcelain surface with a dusty rose-wine progress ring. Designed for bright daytime work, natural light, and airy productivity.',
    image: '/screenshots/theme_blush.jpg',
    accentColor: '#A6596A',
    bgColor: '#FAF5F3',
    status: 'Elegant Daytime Light',
    ringColor: '#A6596A',
  },
  {
    id: 'nothing',
    name: 'Nothing OS Inspired',
    label: 'Industrial Dot-Matrix',
    typography: 'Nothing Monospace / Dot Matrix Glyph',
    vibe: 'Radical typographical restraint with vintage Dieter Rams red accents and dot-matrix hardware styling. Pure monochrome with high-contrast LED clock face.',
    image: '/screenshots/theme_nothing.jpg',
    accentColor: '#E11D48',
    bgColor: '#050505',
    status: 'Dot-Matrix Industrial',
    ringColor: '#FFFFFF',
  },
];

export const audioTracks = [
  {
    id: 'gamma',
    title: '40Hz Gamma Focus',
    sub: 'Cognitive synchrony & deep problem-solving',
    file: '/audio/sound_gamma_40hz.ogg',
    type: 'BINAURAL',
    accent: '#f59e0b',
  },
  {
    id: 'alpha',
    title: '10Hz Alpha Flow',
    sub: 'Relaxed alertness, learning & clarity',
    file: '/audio/sound_alpha_10hz.ogg',
    type: 'BINAURAL',
    accent: '#06b6d4',
  },
  {
    id: 'brown',
    title: 'Deep Brown Noise',
    sub: 'Sub-bass acoustic shield against chatter',
    file: '/audio/sound_brown_noise.ogg',
    type: 'ACOUSTIC',
    accent: '#d97706',
  },
  {
    id: 'rain',
    title: 'Monastic Rainfall',
    sub: 'Natural rhythmic white noise for calm',
    file: '/audio/sound_rain.ogg',
    type: 'AMBIENT',
    accent: '#38bdf8',
  },
];

export const trajectory = {
  eyebrow: 'THE COGNITIVE ASCENT',
  heading: 'From fragmented modern noise to 90 minutes of pure flow.',
  description: 'As you scroll, follow the neuro-cognitive recalibration that happens during a Deep Work session.',
  legs: [
    {
      step: '01',
      time: '00 — 05 MIN',
      title: 'Cognitive Clearance & Breathing',
      body: 'Box breathing sequence calms the vagus nerve. Shorts and Reels blockers engage. Visual HUD locks onto session intent.',
      frequency: '14Hz Beta → Alpha Transition',
    },
    {
      step: '02',
      time: '05 — 20 MIN',
      title: 'Frictionless Neural Lock',
      body: '10Hz Alpha acoustic carrier synchronizes cortical waves. Urge to check notifications fades as working memory expands.',
      frequency: '10Hz Alpha Coherence',
    },
    {
      step: '03',
      time: '20 — 75 MIN',
      title: 'Monastic Gamma Peak',
      body: '40Hz cortical synchronization. Dense creative and analytical output. Mind Vault holds stray thoughts without breaking flow.',
      frequency: '40Hz Gamma Peak Flow',
    },
    {
      step: '04',
      time: '75 — 90 MIN',
      title: 'Cognitive Yield & Safe Exit',
      body: 'Intentional session completion. Mind Vault thoughts reviewed. Zero attention residue carried into the next task.',
      frequency: 'Balanced Baseline Recovery',
    },
  ],
};

export const access = {
  eyebrow: 'AVAILABLE NOW',
  heading: 'Download Deep Work on Google Play Store.',
  body: 'The complete offline cognitive defense system is live. Zero subscriptions, zero invasive telemetry, 100% free.',
  playStoreUrl: 'https://play.google.com/store/apps/details?id=com.deepworkapp',
  stats: [
    { label: 'SUPPORTED OS', value: 'ANDROID 7+' },
    { label: 'APP FOOTPRINT', value: '< 15 MB' },
    { label: 'TELEMETRY / ADS', value: '0 BYTES' },
    { label: 'BATTERY OVERHEAD', value: '< 1.2%' },
  ],
};
