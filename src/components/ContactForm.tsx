"use client";
import { motion } from 'framer-motion';
import { ArrowRight, Building, Calendar, Mail, MapPin, MessageSquare, Phone, Send, User } from 'lucide-react';
import { useState } from 'react';
import { useSubmitContact } from '../hooks/useContact';

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' as const } },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};


const EMPTY_FORM = { name: '', email: '', company: '', message: '' };

// ─── Component ────────────────────────────────────────────────────────────────
export function ContactForm() {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ── TanStack mutation powered by Axios ──────────────────────────────────────
  const { mutate: submitContact, isPending } = useSubmitContact();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitContact(formData, {
      onSuccess: () => {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData(EMPTY_FORM);
        }, 3000);
      },
    });
  };

  return (
    <section id="contact" className="py-12 sm:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-secondary/10 to-accent/10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-stretch">

          {/* ── Left ─────────────────────────────────────────────────── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-4"
          >
            <div>
              <motion.span variants={fadeInUp} className="text-[#00A8FF] font-semibold text-sm uppercase tracking-wider">
                Get In Touch
              </motion.span>
              <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-bold mt-4 mb-2">
                <span className="text-white">Let&apos;s build the</span>
                <br />
                <span className="gradient-text">Future Together</span>
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-gray-400 text-lg">
                Ready to automate your operations? Contact us through the form or use our direct channels below.
              </motion.p>
            </div>

            {/* Company Info Cards */}
            <motion.div variants={staggerContainer} className="grid sm:grid-cols-2 gap-6">
              <motion.div variants={scaleIn} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <h4 className="text-white font-bold mb-1">Email Us</h4>
                <a href="mailto:info@cemtrixai.com" className="text-sm text-gray-400">info@cemtrixai.com</a>
              </motion.div>

              <motion.div variants={scaleIn} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/30 transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <h4 className="text-white font-bold mb-1">Call Us</h4>
                <a href="tel:+971501679656" className="text-sm text-gray-400">+971 50 167 9656</a>
              </motion.div>

              <motion.div variants={scaleIn} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-secondary/30 transition-colors group sm:col-span-2">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5 text-secondary" />
                </div>
                <h4 className="text-white font-bold mb-1">Our Location</h4>
                <a href="https://maps.app.goo.gl/JFrYEUzc1L96WFP48" className="text-sm text-gray-400" target="_blank">Building A1, Dubai Digital Park, Dubai Silicon Oasis, Dubai UAE</a>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ── Right: form ────────────────────────────────────────────────── */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn}>
            <div className="p-8 rounded-3xl bg-dark-card/60 backdrop-blur-xl border border-white/10">

              {/* Success state */}
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Send className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-400">We&apos;ll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-primary" />
                    Book a Call
                  </h3>

                  {/* Name */}
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors cursor-text"
                    />
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email"
                      required
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors cursor-text"
                    />
                  </div>

                  {/* Company */}
                  <div className="relative">
                    <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Company name"
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors cursor-text"
                    />
                  </div>

                  {/* Preferred Time */}
                  {/* <div>
                    <p className="text-sm text-gray-400 mb-3">Preferred time for call</p>
                    <div className="flex flex-wrap gap-2">
                      {TIME_SLOTS.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, preferredTime: time }))}
                          className={cn(
                            'px-3 py-1.5 rounded-lg text-sm border transition-all cursor-pointer',
                            formData.preferredTime === time
                              ? 'bg-primary/20 border-primary text-white'
                              : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10',
                          )}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div> */}

                  {/* Message */}
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-500" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your enquiry..."
                      rows={3}
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors resize-none cursor-text"
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={isPending}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-xl bg-linear-to-r from-[#008bfd] to-secondary text-white font-semibold shadow-lg shadow-[#00c7fd]/25 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer mt-18"
                  >
                    {isPending ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Book Your Call
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
