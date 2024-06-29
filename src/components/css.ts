import { css } from "hono/css";

export const _flex = css`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const _flexRow = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-direction: column;
    
  @media screen and (min-width: 700px) {
    & {
      flex-direction: row;
    }
  }
`;

export const _flexColumn = css`
  display: flex; 
  flex-direction: column; 
  align-items: center;
`;
