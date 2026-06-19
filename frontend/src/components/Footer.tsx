import Link from 'next/link';
import { Landmark } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-950 border-t border-gray-800 mt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
                    <div className="flex flex-col items-center md:items-start">
                        <Link href="/" className="flex items-center gap-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-600 mb-4">
                            <Landmark className="w-6 h-6 text-emerald-500" />
                            Remittance Optimizer
                        </Link>
                        <p className="text-gray-500 text-sm max-w-sm text-center md:text-left">
                            Compare exchange rates, platform fees, and FBR withholding taxes to maximize your freelance remittance payout in Pakistan.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 text-center md:text-left">
                        <div>
                            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Navigation</h3>
                            <ul className="space-y-3">
                                <li><Link href="/" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">Home</Link></li>
                                <li><Link href="/about" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">About Us</Link></li>
                                <li><Link href="/contact" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">Contact</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Legal</h3>
                            <ul className="space-y-3">
                                <li><Link href="/privacy-policy" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">Privacy Policy</Link></li>
                                <li><Link href="/terms" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">Terms of Service</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-600 text-sm">
                        &copy; {new Date().getFullYear()} Remittance Optimizer. All rights reserved.
                    </p>
                    <p className="text-gray-600 text-xs text-center md:text-right max-w-xs">
                        Disclaimer: Rates are indicative and subject to market fluctuations. We are not a financial institution.
                    </p>
                </div>
            </div>
        </footer>
    );
}
