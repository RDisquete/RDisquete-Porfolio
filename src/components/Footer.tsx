import { useEffect, useState } from "react";
import { FaInstagram, FaLinkedin, FaWhatsapp, FaFileDownload, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const BG = "#171717";
const PAPER = "#cdc69c";
const ACCENT = "#b43a31";

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

      <div
        className="flex text-2xl transition-colors duration-300 gap-7"
        style={{ color: PAPER }}
      >
        {[
          { icon: <FaInstagram />, href: "https://www.instagram.com/rdisquete/" },
          { icon: <FaWhatsapp />, href: "https://wa.me/+34648791998" },
          { icon: <MdEmail />, href: "mailto:rafael.doradozamoro@gmail.com" },
          { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/rafael-dorado-zamoro/" },
          { icon: <FaFileDownload />, href: "/images/CV_Rafael_Dorado_Zamoro.pdf", download: true },
          {icon: <FaGithub/>, href:"https://github.com/RDisquete"}
        ].map((link, index) => (
          <a
            key={index}
            href={link.href}
            target={link.download ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="transition-all duration-300 hover:text-[#b43a31] transform hover:scale-110"
          >
            {link.icon}
          </a>
        ))}
      </div>
    </footer>
  );
}