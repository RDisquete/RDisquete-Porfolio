import React from "react";
import type { ElementType } from "react";
import { FaInstagram, FaWhatsapp, FaLinkedin, FaFileDownload, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export interface SocialLink {
  key: string;
  href: string;
  label: string;
  download?: boolean;
}

export const socialLinks: SocialLink[] = [
  { key: "instagram", href: "https://www.instagram.com/rdisquete/", label: "Instagram" },
  { key: "whatsapp",  href: "https://wa.me/+34648791998",            label: "WhatsApp" },
  { key: "email",     href: "mailto:rafael.doradozamoro@gmail.com",  label: "Email" },
  { key: "linkedin",  href: "https://www.linkedin.com/in/rafael-dorado-zamoro/", label: "LinkedIn" },
  { key: "cv",        href: "/docs/CV_Rafael_Dorado_Zamoro.pdf",     label: "Descargar CV", download: true },
  { key: "github",    href: "https://github.com/RDisquete",          label: "GitHub" },
];

export const socialIcons: Record<string, ElementType> = {
  instagram: FaInstagram,
  whatsapp:  FaWhatsapp,
  email:     MdEmail,
  linkedin:  FaLinkedin,
  cv:        FaFileDownload,
  github:    FaGithub,
};

export function renderSocialIcon(key: string, className = "w-7 h-7 md:w-8 md:h-8") {
  const Icon = socialIcons[key];
  if (!Icon) return null;
  return <Icon className={className} aria-hidden="true" />;
}
