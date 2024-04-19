import styled, { keyframes } from 'styled-components';
import { Loading, Edit, Delete } from './assets/icons/index'

export const PageContent = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
gap:50px;
padding: 0 20vw 0 20vw;
@media(width < 768px){
    padding: 0 25px 0 25px;
}
`;

export const Img = styled.img`
  @media(width < 769px){
    width:100%;
    max-width: ${(props) => (props.maxWidth ? `${props.maxWidth}` : '100%')};
  }
  width: ${(props) => (props.width ? `${props.width}` : '100%')};
  height: ${(props) => (props.height ? `${props.height}` : 'auto')};
  border-radius: ${(props) => (props.borderRadius ? `${props.borderRadius}` : '0')};
  margin: auto;
`;

export const Flex = styled.div`
display: flex;
gap: 5px;
align-items: baseline;
`;

export const ContentPage = styled.div`
display:flex;
flex-direction:column;
gap:250px;
justify-content:center;
align-items:center;
padding: 0 20vw 0 20vw;
@media(width < 768px){
    padding: 0 25px 0 25px;
}
`;

export const Hr = styled.div`
opacity: .3;
background: ${(props) => (props.bg ? `${props.width}` : 'var(--text-color)')};
border-radius:20px;
height: ${(props) => (props.height ? `${props.height}` : '2px')};
`

export const ContentIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${props => (props.requestStatus === 'request' ? 'var(--txt-primary)' : 'var(--primary-color)')};
  font-size: 20px;
  padding: 10px;
  height: 30px;
`;

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const LoadingIcon = styled(Loading)`
  cursor: pointer;
  font-size: 30px;
  padding: 10px;
  color: var(--primary-color);
  animation: ${spinAnimation} 2s linear infinite; // Aplica a animação "spin" ao ícone
`;

export const BaseIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  fill: var(--text-header-color);
  width: 25px;
  // filter: drop-shadow(0 0 10px rgba(0, 0, 0, 1));
  cursor: pointer;
`;

export const EditIcon = styled(BaseIcon).attrs({
  as: Edit,
})``;

export const DeleteIcon = styled(BaseIcon).attrs({
  as: Delete,
})``;

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