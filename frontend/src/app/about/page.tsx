import { Landmark } from 'lucide-react';

export const metadata = {
  title: 'About Us | Remittance Optimizer',
  description: 'Learn how we help Pakistani freelancers save money on platform fees and FBR withholding tax.',
};

export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16 animate-in fade-in duration-500">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8 flex items-center gap-4">
                <Landmark className="text-emerald-500 w-10 h-10" /> About Us
            </h1>
            
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl space-y-6 text-gray-300 leading-relaxed text-lg">
                <p>
                    At Pakistani Freelance Remittance Optimizer, we are dedicated to making international payments as seamless and cost-effective as possible for freelancers and small businesses in Pakistan. Our innovative app leverages advanced algorithms to compare real-time exchange rates from leading providers, meticulously analyze platform fees across various remittance services like Payoneer and Wise, and account for FBR withholding tax to ensure you get the best possible deal on every transfer.
                </p>
                <p>
                    Our team of financial experts is committed to staying up-to-date with the latest market trends and regulations to provide accurate and reliable information. Whether you're sending money to family in Pakistan or paying freelancers overseas, our app empowers you to make informed decisions that save you time and money without compromising on security or convenience.
                </p>
                <p>
                    At Pakistani Freelance Remittance Optimizer, we believe in transparency and trust, which is why we offer a user-friendly interface and 24/7 customer support. We are proud to be a trusted partner for freelancers and small businesses looking to optimize their remittances and grow their global operations efficiently.
                </p>
            </div>
        </div>
    );
}
