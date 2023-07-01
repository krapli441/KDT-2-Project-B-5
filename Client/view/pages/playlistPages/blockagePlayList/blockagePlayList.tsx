import React from "react";

const overallMain: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  overflowX: "hidden",
  overflow: "hidden",
  height: "800px",
};
const scrollContent: React.CSSProperties = {
  scrollbarWidth: "none" /* Firefox에서 스크롤바 감추기 */,
  msOverflowStyle: "none" /* IE/Edge에서 스크롤바 감추기 */,
};

/* 
1. minHeight: "80px" // 최소 박스 크기 

2. .innerBox {
  height: 100px;
  flex-shrink: 0;
  } // 내부 박스의 크기를 유지 */

export default function blockage() {
  return (
    <div>
      <div style={{ width: "340px", height: "120px" }}> 대충 제목</div>

      <div style={overallMain}>
        <div style={{ width: "340px", minHeight: "80px" }}>1</div>
        <div style={{ width: "340px", minHeight: "80px" }}>1</div>
        <div style={{ width: "340px", minHeight: "80px" }}>1</div>
        <div style={{ width: "340px", minHeight: "80px" }}>1</div>
        <div style={{ width: "340px", minHeight: "80px" }}>1</div>
        <div style={{ width: "340px", minHeight: "80px" }}>1</div>
        <div style={{ width: "340px", minHeight: "80px" }}>1</div>
        <div style={{ width: "340px", minHeight: "80px" }}>1</div>
        <div style={{ width: "340px", minHeight: "80px" }}>1</div>
        <div style={{ width: "340px", minHeight: "80px" }}>1</div>
        <div style={{ width: "340px", minHeight: "80px" }}>1</div>
        <div style={{ width: "340px", minHeight: "80px" }}>1</div>
        <div style={{ width: "340px", minHeight: "80px" }}>1</div>
        <div style={{ width: "340px", minHeight: "80px" }}>1</div>
      </div>
    </div>
  );
}
