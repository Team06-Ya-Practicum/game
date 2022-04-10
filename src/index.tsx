import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
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
};

axios.defaults.baseURL = 'https://ya-praktikum.tech/api/v2';

const App = () => (
    <React.StrictMode>
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>CRYSTAL CATCHER</Navbar.Brand>
            </Container>
        </Navbar>

        <div className="d-flex flex-column h-100 p-3">
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
                    path={ROUTES.FORUM}
                    element={<PrivateRoute component={<Forum />} />}
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    </React.StrictMode>
);

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root'),
);
