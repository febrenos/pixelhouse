import styled from "styled-components";

export const Card = styled.div`
  display:flex;
  box-shadow: var(--box-shadow);
  padding:12px 20px;
  flex-direction:column;
  gap:5px;
  border-radius:20px;
`;

export const SpaceBetween = styled.div`
display:flex;
justify-content:space-between;
`

export const TextInput = styled.input`
width:100%;
border: 2px solid #00000000;
border-radius: 5px;
font-size: 16px;
color: var(--txt-primary);
background: #8b8b8b31;
`

export const CheckBox = styled.input.attrs({ type: 'checkbox' })`
  cursor:pointer;
`;

