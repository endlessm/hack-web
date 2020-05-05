import {
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  CookieStorage,
} from 'amazon-cognito-identity-js';

let CookieStorageClass = CookieStorage;
let COOKIE_DOMAIN = '.hack-computer.com';

if (process.env.NODE_ENV === 'development') {
  COOKIE_DOMAIN = null;

  // Custom cookie storage to be able to store in localhost
  class CustomCookieStorage extends CookieStorage {
    constructor(params = {}) {
      const data = { ...params, domain: params.domain || '*' };
      super(data);

      this.domain = params.domain;
      this.secure = false;
    }
  }
  CookieStorageClass = CustomCookieStorage;
}

const poolData = {
  UserPoolId: 'us-east-2_vBcNLrDED',
  ClientId: '44masd118639qq1te64dmnk2hf',
};
const userPool = new CognitoUserPool(poolData);
const storage = new CookieStorageClass({ domain: COOKIE_DOMAIN });

function fakeGetUser(username = '') {
  const name = username || storage.getItem('currentUser');
  if (!name) {
    return null;
  }

  return {
    authenticated: true,
    username: name,
  };
}

async function fakeLogin(username, password) {
  // We check the password with a fixed string
  return new Promise((resolve, reject) => {
    if (password === 'ready to hack!') {
      storage.setItem('currentUser', username);
      resolve('fake token');
    } else {
      reject(new Error('Wrong password. If you are ready to hack you should know the password'));
    }
  });
}

// eslint-disable-next-line unused-imports/no-unused-vars
function getUser(username = '') {
  const name = username || storage.getItem('currentUser');
  if (!name) {
    return null;
  }

  const userData = {
    Username: name,
    Pool: userPool,
    Storage: storage,
  };
  return new CognitoUser(userData);
}

async function signup(username, password) {
  const dataEmail = {
    Name: 'email',
    Value: username,
  };
  const attributeList = [];
  const attributeEmail = new CognitoUserAttribute(dataEmail);
  attributeList.push(attributeEmail);

  return new Promise((resolve, reject) => {
    userPool.signUp(username, password, attributeList, null, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.user);
      }
    });
  });
}

// eslint-disable-next-line unused-imports/no-unused-vars
async function login(username, password) {
  const authenticationData = {
    Username: username,
    Password: password,
  };
  const authenticationDetails = new AuthenticationDetails(authenticationData);
  const cognitoUser = getUser(username);

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        const accessToken = result.getAccessToken().getJwtToken();
        storage.setItem('currentUser', username);
        resolve(accessToken);
      },

      onFailure: (err) => {
        reject(err);
      },
    });
  });
}

function logout() {
  const user = getUser();
  if (user) {
    storage.setItem('currentUser', '');
    user.signOut();
  }
}

function resetPassword(username) {
  const user = getUser(username);
  return new Promise((resolve, reject) => {
    user.forgotPassword({
      onSuccess: (result) => resolve(result),
      onFailure: (err) => reject(err),
    });
  });
}

function confirmPassword(username, verificationCode, newPassword) {
  const user = getUser(username);
  return new Promise((resolve, reject) => {
    user.confirmPassword(verificationCode, newPassword, {
      onSuccess: (result) => resolve(result),
      onFailure: (err) => reject(err),
    });
  });
}

export {
  signup,
  logout,
  resetPassword,
  confirmPassword,
  // TODO: remove fakeLogin and fakeGetUser and replace with real login and getUser
  fakeLogin as login,
  fakeGetUser as getUser,
};
