import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import { PublicRoute } from 'components/PublicRoute';
import { PrivateRoute } from 'components/PrivateRoute';
import { Root } from 'pages/Root';
import { NotFound } from 'pages/NotFound';
import { Game } from 'pages/Game';
import { SignIn } from 'pages/SignIn';
import { SignUp } from 'pages/SignUp';
import { Leaderboard } from 'pages/Leaderboard';
import { Profile } from 'pages/Profile';
import { Forum } from 'pages/Forum';
import { ChangePassword } from 'pages/ChangePassword';
import { store } from 'store/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

export const ROUTES = {
    SIGN_IN: '/signin',
    SIGN_UP: '/signup',
    ROOT: '/',
    GAME: '/game',
    LEADERBOARD: '/leaderboard',
    PROFILE: '/profile',
    FORUM: '/forum',
    CHANGE_PASSWORD: '/password',
};

axios.defaults.baseURL = 'https://ya-praktikum.tech/api/v2';

const App = () => (
    <React.StrictMode>
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>CRYSTAL CATCHER</Navbar.Brand>
            </Container>
        </Navbar>

        <div className="d-flex flex-column page-fixed-height">
            <Routes>
                <Route path={ROUTES.ROOT} element={<Root />} />
                <Route
                    path={ROUTES.SIGN_IN}
                    element={<PublicRoute component={<SignIn />} />}
                />
                <Route
                    path={ROUTES.SIGN_UP}
                    element={<PublicRoute component={<SignUp />} />}
                />
                <Route
                    path={ROUTES.GAME}
                    element={<PrivateRoute component={<Game />} />}
                />
                <Route
                    path={ROUTES.LEADERBOARD}
                    element={<PrivateRoute component={<Leaderboard />} />}
                />
                <Route
                    path={ROUTES.PROFILE}
                    element={<PrivateRoute component={<Profile />} />}
                />
                <Route
                    path={ROUTES.CHANGE_PASSWORD}
                    element={<PrivateRoute component={<ChangePassword />} />}
                />
                <Route
                    path={ROUTES.FORUM}
                    element={<PrivateRoute component={<Forum />} />}
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    </React.StrictMode>
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
);
