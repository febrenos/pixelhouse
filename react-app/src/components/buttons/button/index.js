import React, {useState} from 'react'
import * as Styles from './style'

export function Button({ background, text, borderColor, size, solid = false, onClick}) {
    const [isLoading, setIsLoading] = useState(false);
  
    const handleClick = async () => {
      setIsLoading(true);
      try {
        await onClick(); // Execute a ação do botão, por exemplo, uma requisição assíncrona
      } finally {
        // Após a ação do botão (mesmo se houver um erro), pare o carregamento
        setIsLoading(false);
      }
    };
  
    return (
        <Styles.Button
          solid={solid}
          background={background}
          borderColor={borderColor}
          size={size}
          onClick={isLoading ? null : handleClick}
          disabled={isLoading}
        >
          {isLoading ? 
          <>
            <Styles.ContentIcon>
              <Styles.LoadingIcon/>
            </Styles.ContentIcon>
          </>
         : text}
        </Styles.Button>
    );
  }