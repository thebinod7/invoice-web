import React from "react";

interface IBtnPrimaryProps {
  handleBtnClick: () => void;
}

export default function BtnPrimary({ handleBtnClick }: IBtnPrimaryProps) {
  return <button onClick={handleBtnClick}>Click to apply Visa</button>;
}
