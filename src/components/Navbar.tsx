"use client";
import React from "react";
import { FaComment, FaEnvelope, FaGithub, FaHeart } from "react-icons/fa";
import { FaEnvelopeCircleCheck } from "react-icons/fa6";
import { SiBuymeacoffee } from "react-icons/si";
import { useState } from "react";

const Navbar = () => {
  const [isReloading, setIsReloading] = useState(false);

  const createHeart = () => {
    const heart = document.createElement("div");
    heart.innerHTML = "❤️";
    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = "-5vh";
    heart.style.animationDuration = Math.random() * 2 + 3 + "s";
    heart.className = "falling-heart";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
  };

  const handleHeartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Heart clicked!");
    for (let i = 0; i < 12; i++) {
      setTimeout(createHeart, i * 150);
    }
  };

  const handleReload = () => {
    setIsReloading(true);

    // Create sparkle effect before reload
    const createSparkle = () => {
      const sparkle = document.createElement("div");
      sparkle.innerHTML = "✨";
      sparkle.style.position = "fixed";
      sparkle.style.left = Math.random() * 100 + "vw";
      sparkle.style.top = Math.random() * 100 + "vh";
      sparkle.style.animationDuration = Math.random() * 1 + 1 + "s";
      sparkle.className = "falling-sparkle";
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 1000);
    };

    // Create multiple sparkles
    for (let i = 0; i < 15; i++) {
      setTimeout(createSparkle, i * 100);
    }

    // Reload after animation
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  return (
    <header className="w-full my-4 px-4 md:pt-4 select-none">
      <div className="navbar flex justify-between bg-base-200 border border-white/[0.1] text-base-content rounded-box w-full max-w-3xl mx-auto">
        <div className="tooltip tooltip-bottom" data-tip="Buy Me a Coffee">
          <a
            href="https://www.buymeacoffee.com/borisvicena"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-square"
          >
            <SiBuymeacoffee className="h-7 w-7" />
          </a>
        </div>
        <div className="tooltip tooltip-bottom" data-tip="Spread Some Love ✨">
          <button onClick={handleHeartClick} className="btn btn-ghost btn-square transition-transform">
            <FaHeart className="h-7 w-7 text-error animate-pulse" />
          </button>
        </div>
        <div className="flex flex-grow justify-center">
          <div className="tooltip tooltip-bottom" data-tip="Let's Sort Things Out 🔮">
            <button
              onClick={handleReload}
              disabled={isReloading}
              className={`btn btn-primary text-base ${isReloading ? "animate-spin" : ""}`}
            >
              {isReloading ? "🔮" : "Sort Magic"}
            </button>
          </div>
        </div>
        <div className="tooltip tooltip-bottom" data-tip="Github Repository">
          <a
            href="https://github.com/borisvicena/SortWizard"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-square"
          >
            <FaGithub className="w-7 h-7" />
          </a>
        </div>
        <div className="tooltip tooltip-bottom" data-tip="My Github">
          <a href="https://github.com/borisvicena" target="_blank" rel="noopener noreferrer" className="btn btn-square">
            <img
              src={"https://avatars.githubusercontent.com/u/47193955?v=4"}
              alt="Github Profile"
              className="w-7 h-7 rounded-full"
            />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
