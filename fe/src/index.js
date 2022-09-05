import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import { css, Global } from '@emotion/react';
import { store } from './app/store';
import { Provider as ReduxProvider } from 'react-redux'
import { theme } from './theme.js'

const GlobalStyle = ({ }) => {
    return (
        <Global
            styles={css`
                ::-webkit-scrollbar {
                    width: 12px;
                    border-radius: 10px;
                    background-color: rgb(190, 227, 248);
                }

                ::-webkit-scrollbar-thumb {
                    background-color: rgb(144, 205, 244);
                    border-radius: 10px;
                }			
                `
				}
        />
    )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ChakraProvider theme={theme}>
        <GlobalStyle />
        <ReduxProvider store={store}>
            <App />
        </ReduxProvider>
    </ChakraProvider>
);