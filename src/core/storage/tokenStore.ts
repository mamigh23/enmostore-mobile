import * as Keychain from 'react-native-keychain';

const SERVICE = 'com.enmostore.mobile.auth';

export const tokenStore = {
  async saveAccessToken(token: string) {
    await Keychain.setGenericPassword('access_token', token, {
      service: SERVICE,
    });
  },
  async getAccessToken() {
    const credentials = await Keychain.getGenericPassword({ service: SERVICE });
    return credentials ? credentials.password : null;
  },
  async clear() {
    await Keychain.resetGenericPassword({ service: SERVICE });
  },
};
