import type { Metadata } from 'next';
import Link from 'next/link';
import JobBoard from '@/components/recruitment/JobBoard';
import { loadJobs } from '@/utils/recruitment-loader';
import { generateUnifiedMetadata } from '@/utils/seo';
import { API_CONFIG } from '@/config/api';

export async function generateMetadata(): Promise<Metadata> {
    return generateUnifiedMetadata('recruitment', {
        title: 'Werving & Vacatures - Word Lid Van Ons Team',
        description: 'Ontdek carrièremogelijkheden bij StrongBody AI. We zijn op zoek naar getalenteerde professionals om ons team in gezondheidstechnologie te versterken.',
    });
}

export default async function RecruitmentPage() {
    const locale = (API_CONFIG.HEADERS.language as string) || 'nl';
    const jobs = await loadJobs(locale);

    return (
        <main className="min-h-screen bg-white font-sans">
            {/* Hero Section */}
            <section className="relative py-24 md:py-32 overflow-hidden bg-[#0A0F1C]">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1920"
                        alt="Office Background"
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F1C] via-[#0A0F1C]/80 to-transparent"></div>
                </div>

                <div className="container relative z-10 mx-auto px-4 max-w-6xl">
                    <div className="max-w-3xl text-left">
                        <div className="inline-flex items-center gap-2.5 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            We werven aan
                        </div>                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
                            Bouw mee aan <br />
                            <span className="brand-text text-primary">de toekomst van gezondheidszorg</span>
                        </h1>
                        <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed">
                            Sluit je aan bij StrongBody en maak deel uit van een wereldwijd team dat zich toewijdt aan het verbinden van de beste experts met premium cliënten via ons geavanceerde gezondheidsecosysteem.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a
                                href="#positions"
                                className="inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-bold text-white bg-primary hover:bg-primary-hover transition-all shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5"
                            >
                                Bekijk Vacatures
                            </a>
                            <Link
                                href="/about"
                                className="inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-bold text-white border border-white/20 hover:bg-white/10 transition-all backdrop-blur-sm hover:-translate-y-0.5"
                            >
                                Over ons
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
 
            {/* Why Join Us */}
            <section className="py-24 bg-grey-50">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-text-p mb-4">Waarom StrongBody?</h2>
                        <p className="text-text-s max-w-2xl mx-auto text-base">
                            Wij bieden een stimulerende werkomgeving waar innovatie en impact samenkomen. Groei in je carrière terwijl je mensen wereldwijd helpt hun gezondheid te verbeteren.
                        </p>
                    </div>
 
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Wereldwijde Impact',
                                text: 'Werk aan ons mondiaal digitaal ecosysteem dat experts en cliënten in meer dan 190 landen naadloos met elkaar verbindt.',
                                icon: (
                                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9h18" />
                                    </svg>
                                )
                            },
                            {
                                title: 'Innovatie Voorop',
                                text: 'Pionier mee met onze native AI-spraakvertaling en realtime communicatie, die taalbarrières in de zorg volledig wegnemen.',
                                icon: (
                                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                )
                            },
                            {
                                title: 'Professionele Groei',
                                text: 'Groei mee in een snel veranderende, dynamische omgeving waar we bouwen aan de commerciële en fysiologische infrastructuur van de toekomst.',
                                icon: (
                                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                )
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="group bg-white p-8 rounded-3xl border border-grey-200 hover:border-primary hover:shadow-xl transition-all duration-300">
                                <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center mb-6">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-text-p mb-3">{item.title}</h3>
                                <p className="text-text-s leading-relaxed text-sm">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Open Positions */}
            <section id="positions" className="py-24">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-text-p mb-2">Openstaande vacatures</h2>
                            <p className="text-text-s text-base">Vind de functie die aansluit bij jouw passie en vaardigheden.</p>
                        </div>
                        <div className="inline-flex rounded-xl border border-grey-200 p-1 bg-grey-50">
                            <button className="px-4 py-2 rounded-lg bg-white shadow-sm text-sm font-bold text-primary">Alle Afdelingen</button>
                        </div>
                    </div>

                    {jobs.length > 0 ? (
                        <JobBoard jobs={jobs} />
                    ) : (
                        <div className="text-center py-16 bg-grey-50 rounded-3xl border border-grey-200">
                            <svg className="w-12 h-12 text-grey-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <h3 className="text-lg font-bold text-text-p mb-2">Momenteel geen open vacatures</h3>
                            <p className="text-text-s text-sm max-w-md mx-auto">
                                We hebben momenteel geen actieve vacatures. Stuur ons gerust een open sollicitatie via de onderstaande knop.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Application Process */}
            <section className="py-24 bg-gradient-to-br from-[#160E2E] via-[#0A0F1C] to-[#0A0F1C] text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,_rgba(218,31,39,0.15),transparent_50%)]"></div>
                <div className="container mx-auto px-4 max-w-6xl relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Ons wervingsproces</h2>
                        <p className="text-white/60 max-w-2xl mx-auto text-base">
                            Transparant, efficiënt en menselijk. We respecteren je tijd en maken elke stap helder.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        {[
                            { step: '01', title: 'Sollicitatie', text: 'Dien je cv en motivatie in via ons contactportaal.' },
                            { step: '02', title: 'Screening', text: 'Eerste kennismakingsgesprek met ons HR-team om je achtergrond te bespreken.' },
                            { step: '03', title: 'Interview', text: 'Technische en culturele evaluatie met de verantwoordelijke manager.' },
                            { step: '04', title: 'Aanbod', text: 'Eindgesprek over arbeidsvoorwaarden en welkom bij het team!' }
                        ].map((item, idx) => (
                            <div key={idx} className="relative group">
                                <div className="text-7xl font-bold text-primary/30 mb-4 group-hover:text-primary transition-colors duration-500">{item.step}</div>
                                <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                                <p className="text-white/60 leading-relaxed text-sm">{item.text}</p>
                                {idx < 3 && (
                                    <div className="hidden md:block absolute top-10 -right-6 w-12 h-[1px] bg-white/10"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="bg-gradient-to-br from-secondary via-[#160E2E] to-[#0A0F1C] rounded-[32px] p-8 md:p-16 text-center text-white shadow-2xl relative overflow-hidden border border-white/5">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full translate-y-32 -translate-x-32 blur-3xl"></div>

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Geen geschikte functie gevonden?</h2>
                            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
                                Stuur ons toch je cv! We zijn altijd op zoek naar getalenteerde professionals voor onze talentenpool.
                            </p>
                            <Link
                                href="/contact?subject=Open Sollicitatie"
                                className="inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-bold text-[#0A0F1C] bg-white hover:bg-grey-100 transition-all shadow-xl"
                            >
                                Open sollicitatie insturen
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
