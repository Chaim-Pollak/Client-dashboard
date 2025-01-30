import React from "react";

function Header({ children }) {
  return (
    <div className="my-5">
      <h1 className="text-4xl text-center font-semibold">{children}</h1>
    </div>
  );
}

export default Header;
