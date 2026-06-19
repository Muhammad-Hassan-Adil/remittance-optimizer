import { ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | Remittance Optimizer',
  description: 'Privacy policy for Pakistani Freelance Remittance Optimizer.',
};

export default function PrivacyPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16 animate-in fade-in duration-500">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8 flex items-center gap-4">
                <ShieldCheck className="text-emerald-500 w-10 h-10" /> Privacy Policy
            </h1>
            
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl space-y-8 text-gray-300 leading-relaxed">
                <p>
                    At Pakistani Freelance Remittance Optimizer, we prioritize your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, store, and share data in connection with our services.
                </p>

                <div>
                    <h2 className="text-xl font-bold text-white mb-3">1. Information We Collect</h2>
                    <p>We gather basic personal information such as your name, email address, and transaction details when you sign up for an account or make a remittance. We also collect usage data to improve our service and ensure it meets your needs.</p>
                </div>

                <div>
                    <h2 className="text-xl font-bold text-white mb-3">2. How We Use Your Information</h2>
                    <p>We use the collected data to provide and enhance our services, including processing transactions, improving user experience, and communicating with you about updates and offers. We may share this information with trusted third-party service providers who assist in delivering our services but are obligated to maintain the confidentiality of your data.</p>
                </div>

                <div>
                    <h2 className="text-xl font-bold text-white mb-3">3. Data Security</h2>
                    <p>We implement robust security measures to protect your personal information from unauthorized access, use, disclosure, alteration, or destruction. This includes using encryption for data transmission and storing sensitive data on secure servers.</p>
                </div>

                <div>
                    <h2 className="text-xl font-bold text-white mb-3">4. Your Rights and Choices</h2>
                    <p>You have the right to access, correct, update, or request the deletion of your personal information. If you wish to exercise any of these rights, please contact us through our support channels. We are committed to handling your requests promptly and in compliance with applicable laws and regulations.</p>
                </div>
            </div>
        </div>
    );
}
