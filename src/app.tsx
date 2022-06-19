import React from 'react';
import { Route, Routes, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
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
import { ForumTopic } from 'pages/ForumTopic';
import { ForumTopicAdd } from 'pages/ForumTopicAdd';
import { ChangePassword } from 'pages/ChangePassword';
import { useAppSelector } from 'store/hooks';
import { ROUTES } from 'routes';
import { EUserTheme } from 'store/slices/userSlice';
import { changeUserTheme } from 'controllers/user';
import { useAppDispatch } from './store/hooks';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

export const App = () => {
    const dispatch = useAppDispatch();
    const isAuthorized = useAppSelector(state => state.user.isAuthorized);
    const theme = useAppSelector(state => state.user.theme);
    const location = useLocation();
    return (
        <React.StrictMode>
            <Navbar
                bg={theme === EUserTheme.LIGHT ? 'light' : 'dark'}
                variant={theme === EUserTheme.LIGHT ? 'light' : 'dark'}
            >
                <Container>
                    <Navbar.Brand>CRYSTAL CATCHER</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        {isAuthorized && location.pathname === ROUTES.GAME ? (
                            <>
                                <Navbar.Text className="me-2">
                                    <a
                                        href="#"
                                        onClick={() => {
                                            if (!document.fullscreenElement) {
                                                document
                                                    .getElementById('game')
                                                    ?.requestFullscreen();
                                            }
                                        }}
                                    >
                                        Fullscreen
                                    </a>
                                </Navbar.Text>
                                <Navbar.Text className="me-2">
                                    <Link to={ROUTES.PROFILE}>Profile</Link>
                                </Navbar.Text>
                            </>
                        ) : null}
                        <Navbar.Text className="me-2">
                            <a
                                href="#"
                                className={
                                    theme !== EUserTheme.LIGHT
                                        ? 'text-muted'
                                        : undefined
                                }
                                onClick={() => {
                                    dispatch(changeUserTheme());
                                }}
                            >
                                <i className="fa-solid fa-lightbulb"></i>
                            </a>
                        </Navbar.Text>
                    </Navbar.Collapse>
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
                        element={
                            <PrivateRoute component={<ChangePassword />} />
                        }
                    />
                    <Route path={ROUTES.FORUM}>
                        <Route
                            index
                            element={<PrivateRoute component={<Forum />} />}
                        />
                        <Route
                            path=":topicId"
                            element={
                                <PrivateRoute component={<ForumTopic />} />
                            }
                        />
                        <Route
                            path="add"
                            element={
                                <PrivateRoute component={<ForumTopicAdd />} />
                            }
                        />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </React.StrictMode>
    );
};
