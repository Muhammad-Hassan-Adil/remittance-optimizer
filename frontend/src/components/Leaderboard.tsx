"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trophy, Landmark, ArrowRight, Coins } from 'lucide-react';

interface LeaderboardEntry {
    platform_name: string;
    platform_slug: string;
    bank_name: string;
    bank_slug: string;
    final_pkr: number;
    tax_pkr: number;
    platform_fee: number;
    exchange_rate: number;
}

const currencySymbols: Record<string, string> = {
    USD: '$',
    GBP: '£',
    EUR: '€',
    AUD: 'A$',
    AED: 'د.إ'
};

export default function Leaderboard() {
    const [usdAmount, setUsdAmount] = useState<string>('1000');
    const [isFiler, setIsFiler] = useState<boolean>(true);
    const [currency, setCurrency] = useState<string>('USD');
    const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            const parsedAmount = Number(usdAmount);
            if (isNaN(parsedAmount) || parsedAmount <= 0) return;

            setLoading(true);
            try {
                const res = await fetch(`http://39.37.165.88:8020/api/leaderboard?amount=${parsedAmount}&is_filer=${isFiler}&currency=${currency}`);
                if (res.ok) {
                    const data = await res.json();
                    setLeaderboardData(data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        const debounceTimer = setTimeout(fetchLeaderboard, 500);
        return () => clearTimeout(debounceTimer);
    }, [usdAmount, isFiler, currency]);

    const symbol = currencySymbols[currency] || '$';

    return (
        <div className="w-full max-w-4xl mx-auto mt-16 mb-24 z-20 relative">
            <div className="bg-gray-900/60 backdrop-blur-2xl border border-gray-800 rounded-3xl p-8 shadow-2xl">
                <div className="flex flex-col md:flex-row gap-6 mb-10 items-center justify-between p-6 bg-gray-950/50 rounded-2xl border border-gray-800/80">
                    <div className="flex-1 w-full relative">
                        <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Currency</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-emerald-500 font-bold">
                                <Coins className="w-5 h-5" />
                            </span>
                            <select 
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                className="w-full bg-gray-900 border border-gray-700 rounded-xl py-4 pl-12 pr-10 text-white font-semibold text-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all appearance-none cursor-pointer"
                            >
                                <option value="USD">USD - US Dollar</option>
                                <option value="GBP">GBP - British Pound</option>
                                <option value="EUR">EUR - Euro</option>
                                <option value="AUD">AUD - Australian Dollar</option>
                                <option value="AED">AED - UAE Dirham</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex-1 w-full relative">
                        <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Transfer Amount</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-emerald-500 font-bold text-xl">{symbol}</span>
                            <input 
                                type="number" 
                                value={usdAmount}
                                onChange={(e) => setUsdAmount(e.target.value)}
                                className="w-full bg-gray-900 border border-gray-700 rounded-xl py-4 pl-12 pr-4 text-white font-semibold text-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                        </div>
                    </div>
                    
                    <div className="flex-1 w-full flex items-center justify-between bg-gray-900 border border-gray-700 rounded-xl py-4 px-6 h-[88px] mt-6 md:mt-0">
                        <div className="flex flex-col">
                            <span className="text-white font-semibold flex items-center gap-2">
                                <Landmark className="w-4 h-4 text-emerald-500" /> Active Filer
                            </span>
                            <span className="text-xs text-gray-500 mt-1">1% FBR Tax</span>
                        </div>
                        <button 
                            type="button" 
                            onClick={() => setIsFiler(!isFiler)}
                            className={`${isFiler ? 'bg-emerald-500' : 'bg-gray-700'} relative inline-flex flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                            style={{width: '3.5rem', height: '2rem'}}
                        >
                            <span 
                                className={`${isFiler ? 'translate-x-6' : 'translate-x-0'} pointer-events-none inline-block transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                                style={{width: '1.75rem', height: '1.75rem'}}
                            ></span>
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Trophy className="w-6 h-6 text-yellow-500" /> Route Leaderboard
                    </h3>
                    
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin h-8 w-8 border-2 border-emerald-500 border-t-transparent rounded-full"></div>
                        </div>
                    ) : leaderboardData.length > 0 ? (
                        <div className="flex flex-col gap-4">
                            {leaderboardData.map((route, idx) => (
                                <Link 
                                    href={`/payout/${currency.toLowerCase()}/${route.platform_slug}`}
                                    key={`${route.platform_slug}-${route.bank_slug}`}
                                    className={`relative group flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-2xl transition-all duration-300 ${idx === 0 ? 'bg-emerald-950/30 border-2 border-emerald-500/50 hover:bg-emerald-900/40' : 'bg-gray-950/80 border border-gray-800 hover:border-gray-600 hover:bg-gray-900'}`}
                                >
                                    {idx === 0 && (
                                        <div className="absolute -top-3 right-6 bg-emerald-500 text-gray-950 text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-emerald-500/30">
                                            BEST VALUE
                                        </div>
                                    )}
                                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${idx === 0 ? 'bg-emerald-500 text-gray-950' : 'bg-gray-800 text-gray-400'}`}>
                                            #{idx + 1}
                                        </div>
                                        <div>
                                            <div className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                                                {route.platform_name}
                                            </div>
                                            <div className="text-sm text-gray-500 mt-1">
                                                Fee: {symbol}{route.platform_fee.toFixed(2)} &bull; Tax: Rs {route.tax_pkr.toFixed(0)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                                        <div className="text-right">
                                            <div className="text-sm text-gray-400 mb-1">Net Payout</div>
                                            <div className={`text-2xl font-black ${idx === 0 ? 'text-emerald-400' : 'text-white'}`}>
                                                Rs {route.final_pkr.toLocaleString('en-US', {maximumFractionDigits: 0})}
                                            </div>
                                        </div>
                                        <ArrowRight className={`w-5 h-5 ${idx === 0 ? 'text-emerald-400' : 'text-gray-600'} group-hover:translate-x-1 transition-transform`} />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">No data available</div>
                    )}
                </div>
            </div>
        </div>
    );
}
