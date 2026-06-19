import { Mail, MessageSquare } from 'lucide-react';
import ContactForm from '../../components/ContactForm';

export const metadata = {
  title: 'Contact Us | Remittance Optimizer',
  description: 'Get in touch with the Remittance Optimizer support team.',
};

export default function ContactPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16 animate-in fade-in duration-500">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8 flex items-center gap-4">
                <MessageSquare className="text-emerald-500 w-10 h-10" /> Contact Us
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-2xl space-y-6 text-gray-300 leading-relaxed">
                    <p>
                        At PakiFreelance, we understand that effective communication is key to ensuring your remittances are processed efficiently and securely. Our team of experts is dedicated to providing you with the best possible service, and we're here to assist you every step of the way.
                    </p>
                    <p>
                        For any inquiries, questions, or concerns, please don't hesitate to reach out to our support team. Whether you need assistance with optimizing your remittances, troubleshooting issues, or simply want more information about our services, we're here to help. Your satisfaction is our top priority!
                    </p>
                    
                    <div className="mt-8 pt-8 border-t border-gray-800">
                        <div className="flex items-center gap-3 text-emerald-400 font-medium text-lg">
                            <Mail className="w-6 h-6" /> remittanceoptimizer.contact@gmail.com
                        </div>
                    </div>
                </div>

                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-2xl">
                    <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>
                    <ContactForm />
                </div>
            </div>
        </div>
    );
}
