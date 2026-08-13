export type SampleRequest = {
  category: string;
  quote: string;
  budget: string;
};

export type SampleService = {
  title: string;
  quote: string;
  pricing: string;
};

export const SAMPLE_REQUESTS: SampleRequest[] = [
  { category: "Foreign sales partner", quote: "Certified acai producer looking for freelance sales reps in the UK, Singapore, and Korea to reach healthy food distributors and beverage chains.", budget: "Retainer + high commission" },
  { category: "Accountability buddy", quote: "Morning workout companion needed at 6 AM for daily motivation, progress checks, and optional evening planning support.", budget: "$60-$200/month" },
  { category: "Freelance doctor", quote: "Personal doctor-friend for short daily check-ins about sleep, stress, lifestyle habits, and small health concerns before they grow.", budget: "10 minutes/day" },
  { category: "Travel coordinator", quote: "US client comparing dental or IVF trips across Korea, Mexico, Thailand, and Vietnam, with quotes, itinerary, and local coordination.", budget: "$20 initial info fee" },
  { category: "Massage therapist", quote: "Office worker with chronic neck and lower-back pain wants a skilled therapeutic massage specialist for weekly home visits.", budget: "$30/session" },
  { category: "Independent expert", quote: "Beginner investor with $10,000 saved wants an independent financial consultant with no insurance upsell or multi-level products.", budget: "$50/2 hours" },
  { category: "Beauty mentor", quote: "Client wants a practical beauty mentor to review treatments, style direction, skin care, body care, and weekly video guidance.", budget: "$150/month" },
  { category: "Recovery experience", quote: "Someone with severe shoulder and neck pain wants to learn from a person who recovered through exercises, habits, pillows, and lifestyle changes.", budget: "$30/session" },
  { category: "Sleep support", quote: "Chronic insomnia client needs a sleep therapist with a natural routine plus late-night breathing or calming support when sleep breaks.", budget: "$200/month" },
  { category: "Mental support", quote: "High-income client after a painful breakup wants sharp relationship counseling, emotional clarity, and weekly Zoom sessions.", budget: "$50/session + bonus" },
  { category: "Elite matchmaker", quote: "Private entrepreneur seeks a high-end matchmaker with a trusted network, background checks, and discreet introductions for a serious relationship.", budget: "$10k-$25k project" },
];

export const SAMPLE_SERVICES: SampleService[] = [
  { title: "International sales representative", quote: "Market development for F&B, agriculture, and healthy food brands: distributor outreach, sample coordination, and export deal support.", pricing: "$500-$1,000/month + 3-5% commission" },
  { title: "Discipline buddy", quote: "Daily 6 AM wake-up messages, workout motivation, progress checks, and an evening planning option for habit building.", pricing: "$60-$200/month" },
  { title: "Medical tourism coordinator", quote: "Country comparison, hospital sourcing, first quote, travel planning, hotel, airport pickup, and medical interpreter coordination.", pricing: "$20 info fee, $300-$500/trip" },
  { title: "Independent financial consultant", quote: "Personal finance review, safe portfolio allocation for beginners, ETF and bond education, with no insurance or product cross-sell.", pricing: "$50/2-hour consultation" },
  { title: "Beauty transformation mentor", quote: "Skincare, treatments, aesthetics, nutrition, style direction, daily chat support, and a weekly video review for a full glow-up plan.", pricing: "$150/month" },
  { title: "Recovery experience sharing", quote: "Practical first-person recovery guidance for reflux, stress, neck pain, posture habits, stretching routines, and lifestyle reset.", pricing: "$30/session or $50/month" },
  { title: "Elite matchmaking service", quote: "Private candidate search, background checks, discreet introductions, and premium relationship matching for high-profile clients.", pricing: "$2k-$5k/month + success bonus" },
];
