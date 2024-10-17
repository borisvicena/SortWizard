import React from "react";
import { FaComment, FaEnvelope, FaGithub, FaHeart } from "react-icons/fa";
import { FaEnvelopeCircleCheck } from "react-icons/fa6";
import { SiBuymeacoffee } from "react-icons/si";

const Navbar = () => {
  return (
    <header className="w-full my-4 px-4 md:pt-4 select-none">
      <div className="navbar flex justify-between bg-base-200 border border-white/[0.1] text-base-content rounded-box w-full max-w-3xl mx-auto">
        <div className="tooltip tooltip-bottom" data-tip="Buy Me a Coffee">
          <button className="btn btn-square">
            <SiBuymeacoffee className="h-7 w-7" />
          </button>
        </div>
        <div className="tooltip tooltip-bottom" data-tip="Feedback">
          <button className="btn btn-square">
            <FaHeart className="h-7 w-7 text-error" />
          </button>
        </div>
        <div className="flex flex-grow justify-center">
          <div className="tooltip tooltip-bottom" data-tip="Let’s Sort Things Out 🔮">
            <button className="btn btn-primary text-base">Sort Wizard</button>
          </div>
        </div>
        <div className="tooltip tooltip-bottom" data-tip="Github Repository">
          <button className="btn btn-square">
            <FaGithub className="w-7 h-7" />
          </button>
        </div>
        <div className="tooltip tooltip-bottom" data-tip="My Github">
          <button className="btn btn-square">
            <img
              src={"https://avatars.githubusercontent.com/u/47193955?v=4"}
              alt="Github Profile"
              className="w-7 h-7 rounded-full"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
