import React from "react";
import { IoLogoGithub } from "react-icons/io";

export function Footer() {
  return (
    <div className="flex justify-between items-center bg-slate-950 px-8 py-4 text-[0.625rem] opacity-75">
      <p>
        © 2024 Copyright <span className="font-semibold"> Expert notes</span>
      </p>

      <a
        className="flex flex-row items-center justify-center gap-2 hover:text-purple-800"
        href="https://github.com/lucascmpos/expert-notes"
        target="_blank"
      >
        <p>Feito por Lucas Campos</p>
        <IoLogoGithub size={18} />
      </a>
    </div>
  );
}
