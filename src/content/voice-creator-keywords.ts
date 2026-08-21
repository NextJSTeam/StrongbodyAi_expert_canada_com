import type { VoiceCreatorKeyword } from '@/lib/voice-creator';

/**
 * The keyword catalogue behind `/voice-creator/<slug>`.
 *
 * These are the upstream English search phrases, kept verbatim. The translated
 * sites rewrite the list instead of translating it, because English carries a
 * dozen near-identical variants ("make money from voice", "earn money with
 * voice", "voice make money") that collapse into one phrase in every other
 * language. On an English site those variants are the point: each is a distinct
 * query with its own search volume, so each keeps its own page. `keyword` is
 * rendered verbatim as the H1 and in the meta description, so it carries its
 * own capitalization and punctuation.
 *
 * Four themes drive the intent-sensitive copy:
 *   earn    — "I want to make money with my voice"
 *   jobs    — "I am looking for recording work"
 *   sell    — "I have audio and want to sell it"
 *   creator — "I already create content and want a second revenue stream"
 */
export const VOICE_CREATOR_KEYWORDS: VoiceCreatorKeyword[] = [
  /* ── earn: monetizing a voice ──────────────────────────────────── */
  { keyword: 'Make Money from Voice', slug: 'make-money-from-voice', theme: 'earn' },
  { keyword: 'Make Money with Voice', slug: 'make-money-with-voice', theme: 'earn' },
  { keyword: 'Earn Money from Voice', slug: 'earn-money-from-voice', theme: 'earn' },
  { keyword: 'Earn Money with Voice', slug: 'earn-money-with-voice', theme: 'earn' },
  { keyword: 'Voice Income', slug: 'voice-income', theme: 'earn' },
  { keyword: 'Use My Voice to Make Money', slug: 'use-my-voice-to-make-money', theme: 'earn' },
  { keyword: 'How Can I Make Money with My Voice', slug: 'how-can-i-make-money-with-my-voice', theme: 'earn' },
  { keyword: 'Make Money with My Voice', slug: 'make-money-with-my-voice', theme: 'earn' },
  { keyword: 'Make Money Voice Recording', slug: 'make-money-voice-recording', theme: 'earn' },
  { keyword: 'Earn Money by Recording Voice', slug: 'earn-money-by-recording-voice', theme: 'earn' },
  { keyword: 'Earn Money by Voice', slug: 'earn-money-by-voice', theme: 'earn' },
  { keyword: 'Earn through Voice', slug: 'earn-through-voice', theme: 'earn' },
  { keyword: 'How Can I Make Money Using My Voice', slug: 'how-can-i-make-money-using-my-voice', theme: 'earn' },
  { keyword: 'How to Earn Money by Voice', slug: 'how-to-earn-money-by-voice', theme: 'earn' },
  { keyword: 'How to Earn Money from Voice', slug: 'how-to-earn-money-from-voice', theme: 'earn' },
  { keyword: 'How to Earn Money through Voice', slug: 'how-to-earn-money-through-voice', theme: 'earn' },
  { keyword: 'How to Earn Money with Voice', slug: 'how-to-earn-money-with-voice', theme: 'earn' },
  { keyword: 'How to Make Money by Voice', slug: 'how-to-make-money-by-voice', theme: 'earn' },
  { keyword: 'How to Make Money with Voice', slug: 'how-to-make-money-with-voice', theme: 'earn' },
  { keyword: 'Record Voice and Earn Money', slug: 'record-voice-and-earn-money', theme: 'earn' },
  { keyword: 'Voice Earn Money', slug: 'voice-earn-money', theme: 'earn' },
  { keyword: 'Voice Make Money', slug: 'voice-make-money', theme: 'earn' },
  { keyword: 'Audio Income', slug: 'audio-income', theme: 'earn' },
  { keyword: 'Audio Monetization', slug: 'audio-monetization', theme: 'earn' },
  { keyword: 'Audible Making Money', slug: 'audible-making-money', theme: 'earn' },
  { keyword: 'Get Paid for Voice', slug: 'get-paid-for-voice', theme: 'earn' },
  { keyword: 'Get Paid for Voice Recording', slug: 'get-paid-for-voice-recording', theme: 'earn' },
  { keyword: 'Paid Voice Recording', slug: 'paid-voice-recording', theme: 'earn' },
  { keyword: 'Get Paid for Voice Recordings', slug: 'get-paid-for-voice-recordings', theme: 'earn' },
  { keyword: 'Voice Get Paid', slug: 'voice-get-paid', theme: 'earn' },
  /* ── jobs: looking for recording work ──────────────────────────── */
  { keyword: 'Voice Recording Jobs', slug: 'voice-recording-jobs', theme: 'jobs' },
  { keyword: 'Voice Recording Jobs from Home', slug: 'voice-recording-jobs-from-home', theme: 'jobs' },
  { keyword: 'Voice Recording Jobs Remote', slug: 'voice-recording-jobs-remote', theme: 'jobs' },
  { keyword: 'Freelance Voice Recording', slug: 'freelance-voice-recording', theme: 'jobs' },
  { keyword: 'Voice Recording Work', slug: 'voice-recording-work', theme: 'jobs' },
  { keyword: 'Audio Recording Jobs', slug: 'audio-recording-jobs', theme: 'jobs' },
  { keyword: 'Recording Audio Jobs', slug: 'recording-audio-jobs', theme: 'jobs' },
  { keyword: 'Sound Recorder Job', slug: 'sound-recorder-job', theme: 'jobs' },
  { keyword: 'Speech Recording Jobs', slug: 'speech-recording-jobs', theme: 'jobs' },
  { keyword: 'Voice Recording Work from Home', slug: 'voice-recording-work-from-home', theme: 'jobs' },
  /* ── sell: has audio, wants to sell it ─────────────────────────── */
  { keyword: 'Audio Upload Platform', slug: 'audio-upload-platform', theme: 'sell' },
  { keyword: 'Sell Voice Recordings', slug: 'sell-voice-recordings', theme: 'sell' },
  { keyword: 'Sell Voice Online', slug: 'sell-voice-online', theme: 'sell' },
  { keyword: 'Sell Vocals Online', slug: 'sell-vocals-online', theme: 'sell' },
  /* ── creator: already has an audience ──────────────────────────── */
  { keyword: 'Creator Monetization', slug: 'creator-monetization', theme: 'creator' },
  { keyword: 'Creator Monetization Platform', slug: 'creator-monetization-platform', theme: 'creator' },
  { keyword: 'Content Monetization Platform', slug: 'content-monetization-platform', theme: 'creator' },
  { keyword: 'Creator Studio Monetization', slug: 'creator-studio-monetization', theme: 'creator' },
  { keyword: 'Making Money as a Content Creator', slug: 'making-money-as-a-content-creator', theme: 'creator' },
  { keyword: 'Making Money from Content Creation', slug: 'making-money-from-content-creation', theme: 'creator' },
];
