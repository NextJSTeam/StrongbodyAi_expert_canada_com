"use client";

import React, { useState } from "react";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ContactForm = () => {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        role: "Client looking for services",
        message: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    type: "strongbody-canada"
                })
            });

            if (response.ok) {
                setStatus("success");
                setFormData({ firstName: "", lastName: "", email: "", role: "Client looking for services", message: "" });
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error("Form submission error:", error);
            setStatus("error");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="relative min-h-[500px]">
            <AnimatePresence mode="wait">
                {status === "success" ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="bg-green-50 p-10 rounded-[2rem] border border-green-100 text-center space-y-6 flex flex-col items-center justify-center h-full absolute inset-0 shadow-sm"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
                            className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2"
                        >
                            <CheckCircle2 size={40} />
                        </motion.div>
                        <div className="space-y-2">
                            <h3 className="text-3xl font-bold text-green-900">Message Sent!</h3>
                            <p className="text-green-700 font-medium max-w-xs mx-auto text-lg">
                                Thank you! We've received your request and will get back to you within 24 hours.
                            </p>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setStatus("idle")}
                            className="px-8 py-3 bg-white border border-green-200 text-green-700 font-bold rounded-xl hover:bg-green-100 transition-colors shadow-sm"
                        >
                            Send Another Message
                        </motion.button>
                    </motion.div>
                ) : (
                    <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        onSubmit={handleSubmit}
                        className="bg-grey-50 p-8 md:p-10 rounded-[2rem] border border-grey-200 space-y-6 shadow-sm"
                    >
                        <div className="space-y-1">
                            <h3 className="text-2xl font-bold text-text-p">Send Us a Message</h3>
                            <p className="text-sm text-text-m font-medium">Your health and performance journey starts here.</p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label className="block text-[10px] font-bold text-text-p uppercase tracking-widest ml-1">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    required
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full px-5 py-3.5 rounded-xl border border-grey-200 bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary text-sm font-medium text-text-p transition-all placeholder-[#687588] shadow-sm"
                                    placeholder="John"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-[10px] font-bold text-text-p uppercase tracking-widest ml-1">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    required
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full px-5 py-3.5 rounded-xl border border-grey-200 bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary text-sm font-medium text-text-p transition-all placeholder-[#687588] shadow-sm"
                                    placeholder="Doe"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[10px] font-bold text-text-p uppercase tracking-widest ml-1">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-5 py-3.5 rounded-xl border border-grey-200 bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary text-sm font-medium text-text-p transition-all placeholder-[#687588] shadow-sm"
                                placeholder="john@example.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[10px] font-bold text-text-p uppercase tracking-widest ml-1">I am a</label>
                            <div className="relative">
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full px-5 py-3.5 rounded-xl border border-grey-200 bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary text-sm font-bold text-text-p appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M5%207L10%2012L15%207%22%20stroke%3D%22%23000000%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] bg-[length:20px_20px] bg-[right_1rem_center] bg-no-repeat shadow-sm"
                                >
                                    <option>Client looking for services</option>
                                    <option>Professional interested in partnership</option>
                                    <option>Organization / Clinic</option>
                                    <option>Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[10px] font-bold text-text-p uppercase tracking-widest ml-1">Message</label>
                            <textarea
                                name="message"
                                required
                                rows={4}
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-5 py-3.5 rounded-xl border border-grey-200 bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary text-sm font-medium text-text-p resize-none transition-all placeholder-[#687588] shadow-sm"
                                placeholder="Tell us how we can help..."
                            />
                        </div>

                        <AnimatePresence>
                            {status === "error" && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl border border-red-100"
                                >
                                    <AlertCircle size={18} />
                                    <span className="text-xs font-bold uppercase tracking-tight">Failed to send message. Please try again.</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.button
                            type="submit"
                            disabled={status === "loading"}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="w-full bg-primary text-white py-4.5 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-[0_8px_30px_rgb(50,189,242,0.3)] active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group"
                        >
                            {status === "loading" ? (
                                <>
                                    <span className="animate-pulse">Processing...</span>
                                    <Loader2 size={20} className="animate-spin" />
                                </>
                            ) : (
                                <>
                                    <span>Send Message</span>
                                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </>
                            )}
                        </motion.button>
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ContactForm;

