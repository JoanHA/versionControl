import React from "react";
import { Link } from "react-router-dom";
function Sidebar() {
  return (
    <div id="sidebar" style={{ width: "20%" }}>
      <div className="list-group px-1">
        <button
          type="button"
          className="list-group-item list-group-item-action"
        >
          <Link to={"/"}> Maestro documental</Link>
        </button>
        <button
          type="button"
          className="list-group-item list-group-item-action"
        >
          <Link>Control de cambios </Link>
        </button>
        <button
          type="button"
          className="list-group-item list-group-item-action"
        >
          <Link>Retención documental </Link>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
