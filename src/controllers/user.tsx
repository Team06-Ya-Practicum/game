import axios from 'axios';

export const getUserInfo = async () => {
    try {
        await axios.get('/auth/user', {
            withCredentials: true,
        });
        return { status: true, message: '' };
    } catch (error: any) {
        return { status: false, message: error.response.data.reason };
    }
};
