import { tokenStore } from '../../core/storage/tokenStore';
export const authRepository = {
  saveAccessToken: (token: string) => tokenStore.saveAccessToken(token),
  signOut: () => tokenStore.clear(),
};
