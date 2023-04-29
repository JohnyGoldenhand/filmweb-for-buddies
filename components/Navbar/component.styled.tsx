import styled from "styled-components";
import { Button } from "~/styles/base.styled";

export const StyledNavbar = styled.div`
  width: 100%;
  height: 4rem;
  background-color: blueviolet;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  align-items: center;
  position: sticky;
  top: 0;
  left: 0;
`;
export const ListButton = styled(Button)`
  font-weight: bold;
`;
