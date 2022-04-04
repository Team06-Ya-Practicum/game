import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
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

const App = () => (
    <React.StrictMode>
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>CRYSTAL CATCHER</Navbar.Brand>
            </Container>
        </Navbar>

        <div className="d-flex flex-column h-100">
            <Routes>
                <Route path="/" element={<Root />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/game" element={<Game />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/forum" element={<Forum />} />
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
