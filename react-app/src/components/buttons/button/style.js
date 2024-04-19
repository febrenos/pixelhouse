import styled, { keyframes } from 'styled-components'
import { ProgressActivity } from '../../../assets/icons/index';

export const Button = styled.button`
    color: var(--text-button);
    background-color: var(--button-color);
    padding: ${({ size }) => {
        switch (size) {
            case 'sm':
                return '6px 10px';
            case 'md':
                return '10px 16px';
            case 'lg':
                return '12px 20px';
            default:
                return '10px 16px'; // Valor padrão
        }
    }};
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 15px;
    font-weight: 600;
    &:hover {
        opacity: .8;
    }
`;

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const LoadingIcon = styled(ProgressActivity)`
    cursor: pointer;
    font-size: 16px;
    fill: var(--text-button);
    animation: ${spinAnimation} 2s linear infinite;
`;

export const ContentIcon = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
`;