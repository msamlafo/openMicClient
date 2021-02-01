export const Cloudinary_API_URL =
  'https://api.cloudinary.com/v1_1/dcfmnomqh/image/upload';

export const CLOUD_URL = process.env.REACT_APP_CLOUD_URL || '';

export const CLOUDINARY_API_KEY =
  process.env.REACT_APP_CLOUDINARY_API_KEY || '';

export const defaultHomePage = '/poetry';
export const adminHomePage = '/issue';

export let BASE_API_URL = "";

switch (window.location.hostname) {
  // this is the local host name of your react app
  case 'localhost' || '127.0.0.1':
    // this is the local host name of your API
    BASE_API_URL = process.env.REACT_APP_API_URL || '';
    break;
  // this is the deployed react application
  case 'mds-openmicclient.herokuapp.com':
    // this is the full url of your deployed API
    BASE_API_URL = 'https://mds-openmicserver.herokuapp.com/'
    break;
}

