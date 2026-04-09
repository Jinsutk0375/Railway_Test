import { io } from 'socket.io-client';

const URL = import.meta.env.VITE_BACKEND_URL || 'https://railway-test-96ax.onrender.com';
export const socket = io(URL, {
  autoConnect: true
});
