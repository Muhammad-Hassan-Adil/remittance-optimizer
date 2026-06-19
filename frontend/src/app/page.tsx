import Link from 'next/link';
import { ArrowRight, Wallet, Percent, DollarSign } from 'lucide-react';
import Leaderboard from '../components/Leaderboard';

async function getPlatforms() {
    try {
        const res = await fetch('http://39.37.165.88:8080/api/platforms', { cache: 'no-store' });
        if (!res.ok) return [];
        return res.json();
    } catch {
        return [];
    }
}

export default async function Home() {
    const platforms = await getPlatforms();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in zoom-in-95 duration-700">
            <div className="text-center mb-24 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/20 blur-[120px] rounded-full pointer-events-none"></div>
                
                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 font-medium text-sm mb-8 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        Live Google Finance Rates
                    </div>
                    <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-white mb-8 drop-shadow-lg">
                        Optimize Your <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-green-500">
                            Freelance Payouts
                        </span>
                    </h1>
                    <p className="max-w-3xl mx-auto text-xl md:text-2xl text-gray-400 leading-relaxed font-light">
                        Stop losing money to hidden fees. Instantly compare exact conversion rates and taxes for sending your earnings to Pakistan.
                    </p>
                </div>
            </div>

            <Leaderboard />
            
            <div className="mb-12 max-w-6xl mx-auto flex items-center gap-4">
                <div className="flex-1 h-px bg-gray-800"></div>
                <h2 className="text-xl font-bold text-gray-500 uppercase tracking-widest">Explore Payout Platforms</h2>
                <div className="flex-1 h-px bg-gray-800"></div>
            </div>
            
            {platforms.length === 0 && (
                <div className="p-6 bg-red-900/20 border border-red-500/30 text-red-300 rounded-2xl max-w-2xl mx-auto text-center backdrop-blur-sm">
                    Unable to load platform data. Please ensure the backend is running.
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {platforms.map((platform: any) => (
                    <Link 
                        key={platform.slug}
                        href={`/payout/usd/${platform.slug}`}
                        className="group relative block p-1 rounded-3xl bg-gradient-to-b from-gray-800 to-gray-900 hover:from-emerald-500/50 hover:to-teal-500/50 transition-all duration-500 ease-out transform hover:-translate-y-2 hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.3)]"
                    >
                        <div className="h-full bg-gray-950/90 rounded-[1.4rem] p-8 backdrop-blur-xl border border-gray-800/50 flex flex-col items-center text-center">
                            <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition-colors duration-300">
                                <Wallet className="w-10 h-10 text-gray-300 group-hover:text-emerald-400 transition-colors duration-300" />
                            </div>
                            <h3 className="text-4xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">
                                {platform.name}
                            </h3>
                            <div className="flex gap-4 mb-8">
                                <div className="flex items-center gap-1.5 text-gray-400 bg-gray-900/50 px-3 py-1.5 rounded-lg border border-gray-800">
                                    <Percent className="w-4 h-4 text-emerald-500" />
                                    <span className="text-sm font-medium">{platform.fee_percentage}% Fee</span>
                                </div>
                                {platform.fee_fixed > 0 && (
                                    <div className="flex items-center gap-1.5 text-gray-400 bg-gray-900/50 px-3 py-1.5 rounded-lg border border-gray-800">
                                        <DollarSign className="w-4 h-4 text-emerald-500" />
                                        <span className="text-sm font-medium">${platform.fee_fixed} Fixed</span>
                                    </div>
                                )}
                            </div>
                            <div className="mt-auto flex items-center gap-2 text-emerald-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0 text-lg">
                                Calculate Payout <ArrowRight className="w-5 h-5" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
