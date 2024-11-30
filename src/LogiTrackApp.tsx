import { LoginRouter } from './router/LoginRouter.tsx';
import { BrowserRouter } from 'react-router-dom';

function LogiTrackApp() {
    return (
        <BrowserRouter>

                <LoginRouter />

        </BrowserRouter>
    );
}

export default LogiTrackApp;
