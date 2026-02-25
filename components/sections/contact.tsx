"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Linkedin, Github, Phone, Send, CheckCircle, XCircle } from "lucide-react";
import { MagneticButton } from "@/components/animations/MagneticButton";

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "rate-limited">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "", website: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else if (response.status === 429) {
        setStatus("rate-limited");
        setTimeout(() => setStatus("idle"), 8000);
      } else {
        const data = await response.json().catch(() => null);
        setErrorMessage(data?.error || "Something went wrong. Please try again.");
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setErrorMessage("Network error. Check your connection and try again.");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-secondary/30 relative">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-orange-500 text-sm tracking-[0.3em] uppercase mb-4 block font-body"
            >
              Let&apos;s Build
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display text-4xl md:text-6xl font-bold mb-6"
            >
              Have a project that needs{" "}
              <span className="text-orange-500">an engineer?</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-muted-foreground max-w-2xl mx-auto font-body"
            >
              Open to founding engineer roles, contract work, and early-stage
              technical partnerships. Happy to chat about what you&apos;re building.
            </motion.p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-card border border-border rounded-2xl p-8">
                <h3 className="font-display text-2xl font-semibold mb-8">Contact Information</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
                      <Mail className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <p className="font-medium font-body mb-1">Email</p>
                      <a
                        href="mailto:aungmyintoo.david@gmail.com"
                        className="text-muted-foreground hover:text-orange-500 transition-colors duration-300 font-body animated-underline"
                      >
                        aungmyintoo.david@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
                      <Phone className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <p className="font-medium font-body mb-1">Phone</p>
                      <a
                        href="tel:+6597773062"
                        className="text-muted-foreground hover:text-orange-500 transition-colors duration-300 font-body animated-underline"
                      >
                        +65 9777 3062
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
                      <Github className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <p className="font-medium font-body mb-1">GitHub</p>
                      <a
                        href="https://github.com/davidamo9"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-orange-500 transition-colors duration-300 font-body animated-underline"
                      >
                        github.com/davidamo9
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
                      <Linkedin className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <p className="font-medium font-body mb-1">LinkedIn</p>
                      <a
                        href="https://www.linkedin.com/in/aung-myint-oo99/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-orange-500 transition-colors duration-300 font-body animated-underline"
                      >
                        linkedin.com/in/aung-myint-oo99
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 space-y-6">
                {/* Honeypot field — hidden from humans, bots fill it */}
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 font-body">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all duration-300 font-body"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 font-body">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all duration-300 font-body"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 font-body">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all duration-300 resize-none font-body"
                    placeholder="Your message..."
                  />
                </div>

                <MagneticButton className="w-full">
                  <button
                    type="submit"
                    disabled={status === "loading" || status === "rate-limited"}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-orange-500 text-background font-semibold rounded-xl hover:bg-orange-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shimmer-hover"
                  >
                    {status === "loading" && (
                      <>
                        <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                        Sending...
                      </>
                    )}
                    {status === "success" && (
                      <>
                        <CheckCircle className="h-5 w-5" />
                        Message Sent!
                      </>
                    )}
                    {status === "error" && (
                      <>
                        <XCircle className="h-5 w-5" />
                        Failed to Send
                      </>
                    )}
                    {status === "rate-limited" && (
                      <>
                        <XCircle className="h-5 w-5" />
                        Too Many Requests
                      </>
                    )}
                    {status === "idle" && (
                      <>
                        <Send className="h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </MagneticButton>

                {status === "success" && (
                  <p className="text-sm text-green-500 text-center font-body">
                    Thank you for your message! I&apos;ll get back to you soon.
                  </p>
                )}
                {status === "rate-limited" && (
                  <p className="text-sm text-amber-500 text-center font-body">
                    Too many submissions. Please wait a few minutes before trying again.
                  </p>
                )}
                {status === "error" && (
                  <p className="text-sm text-red-500 text-center font-body">
                    {errorMessage || "Something went wrong."} You can also{" "}
                    <a href="mailto:aungmyintoo.david@gmail.com" className="underline hover:text-red-400">email me directly</a>.
                  </p>
                )}
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
