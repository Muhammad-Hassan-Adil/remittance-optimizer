import { Scale } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | Remittance Optimizer',
  description: 'Terms of service for Pakistani Freelance Remittance Optimizer.',
};

export default function TermsPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16 animate-in fade-in duration-500">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8 flex items-center gap-4">
                <Scale className="text-emerald-500 w-10 h-10" /> Terms of Service
            </h1>
            
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl space-y-8 text-gray-300 leading-relaxed">
                <p>
                    Welcome to PakFreelance, your premier platform for optimizing freelance remittances in Pakistan. By using our services, you agree to the following Terms of Service:
                </p>

                <div>
                    <h2 className="text-xl font-bold text-white mb-3">1. Rates and Fees</h2>
                    <p>The rates displayed on our website are for informational purposes only. We do not engage in any financial transactions or hold funds on behalf of users. All transactions are conducted through third-party banks and payment gateways that charge their own fees. PakFreelance does not mark up or add to these fees.</p>
                </div>

                <div>
                    <h2 className="text-xl font-bold text-white mb-3">2. User Conduct</h2>
                    <p>You agree to use our services responsibly and in compliance with all applicable laws and regulations. You must provide accurate and complete information when registering for an account, and you are solely responsible for any actions taken under your account.</p>
                </div>

                <div>
                    <h2 className="text-xl font-bold text-white mb-3">3. Privacy and Security</h2>
                    <p>PakFreelance takes the privacy and security of your personal and financial information very seriously. We implement industry-standard security measures to protect your data from unauthorized access or breaches. However, we cannot guarantee absolute security, and you acknowledge that there is always a risk of data loss or theft.</p>
                </div>

                <div>
                    <h2 className="text-xl font-bold text-white mb-3">4. Limitation of Liability</h2>
                    <p>PakFreelance is not liable for any losses or damages arising out of the use of our services, including but not limited to direct, indirect, incidental, special, punitive, and consequential damages. We are not responsible for any fees charged by third-party banks or payment gateways, nor do we guarantee the accuracy or reliability of any information provided on our website.</p>
                </div>

                <p className="pt-8 border-t border-gray-800 mt-8 text-gray-400">
                    By using PakFreelance, you acknowledge that these Terms of Service govern your use of our services and agree to comply with all applicable laws and regulations.
                </p>
            </div>
        </div>
    );
}
