
import React from "react";
import { ShieldCheck, Activity } from "lucide-react";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="brand">
        <div className="brand-icon">
          <ShieldCheck size={27} />
        </div>

        <span>TruthLens AI</span>
      </div>

      <div className="nav-status">
        <span className="status-dot"></span>
        <Activity size={16} />
        <span>AI News Intelligence</span>
      </div>

    </nav>
  );
}

export default Navbar;
