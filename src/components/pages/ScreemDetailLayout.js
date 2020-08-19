import React from "react";
import styled from "styled-components";

const ScreemDetailContainer = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.7);
`;

const ScreemDetailContent = styled.div`
  width: 45vw;
  min-height: 20vh;
  padding-bottom: 2rem;
  background: #fff;
  border-radius: 5px;
`;

function ScreemDetailsLayout({ children }) {
  return (
    <ScreemDetailContainer>
      <ScreemDetailContent>{children}</ScreemDetailContent>
    </ScreemDetailContainer>
  );
}

export default ScreemDetailsLayout;
