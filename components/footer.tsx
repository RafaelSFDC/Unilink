"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Link as LinkIcon,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Mail,
  MapPin,
  Phone,
  Heart,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const footerLinks = {
  product: [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Analytics", href: "/dashboard/analytics" },
    { name: "Links", href: "/dashboard/links" },
    { name: "Temas", href: "/dashboard/theme" },
  ],
  company: [
    { name: "Início", href: "/" },
    { name: "Sobre", href: "/about" },
    { name: "Contato", href: "/contact" },
  ],
  support: [
    { name: "Help", href: "/help" },
    { name: "Docs", href: "/docs" },
  ],
};

const socialLinks = [
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "GitHub", icon: Github, href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-background border-t-8 border-foreground">
      {/* Newsletter Section */}
      <div className="border-b-4 border-foreground bg-accent">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-4xl lg:text-6xl font-black uppercase leading-none mb-6">
              FIQUE POR DENTRO
            </h3>
            <p className="text-xl font-bold mb-10 opacity-80 uppercase tracking-tight">
              DICAS BRUTAIS E INSIGHTS REAIS. SEM SPAM.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <Input
                type="email"
                placeholder="SEU MELHOR EMAIL"
                className="h-16 border-4 border-foreground bg-white text-xl font-bold rounded-none shadow-neo placeholder:opacity-50"
              />
              <Button className="h-16 px-10 text-xl font-black uppercase shadow-neo-lg bg-primary">
                ASSINAR
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <a
              href="/"
              className="flex items-center space-x-3 mb-8 group w-fit"
            >
              <div className="border-4 border-foreground p-1 bg-secondary shadow-neo group-hover:shadow-none translate-x-0 translate-y-0 group-hover:translate-x-1 group-hover:translate-y-1 transition-all">
                <LinkIcon className="h-10 w-10 text-foreground" />
              </div>
              <span className="text-4xl font-black uppercase italic">
                Unilink
              </span>
            </a>
            <p className="text-xl font-bold leading-tight mb-8">
              A PLATAFORMA MAIS COMPLETA PARA QUEM NÃO ACEITA O COMUM.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 text-lg font-bold uppercase italic">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3" />
                SP / BRASIL
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3" />
                CONTATO@UNILINK.IO
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-2xl font-black uppercase mb-6 border-b-4 border-foreground inline-block">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-lg font-bold uppercase hover:bg-secondary px-2 transition-colors inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t-4 border-foreground bg-foreground text-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center text-lg font-bold uppercase italic">
              <span>© 2024 UNILINK / FEITO COM</span>
              <Heart className="w-6 h-6 mx-2 text-primary fill-current" />
            </div>

            <div className="flex items-center space-x-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="hover:scale-125 transition-transform"
                  aria-label={social.name}
                >
                  <social.icon className="w-8 h-8" />
                </a>
              ))}
            </div>

            <div className="font-bold uppercase tracking-widest text-sm">
              BR / PT
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
