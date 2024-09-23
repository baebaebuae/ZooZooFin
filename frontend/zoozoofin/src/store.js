import { create } from 'zustand';
import axios from 'axios';

export const useStore = create((set) => ({
    scripts: [],
    fetchTutorialScript: async () => {
        try {
            const res = await axios({
                method: 'get',
                url: `${import.meta.env.VITE_URL}/scripts/category`,
                params: { category: 'tutorial' },
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
                    'Access-Control-Allow-Origin': `http://localhost:5173`,
                    'Access-Control-Allow-Credentials': 'true',
                },
            });
            set({
                scripts: res.data.body.scripts,
            });
            if (res.status === 200) {
                console.log('hihi', res.data.body.scripts);
                return res.data.body.scripts;
            }
        } catch (error) {
            console.error('error: ', error);
            return error;
        }
    },
}));
