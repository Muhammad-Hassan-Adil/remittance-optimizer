"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ArrowLeft, Calculator, Receipt, ArrowDownToLine, Landmark } from 'lucide-react';

const currencySymbols: Record<string, string> = {
    USD: '$',
    GBP: '£',
    EUR: '€',
    AUD: 'A$',
    AED: 'د.إ'
};

const currencyNames: Record<string, string> = {
    USD: 'US Dollars',
    GBP: 'British Pounds',
    EUR: 'Euros',
    AUD: 'Australian Dollars',
    AED: 'UAE Dirhams'
};

export default function PayoutPage() {
    const params = useParams();
    const platform = params.platform as string;
    const currency = (params.currency as string).toUpperCase();

    const [amount, setAmount] = useState<number>(1000);
    const [inputValue, setInputValue] = useState<string>('1000');
    const [isFiler, setIsFiler] = useState<boolean>(true);
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const symbol = currencySymbols[currency] || '$';
    const cName = currencyNames[currency] || currency;

    const fetchPayout = async (currentAmount: number, currentFiler: boolean) => {
        setLoading(true);
        try {
            const res = await fetch(`http://39.37.165.88:8020/api/payout/${currency}/${platform}/meezan-bank?amount=${currentAmount}&is_filer=${currentFiler}`);
            if (res.ok) {
                const result = await res.json();
                setData(result);
            } else {
                setData(null);
            }
        } catch (err) {
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    // Initial load
    useEffect(() => {
        if (platform && currency) {
            fetchPayout(amount, isFiler);
        }
    }, [platform, currency]);

    const handleCalculate = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const parsed = Number(inputValue);
        if (!isNaN(parsed) && parsed > 0) {
            setAmount(parsed);
            fetchPayout(parsed, isFiler);
        }
    };

    const toggleFiler = () => {
        const newFiler = !isFiler;
        setIsFiler(newFiler);
        fetchPayout(amount, newFiler);
    };

    if (!platform || !currency) return <div className="text-white">Loading...</div>;

    const chartData = data ? [
        { name: 'Final PKR', value: data.final_pkr, color: '#10b981' },
        { name: `Platform Fee (PKR)`, value: data.platform_fee * data.exchange_rate, color: '#3b82f6' },
        { name: 'Tax Deducted (PKR)', value: data.tax_pkr, color: '#ef4444' }
    ] : [];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
            <Link 
                href="/" 
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-12 transition-colors px-4 py-2 rounded-full hover:bg-gray-800 border border-transparent hover:border-gray-700"
            >
                <ArrowLeft className="w-5 h-5" /> Back to Home
            </Link>

            <div className="mb-12">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white capitalize tracking-tight mb-4 flex items-center gap-4">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
                        {platform.replace('-', ' ')}
                    </span>
                    Payout in {currency}
                </h1>
                <p className="text-xl text-gray-400 max-w-3xl font-light">
                    Real-time {currency} to PKR calculation including exact platform deduction fees and standard FBR withholding tax.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Calculator Panel */}
                <div className="lg:col-span-5 bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    
                    <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <Calculator className="text-emerald-400 w-6 h-6" /> Settings
                    </h2>
                    
                    <form onSubmit={handleCalculate} className="mb-8 relative z-10">
                        <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">Transfer Amount ({currency})</label>
                        <div className="flex gap-4">
                            <div className="relative rounded-xl shadow-sm flex-grow">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                    <span className="text-emerald-500 text-2xl font-bold">{symbol}</span>
                                </div>
                                <input
                                    type="number"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    className="block w-full rounded-xl border border-gray-700 bg-gray-950/50 py-5 pl-14 pr-4 text-white text-2xl font-semibold ring-0 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all placeholder:text-gray-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    placeholder="0.00"
                                />
                            </div>
                            <button 
                                type="submit"
                                className="bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold py-5 px-8 rounded-xl transition-all shadow-lg shadow-emerald-500/20 whitespace-nowrap active:scale-95"
                            >
                                Calculate
                            </button>
                        </div>
                    </form>

                    <div className="flex items-center justify-between mb-8 p-5 rounded-xl bg-gray-950/50 border border-gray-800 relative z-10">
                        <span className="flex-grow flex flex-col">
                            <span className="text-base font-semibold text-white flex items-center gap-2">
                                <Landmark className="w-4 h-4 text-emerald-500" /> Active Filer
                            </span>
                            <span className="text-sm text-gray-500 mt-1">1% vs 2% standard withholding tax</span>
                        </span>
                        <button 
                            type="button" 
                            onClick={toggleFiler}
                            className={`${isFiler ? 'bg-emerald-500' : 'bg-gray-700'} relative inline-flex flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                            style={{width: '3.5rem', height: '2rem'}}
                        >
                            <span 
                                className={`${isFiler ? 'translate-x-6' : 'translate-x-0'} pointer-events-none inline-block transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                                style={{width: '1.75rem', height: '1.75rem'}}
                            ></span>
                        </button>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-12 text-emerald-500 gap-3 font-medium">
                            <div className="animate-spin h-6 w-6 border-2 border-emerald-500 border-t-transparent rounded-full"></div>
                            Crunching the numbers...
                        </div>
                    ) : data ? (
                        <div className="mt-8 relative z-10">
                            <div className="bg-gray-950/80 rounded-2xl p-6 border border-gray-800">
                                <h3 className="text-sm font-bold text-gray-400 mb-6 uppercase tracking-widest flex items-center gap-2">
                                    <Receipt className="w-4 h-4" /> Breakdown
                                </h3>
                                <dl className="space-y-5">
                                    <div className="flex justify-between items-center">
                                        <dt className="text-gray-400">Exchange Rate</dt>
                                        <dd className="text-lg font-medium text-white bg-gray-900 px-3 py-1 rounded-lg border border-gray-800">Rs {data.exchange_rate.toFixed(2)}</dd>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <dt className="text-gray-400">Platform Fee</dt>
                                        <dd className="text-lg font-medium text-blue-400">-{symbol}{data.platform_fee.toFixed(2)}</dd>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <dt className="text-gray-400">Tax Deducted</dt>
                                        <dd className="text-lg font-medium text-red-400">-Rs {data.tax_pkr.toFixed(2)}</dd>
                                    </div>
                                    <div className="flex justify-between items-center pt-6 border-t border-gray-800 mt-2">
                                        <dt className="text-xl font-bold text-white flex items-center gap-2">
                                            <ArrowDownToLine className="w-5 h-5 text-emerald-500" /> You Receive
                                        </dt>
                                        <dd className="text-3xl font-black text-emerald-400">
                                            Rs {data.final_pkr.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0})}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    ) : (
                        <div className="text-red-400 p-4 bg-red-900/20 rounded-xl border border-red-900 mt-8 text-center">
                            Route not found or backend offline.
                        </div>
                    )}
                </div>

                {/* Chart Panel */}
                <div className="lg:col-span-7 bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                    <h2 className="text-2xl font-bold text-white mb-2 w-full">Value Distribution</h2>
                    <p className="text-gray-500 mb-8 w-full">Visualizing where your money goes after conversion.</p>
                    
                    <div style={{ width: '100%', height: '450px' }}>
                        {!loading && data && (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={120}
                                        outerRadius={160}
                                        paddingAngle={4}
                                        dataKey="value"
                                        stroke="none"
                                        cornerRadius={8}
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} style={{ filter: `drop-shadow(0px 4px 12px ${entry.color}40)` }} />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        formatter={(value: any) => `Rs ${Number(value).toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0})}`}
                                        contentStyle={{ backgroundColor: '#030712', borderColor: '#1f2937', color: '#f3f4f6', borderRadius: '12px', padding: '12px 16px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)' }}
                                        itemStyle={{ color: '#fff', fontWeight: 600, fontSize: '1.1rem' }}
                                    />
                                    <Legend 
                                        verticalAlign="bottom" 
                                        height={36} 
                                        iconType="circle"
                                        wrapperStyle={{ fontSize: '15px', color: '#9ca3af', paddingTop: '30px' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>
            </div>

            {/* Dynamic SEO Content: Transfer Guide */}
            {data && (
                <div className="mt-16 bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 lg:p-12">
                    <h2 className="text-3xl font-bold text-white mb-6">Transfer Guide: Sending {currency} via {data.platform_name}</h2>
                    <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                        <p>
                            When transferring {cName} ({currency}) via <strong>{data.platform_name}</strong> to Pakistan, you receive a highly competitive conversion rate of approximately <strong>Rs {data.exchange_rate.toFixed(2)}</strong>. Calculating your exact payout is crucial. Using {data.platform_name} involves a flat or percentage-based platform fee, which currently costs you approximately <strong>{symbol}{data.platform_fee.toFixed(2)}</strong> on a {amount} {currency} transaction.
                        </p>
                        <p>
                            When the funds land in your local bank account via {data.platform_name}, they are subject to the standard Federal Board of Revenue (FBR) withholding tax on IT remittance exports. Since you have indicated that you are {isFiler ? 'an active filer (1% tax)' : 'a non-filer (2% tax)'}, the local banking partner will automatically deduct <strong>Rs {data.tax_pkr.toLocaleString('en-US', {maximumFractionDigits: 2})}</strong> before the remaining balance is credited to you. 
                        </p>
                        <p>
                            To maximize your earnings, always compare your net payout of <strong>Rs {data.final_pkr.toLocaleString('en-US', {maximumFractionDigits: 0})}</strong> against alternative remittance methods. Whether {data.platform_name} is the cheapest option depends on your total transaction volume, base currency, and your current FBR filer status. Bookmark this page to check the latest live rates and deductions before you initiate your next withdrawal to Pakistan.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
