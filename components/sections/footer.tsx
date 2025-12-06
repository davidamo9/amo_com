"use client";

import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/davidamo9", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/aung-myint-oo99/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:aungmyintoo.david@gmail.com", label: "Email" },
  ];

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Main footer content */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
            {/* Brand */}
            <div>
              <a href="#home" className="font-display text-3xl font-bold text-gold-500 mb-4 block">
                AMO
              </a>
              <p className="text-muted-foreground font-body max-w-xs">
                Full-Stack AI Engineer building production-ready systems with RAG pipelines and enterprise deployments.
              </p>
            </div>

            {/* Navigation */}
            <nav className="flex flex-wrap gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-gold-500 transition-colors duration-300 font-body text-sm"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="p-3 rounded-xl bg-card border border-border hover:border-gold-500/30 text-muted-foreground hover:text-gold-500 transition-all duration-300 hover:scale-105"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-border mb-8" />

          {/* Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="text-muted-foreground font-body text-sm">
              &copy; {currentYear} Aung Myint Oo. All rights reserved.
            </p>
            <p className="text-muted-foreground/60 font-body text-sm">
              Designed & built with precision
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
