import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { LogIn, Mail, Lock, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(email, password);
            toast.success('Access Granted. Welcome back.');
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative">
            {/* Background Orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-10"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] -z-10"></div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass w-full max-w-xl p-12 shadow-2xl relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-secondary to-accent"></div>
                
                <div className="text-center mb-12">
                    <motion.div 
                        initial={{ y: -20 }}
                        animate={{ y: 0 }}
                        className="inline-flex p-5 bg-primary/10 rounded-[24px] border border-primary/20 mb-8"
                    >
                        <LogIn className="text-primary" size={40} />
                    </motion.div>
                    <h1 className="text-5xl font-extrabold font-heading tracking-tight mb-4">Security Portal</h1>
                    <p className="text-text-muted text-lg font-medium">Verify your credentials to enter the vault.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="input-group">
                        <label className="input-label text-base">Terminal ID (Email)</label>
                        <div className="relative">
                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
                            <input 
                                type="email" 
                                className="input-field pl-14 py-4" 
                                placeholder="name@secure.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label text-base">Access Key (Password)</label>
                        <div className="relative">
                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
                            <input 
                                type="password" 
                                className="input-field pl-14 py-4" 
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="btn btn-primary w-full py-5 text-lg font-bold uppercase tracking-[0.3em] shadow-xl"
                        disabled={loading}
                    >
                        {loading ? 'Authenticating...' : 'Initialize Session'}
                        {!loading && <ChevronRight size={22} />}
                    </button>
                </form>

                <div className="mt-12 pt-10 border-t border-white/10">
                    <p className="text-xs text-center text-primary mb-6 uppercase tracking-[0.3em] font-black">Quick Access Protocols</p>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { role: 'Admin', email: 'admin@example.com', color: 'text-red-400', bg: 'bg-red-500/5' },
                            { role: 'Investor', email: 'investor@example.com', color: 'text-emerald-400', bg: 'bg-emerald-500/5' },
                            { role: 'Founder', email: 'founder@example.com', color: 'text-violet-400', bg: 'bg-violet-500/5' },
                            { role: 'Analyst', email: 'analyst@example.com', color: 'text-amber-400', bg: 'bg-amber-500/5' }
                        ].map((mock) => (
                            <motion.button
                                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }}
                                whileTap={{ scale: 0.98 }}
                                key={mock.role}
                                onClick={() => {
                                    setEmail(mock.email);
                                    setPassword('password123');
                                }}
                                className={`glass ${mock.bg} p-4 text-sm font-bold uppercase tracking-wider transition-all border-white/10 text-center flex flex-col items-center gap-2 group`}
                            >
                                <span className={`${mock.color} group-hover:scale-110 transition-transform`}>{mock.role}</span>
                                <span className="opacity-40 text-[10px] font-medium lowercase italic">click to bypass</span>
                            </motion.button>
                        ))}
                    </div>
                </div>

                <p className="text-center mt-12 text-sm text-text-muted">
                    New to LandVista? <Link to="/request-access" className="text-primary font-bold hover:underline">Request Governance Access</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
