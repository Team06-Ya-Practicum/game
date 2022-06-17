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

export const PRIVATE_ROUTES = [
    ROUTES.GAME,
    ROUTES.LEADERBOARD,
    ROUTES.PROFILE,
    ROUTES.CHANGE_PASSWORD,
];
