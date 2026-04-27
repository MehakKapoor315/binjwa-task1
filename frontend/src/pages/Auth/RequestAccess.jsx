import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { UserPlus, Mail, Building, Globe, Phone, Briefcase, Info, ChevronRight, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const RequestAccess = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        organization: '',
        investor_type: 'family_office',
        capital_band: '25cr_plus',
        geography: '',
        purpose: '',
        phone: '',
        designation: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data: response } = await axios.post('http://localhost:5000/api/v1/access-requests', formData);
            toast.success(response.message);
            navigate('/login');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Submission failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full -z-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]"></div>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass w-full max-w-4xl p-12 shadow-2xl relative"
            >
                <Link to="/login" className="absolute top-8 left-8 text-text-muted hover:text-white flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors">
                    <ArrowLeft size={16} /> Back to Login
                </Link>

                <div className="text-center mb-12 pt-4">
                    <h1 className="text-5xl font-extrabold tracking-tight mb-4">Request Access</h1>
                    <p className="text-text-muted text-lg max-w-2xl mx-auto">Submit your professional credentials for LandVista governance review. Approved accounts receive intelligence access.</p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="input-group">
                            <label className="input-label">Full Name</label>
                            <div className="relative">
                                <UserPlus className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                                <input name="full_name" className="input-field pl-14" placeholder="Akash Bathla" onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                                <input name="email" type="email" className="input-field pl-14" placeholder="akash@example.com" onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Organization</label>
                            <div className="relative">
                                <Building className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                                <input name="organization" className="input-field pl-14" placeholder="LandVista Intelligence" onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Designation</label>
                            <div className="relative">
                                <Briefcase className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                                <input name="designation" className="input-field pl-14" placeholder="Founder / CEO" onChange={handleChange} required />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="input-group">
                                <label className="input-label">Investor Type</label>
                                <select name="investor_type" className="input-field" onChange={handleChange}>
                                    <option value="family_office">Family Office</option>
                                    <option value="vc">VC / PE</option>
                                    <option value="angel">Angel Investor</option>
                                    <option value="institutional">Institutional</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <label className="input-label">Capital Band</label>
                                <select name="capital_band" className="input-field" onChange={handleChange}>
                                    <option value="1cr_5cr">1Cr - 5Cr</option>
                                    <option value="5cr_25cr">5Cr - 25Cr</option>
                                    <option value="25cr_plus">25Cr+</option>
                                </select>
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Geography of Interest</label>
                            <div className="relative">
                                <Globe className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                                <input name="geography" className="input-field pl-14" placeholder="North India / PAN India" onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Phone Number</label>
                            <div className="relative">
                                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                                <input name="phone" className="input-field pl-14" placeholder="+91 99999 99999" onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Primary Purpose</label>
                            <div className="relative">
                                <Info className="absolute left-5 top-4 text-text-muted" size={18} />
                                <textarea name="purpose" className="input-field pl-14 h-24 pt-3 resize-none" placeholder="How will you use our intelligence?" onChange={handleChange} required></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2 pt-6">
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="btn btn-primary w-full py-5 text-lg font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3"
                        >
                            {loading ? 'Submitting Request...' : 'Submit Credentials for Review'}
                            {!loading && <ChevronRight size={20} />}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default RequestAccess;
