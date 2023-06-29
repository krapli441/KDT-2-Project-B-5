import React from "react";
import { MdSwapVert } from "react-icons/md";

function navigate() {
  const nowMeInput = document.getElementById("nowMe");
  const wantMeInput = document.getElementById("wantMe");
  /*   const nowMe = nowMeInput.value;
  const wantMe = wantMeInput.value;
 */
}
export default function search() {
  return (
    <>
      <input type="text" name="now" id="now" placeholder="현재 위치" />
      <MdSwapVert color="#000000" fontSize="32px" />
      <input type="text" name="target" id="target" placeholder="목표 위치" />

      <button onClick={navigate}>길찾기</button>
    </>
  );
}
