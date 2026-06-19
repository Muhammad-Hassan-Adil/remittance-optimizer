"use client";

import { useState } from 'react';

export default function ContactForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('http://39.37.165.88:8010/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message })
            });

            if (res.ok) {
                setStatus('success');
                setName('');
                setEmail('');
                setMessage('');
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all" 
                    placeholder="John Doe" 
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all" 
                    placeholder="john@example.com" 
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                <textarea 
                    rows={4} 
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all" 
                    placeholder="How can we help?"
                ></textarea>
            </div>
            <button 
                type="submit" 
                disabled={status === 'loading'}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
            >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
            
            {status === 'success' && (
                <p className="text-emerald-400 text-sm text-center mt-2 font-medium">
                    Message sent successfully!
                </p>
            )}
            {status === 'error' && (
                <p className="text-red-400 text-sm text-center mt-2 font-medium">
                    Failed to send message. Please try again.
                </p>
            )}
        </form>
    );
}
