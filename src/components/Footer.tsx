import { useEffect, useState } from "react";
import { FaInstagram, FaLinkedin, FaWhatsapp, FaFileDownload, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const BG = "#171717";
const PAPER = "#e5dfbc"; 
const ACCENT = "#d14d44";

export default function Footer() {
  const [timecode, setTimecode] = useState("00:00:00:00");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      const s = String(now.getSeconds()).padStart(2, "0");
      const f = String(Math.floor(Math.random() * 24)).padStart(2, "0");
      setTimecode(`${h}:${m}:${s}:${f}`);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const links = [
    { icon: <FaInstagram aria-hidden="true" />, href: "https://www.instagram.com/rdisquete/", label: "Instagram" },
    { icon: <FaWhatsapp aria-hidden="true" />, href: "https://wa.me/+34648791998", label: "WhatsApp" },
    { icon: <MdEmail aria-hidden="true" />, href: "mailto:rafael.doradozamoro@gmail.com", label: "Email" },
    { icon: <FaLinkedin aria-hidden="true" />, href: "https://www.linkedin.com/in/rafael-dorado-zamoro/", label: "LinkedIn" },
    { icon: <FaFileDownload aria-hidden="true" />, href: "/images/CV_Rafael_Dorado_Zamoro.pdf", label: "Descargar CV", download: true },
    { icon: <FaGithub aria-hidden="true" />, href: "https://github.com/RDisquete", label: "GitHub" }
  ];

  return (
    <footer
      className="relative flex flex-col items-center w-full py-6 border-t-[1px] select-none footer-root"
      style={{ backgroundColor: BG, borderColor: `${PAPER}20` }}
    >
      <div className="absolute flex items-center gap-2 pointer-events-none left-4 bottom-2 opacity-30">
        <div className="w-1 h-3" style={{ backgroundColor: ACCENT }} />
        <span className="text-[8px] font-mono tracking-[0.2em]" style={{ color: PAPER }}>
          SIDE_A // R.D.Z // 33RPM
        </span>
      </div>

      <div className="absolute text-right pointer-events-none right-4 bottom-2 opacity-30">
        <span className="text-[8px] font-mono tracking-widest uppercase block mb-[2px]" style={{ color: PAPER }}>
          Live Master
        </span>
        <span className="text-[10px] font-mono font-bold" style={{ color: ACCENT }}>
          {timecode}
        </span>
      </div>
      <nav aria-label="Enlaces de contacto" className="z-10">
        <div className="flex text-2xl gap-7" style={{ color: PAPER }}>
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target={link.download ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={link.label}
              className="transition-all duration-300 hover:text-[#d14d44] transform hover:scale-110"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </nav>
    </footer>
  );
}