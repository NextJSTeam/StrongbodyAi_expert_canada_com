'use client';

import React, { useState, FormEvent, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Upload, X, CheckCircle2, AlertCircle, FileText, Loader2 } from 'lucide-react';

interface JobApplicationModalProps {
    isOpen: boolean;
    onClose: () => void;
    jobTitle: string;
    jobId: string;
}

const JobApplicationModalClient: React.FC<JobApplicationModalProps> = ({ isOpen, onClose, jobTitle, jobId }) => {
    const [mounted, setMounted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        age: '',
        message: '',
    });
    const [file, setFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
        type: null,
        message: '',
    });
    
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Lock scroll
    useEffect(() => {
        if (isOpen && mounted) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen, mounted]);

    if (!isOpen || !mounted) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            // Check file size (max 10MB)
            if (selectedFile.size > 10 * 1024 * 1024) {
                setSubmitStatus({ type: 'error', message: 'Bestandsgrootte overschrijdt de limiet van 10MB.' });
                return;
            }
            // Check file type
            const allowedTypes = ['.pdf', '.doc', '.docx'];
            const extension = selectedFile.name.substring(selectedFile.name.lastIndexOf('.')).toLowerCase();
            if (!allowedTypes.includes(extension)) {
                setSubmitStatus({ type: 'error', message: 'Ongeldig bestandstype. Upload aub een PDF, DOC of DOCX.' });
                return;
            }
            
            setFile(selectedFile);
            setSubmitStatus({ type: null, message: '' });
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ type: null, message: '' });

        if (!formData.name || !formData.email || !file) {
            setSubmitStatus({ type: 'error', message: 'Vul aub alle verplichte velden in en upload je cv.' });
            setIsSubmitting(false);
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('subject', `Job Application: ${jobTitle} (${jobId})`);
        formDataToSend.append('message', formData.message || `Applying for ${jobTitle} position.`);
        formDataToSend.append('type', 'job_application');
        formDataToSend.append('files', file);

        // Add contactRequest as JSON string
        const contactRequest = {
            type: 'job_application',
            jobId: jobId,
            jobTitle: jobTitle,
            phone: formData.phone,
            age: formData.age
        };
        formDataToSend.append('contactRequest', JSON.stringify(contactRequest));

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                body: formDataToSend,
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: 'Sollicitatie indienen mislukt' }));
                throw new Error(errorData.error || errorData.message || 'Sollicitatie indienen mislukt');
            }

            setSubmitStatus({
                type: 'success',
                message: 'Sollicitatie succesvol verzonden! Ons team zal je cv beoordelen en spoedig contact met je opnemen.',
            });

            // Reset form
            setTimeout(() => {
                setFormData({ name: '', email: '', phone: '', age: '', message: '' });
                setFile(null);
            }, 2000);
        } catch (error) {
            console.error('Error submitting application:', error);
            setSubmitStatus({
                type: 'error',
                message: error instanceof Error ? error.message : 'Sollicitatie indienen mislukt. Probeer het later opnieuw.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return createPortal(
        <div className="fixed inset-0 z-[10000] overflow-y-auto flex items-start justify-center p-4 md:py-12">
            <div 
                className="fixed inset-0 bg-[#0A0F1C]/60 backdrop-blur-sm" 
                onClick={onClose}
            />
            
            <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 border border-grey-200 z-10 my-auto">
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-grey-100 transition-colors z-10"
                >
                    <X className="w-6 h-6 text-grey-400" />
                </button>

                {/* Header */}
                <div className="p-8 border-b border-grey-200 bg-grey-50/50">
                    <h2 className="text-2xl font-bold text-text-p mb-2">Solliciteer voor functie</h2>
                    <p className="text-text-s font-medium flex items-center gap-2">
                        <span className="text-primary font-bold">{jobTitle}</span>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-text-p mb-2">Volledige naam *</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                className="w-full px-4 py-3 rounded-xl border border-grey-300 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                                placeholder="Je volledige naam"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-text-p mb-2">E-mailadres *</label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                className="w-full px-4 py-3 rounded-xl border border-grey-300 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                                placeholder="naam@voorbeeld.com"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-text-p mb-2">Telefoonnummer</label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                className="w-full px-4 py-3 rounded-xl border border-grey-300 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                                placeholder="Je telefoonnummer"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-text-p mb-2">Leeftijd</label>
                            <input
                                type="number"
                                value={formData.age}
                                onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                                className="w-full px-4 py-3 rounded-xl border border-grey-300 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                                placeholder="Je leeftijd"
                            />
                        </div>
                    </div>

                    {/* CV Upload */}
                    <div>
                        <label className="block text-sm font-bold text-text-p mb-2">CV uploaden (PDF, DOC, DOCX) *</label>
                        <div 
                            onClick={() => fileInputRef.current?.click()}
                            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                                file ? 'border-primary bg-primary-light' : 'border-grey-300 hover:border-primary hover:bg-grey-50'
                            }`}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept=".pdf,.doc,.docx"
                                className="hidden"
                            />
                            {file ? (
                                <div className="flex flex-col items-center gap-2">
                                    <FileText className="w-10 h-10 text-primary" />
                                    <p className="text-sm font-bold text-text-p">{file.name}</p>
                                    <p className="text-xs text-text-s">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                    <button 
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setFile(null);
                                        }}
                                        className="mt-2 text-xs font-bold text-error hover:underline"
                                    >
                                        Bestand verwijderen
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-grey-100 flex items-center justify-center">
                                        <Upload className="w-6 h-6 text-grey-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-text-p">Klik om te uploaden of sleep het cv hierheen</p>
                                        <p className="text-xs text-text-s mt-1">Maximale bestandsgrootte 10MB</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-text-p mb-2">Korte introductie (Optioneel)</label>
                        <textarea
                            value={formData.message}
                            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl border border-grey-300 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none min-h-[100px] resize-none"
                            placeholder="Vertel ons kort iets over jezelf..."
                        />
                    </div>

                    {submitStatus.message && (
                        <div className={`p-4 rounded-xl flex items-start gap-3 border ${
                            submitStatus.type === 'success' ? 'bg-success/5 text-success border-success/20' : 'bg-error/5 text-error border-error/20'
                        }`}>
                            {submitStatus.type === 'success' ? (
                                <CheckCircle2 className="w-5 h-5 shrink-0" />
                            ) : (
                                <AlertCircle className="w-5 h-5 shrink-0" />
                            )}
                            <p className="text-sm font-medium">{submitStatus.message}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Sollicitatie verzenden...
                            </>
                        ) : (
                            'Sollicitatie verzenden'
                        )}
                    </button>
                </form>
            </div>
        </div>
    ,
        document.body
    );
};

export default function JobApplicationModal(props: JobApplicationModalProps) {
    return <JobApplicationModalClient {...props} />;
}
