import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, X, FileText, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

const NDAModal = ({ isOpen, onClose }) => {
    const { api, signNDA } = useAuth();
    const [latestNDA, setLatestNDA] = useState(null);
    const [fullName, setFullName] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen) {
            fetchLatestNDA();
        }
    }, [isOpen]);

    const fetchLatestNDA = async () => {
        try {
            const { data: response } = await api.get('/v1/nda/latest');
            setLatestNDA(response.data);
        } catch (error) {
            console.error('Error fetching latest NDA:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!fullName || !agreed || !latestNDA) {
            toast.error('Identity verification failed. Please check all fields.');
            return;
        }

        setIsSubmitting(true);
        try {
            // Updated signNDA to use the version ID
            await api.post('/v1/nda/accept', { 
                nda_version_id: latestNDA._id,
                fullName,
                accepted: true 
            });
            toast.success(`NDA ${latestNDA.version} Executed Successfully`);
            onClose();
            window.location.reload(); // Refresh to update status
        } catch (error) {
            toast.error(error.response?.data?.message || 'Verification Error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        onClick={onClose}
                    />
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0, y: 40 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 40 }}
                        className="glass relative w-full max-w-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border-white/20"
                    >
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-secondary to-accent"></div>
                        
                        <div className="p-10">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20">
                                        <ShieldCheck className="text-primary" size={28} />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-extrabold font-heading mb-0">Legal Compliance</h2>
                                        <p className="text-text-muted text-sm uppercase tracking-widest font-bold">Protocol {latestNDA?.version || 'Loading...'}</p>
                                    </div>
                                </div>
                                <button onClick={onClose} className="p-2 text-text-muted hover:text-white transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-black/40 rounded-3xl p-8 border border-white/5 max-h-[350px] overflow-y-auto custom-scrollbar">
                                    <div className="flex items-center gap-2 mb-4 text-primary">
                                        <FileText size={18} />
                                        <span className="font-bold uppercase tracking-wider text-xs">Agreement Terms</span>
                                    </div>
                                    <div className="space-y-4 text-sm text-text-muted leading-relaxed">
                                        {latestNDA?.summary_text ? (
                                            latestNDA.summary_text.map((text, i) => (
                                                <p key={i}><strong className="text-white">{i + 1}. Obligation:</strong> {text}</p>
                                            ))
                                        ) : (
                                            <p>Loading terms...</p>
                                        )}
                                        <p><strong className="text-white">IV. Digital Audit:</strong> Your signature is timestamped and your IP address ({window.location.hostname}) will be logged for governance auditing.</p>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="input-group">
                                            <label className="input-label">Full Legal Name</label>
                                            <input 
                                                type="text" 
                                                className="input-field"
                                                placeholder="Enter your full name"
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col justify-end pb-5">
                                            <label className="flex items-center gap-4 cursor-pointer group">
                                                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${agreed ? 'bg-primary border-primary' : 'border-white/20 group-hover:border-primary/50'}`}>
                                                    {agreed && <CheckCircle2 size={16} className="text-white" />}
                                                    <input 
                                                        type="checkbox" 
                                                        className="hidden"
                                                        checked={agreed}
                                                        onChange={(e) => setAgreed(e.target.checked)}
                                                    />
                                                </div>
                                                <span className="text-sm font-medium text-text-muted group-hover:text-white transition-colors">I accept the terms & conditions</span>
                                            </label>
                                        </div>
                                    </div>

                                    <button 
                                        type="submit" 
                                        className="btn btn-primary w-full py-5 text-lg font-bold uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(99,102,241,0.2)]"
                                        disabled={isSubmitting || !latestNDA}
                                    >
                                        {isSubmitting ? 'Recording Audit Log...' : 'Execute Digital Signature'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default NDAModal;
