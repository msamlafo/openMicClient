export type authData = {
  sessionToken: string;
  user: { id: number; email: string; isAdmin: boolean };
};

export type poetryFormField =
  | 'title'
  | 'category'
  | 'writeUp'
  | 'poemWriterComment';

export type poetryCategory =
  | 'Choose Poetry Type'
  | 'Blank verse'
  | 'Rhymed poetry'
  | 'Free verse'
  | 'Epics'
  | 'Narrative poetry'
  | 'Haiku'
  | 'Pastoral poetry'
  | 'Sonnet'
  | 'Elegies'
  | 'Ode'
  | 'Limerick'
  | 'Lyric poetry'
  | 'Ballad'
  | 'Soliloquy'
  | 'Villanelle';

export type Poetry = {
  id?: number;
  title: string;
  category: string;
  writeUp: string;
  poemWriterComment: string;
  author?: string;
  authorPic?: string;
  authorId?: number;
};

export const PoetryDefaultObject = {
  id: 0,
  title: '',
  category: '',
  writeUp: '',
  poemWriterComment: '',
  author: '',
  authorId: 0,
};

export type issueType = {
  id?: number;
  issue: string;
  poetryId: number;
  authorId: number;
  author?: string;
  authorPic?: string;
  poetry?: Poetry;
  createdAt?: string;
};
export const IssueDefaultObject = {
  id: 0,
  issue: '',
  poetryId: 0,
  authorId: 0,
  author: '',
  authorPic: '',
  poetry: PoetryDefaultObject,
  createAt: '',
};

export type issueFormField = 'issue';

export type profileField =
  | 'firstName'
  | 'lastName'
  | 'picUrl'
  | 'email'
  | 'about'
  | 'hobbies'
  | 'poemWriterSince'
  | 'funFact'
  | 'dreamJob'
  | 'resumeUpload';

export type profileFormFieldName =
  | 'firstName'
  | 'lastName'
  | 'picUrl'
  | 'email'
  | 'about'
  | 'hobbies'
  | 'poemWriterSince'
  | 'funFact'
  | 'dreamJob'
  | 'resumeUpload';

export type ProfileProps = {
  firstName: string;
  lastName: string;
  picUrl: string;
  email?: string;
  about: string;
  hobbies: string;
  poemWriterSince: string;
  funFact: string;
  dreamJob: string;
  resumeUpload: string;
};

export const ProfilePropsDefault = {
  firstName: '',
  lastName: '',
  picUrl: '',
  email: '',
  about: '',
  hobbies: '',
  poemWriterSince: '0',
  funFact: '',
  dreamJob: '',
  resumeUpload: '',
};

export type BrowserRouterPropsType = {
  match: any;
  location: any;
  history: any;
};

export type CommentFormField = 'comment';

export type Comment = {
  id?: number;
  comment: string;
  author?: string;
  authorPic?: string;
  createdAt: string;
  poetryId: number;
  authorId: number;
};

export const CommentDefaultObject = {
  id: 0,
  comment: '',
  poetryId: 0,
  createdAt: '',
  author: '',
  authorPic: '',
  authorId: 0,
};

export const userAvatar =
  'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2089&q=80';
