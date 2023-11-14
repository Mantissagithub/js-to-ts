import { atom } from 'recoil';

export interface AuthState {
    token: string;
    username: string;
}

export const authState = atom<AuthState>({
  key: 'authState',
  default: { token: '', username: '' },
});