"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/animations/MagneticButton";

const navItems = [
  { name: "What I Do", href: "#what-i-do" },
  { name: "Ventures", href: "#ventures" },
  { name: "Work", href: "#work" },
  { name: "Expertise", href: "#expertise" },
  { name: "Contact", href: "#contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <MagneticButton strength={0.2}>
            <a href="#home" className="font-display text-2xl font-bold text-foreground hover:text-orange-500 transition-colors duration-300">
              AMO
            </a>
          </MagneticButton>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <MagneticButton key={item.name} strength={0.15}>
                <a
                  href={item.href}
                  className="text-sm tracking-wide text-muted-foreground hover:text-orange-500 transition-colors duration-300 font-body animated-underline"
                >
                  {item.name}
                </a>
              </MagneticButton>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <MagneticButton>
              <a
                href="#contact"
                className="px-5 py-2.5 border border-orange-500/50 text-orange-500 rounded-full text-sm font-medium hover:bg-orange-500/10 transition-all duration-300 shimmer-hover"
              >
                Let&apos;s Talk
              </a>
            </MagneticButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground hover:text-orange-500 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="py-6 space-y-1 border-t border-border/50 mt-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-lg text-muted-foreground hover:text-orange-500 transition-colors duration-300 py-3 font-body"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <a
              href="#contact"
              className="inline-block mt-4 px-6 py-3 border border-orange-500/50 text-orange-500 rounded-full text-sm font-medium hover:bg-orange-500/10 transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Let&apos;s Talk
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
