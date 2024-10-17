import React from "react";

const Navbar = () => {
  return (
    <header className="w-full my-4 px-4 md:pt-4 select-none">
      <div className="navbar justify-center bg-base-200 border border-white/[0.1] text-base-content rounded-box w-full max-w-3xl mx-auto indicator">
        <span className="indicator-item badge badge-secondary">welcome</span>
        <button className="btn btn-primary text-base">Sort Wizard</button>
        <button className="btn btn-neutral">Github</button>
      </div>
    </header>
  );
};

export default Navbar;
