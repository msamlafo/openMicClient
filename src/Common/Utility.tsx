import { adminHomePage, defaultHomePage } from './Environment';
import { Poetry, Comment, authData, userAvatar } from './TypeConfig';

// save Login token
export const saveLoginToken = (token: string): void => {
  localStorage.clear();
  localStorage.setItem('token', token);
};

// clear the local storage
export const clearSession = () => {
  localStorage.clear();
};

// get login token for fetch requests
export const getLoginToken = () => localStorage.getItem('token') || '';

// check if the logged in user is an admin
export const getIsAdmin = (): boolean => {
  const adminStatus = localStorage.getItem('isAdmin') || 'false';
  return adminStatus === 'true' ? true : false;
};

// check if the current user has a token ( if yes, we assume the user is logged in)
export const hasLoginToken = (): boolean =>
  getLoginToken() !== '' ? true : false;

// check if the user is logged in as Admin
export const isLoggedInAsAdmin = (): boolean => {
  if (hasLoginToken() && getIsAdmin()) return true;
  return false;
};

// check if the current logged in user owns an item
export const isOwner = (item: Poetry | Comment): boolean =>
  item.authorId === getUserId();

// get the userId of the current logged in user
export const getUserId = () => parseInt(localStorage.getItem('userId') || '');

// create the localStorage items for authentication ( during login and signup)
export const createAuthIdentity = (userInfo: authData): void => {
  clearSession();
  localStorage.setItem('token', userInfo.sessionToken);
  localStorage.setItem('email', userInfo.user.email);
  localStorage.setItem('isAdmin', userInfo.user.isAdmin.toString());
  localStorage.setItem('userId', userInfo.user.id.toString());
};

// get the home page of the current user based on that user's admin status
export const getHomePage = (): string =>
  getIsAdmin() ? adminHomePage : defaultHomePage;

// get a placeholder image if profile image does not exist
export const getUserAvatar = (imageUrl: string): string =>
  imageUrl === '' || !imageUrl ? userAvatar : imageUrl;

// format raw date string to date time ( also string )
export const formatDateTime = (rawDate: string): string =>
  `${rawDate.slice(0, 10)} ${rawDate.slice(12, 16)}`;

  // format raw date string to date ( also string )
export const formatDate = (rawDate: string): string =>
`${rawDate.slice(0, 10)}`;