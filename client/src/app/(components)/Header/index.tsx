import React from "react";
type HeaderPros = {
  name: string;
};

const Header = ({ name }: HeaderPros) => {
  return <h1 className="text-2xl font-semibold text-gray-700">{name}</h1>;
};

export default Header;
