import { BrowserRouter } from 'react-router-dom';
import AppRouter from '@routers/AppRouter';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
