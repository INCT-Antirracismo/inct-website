import { User } from '@/payload-types';
import { Access, AccessArgs } from 'payload';

export const anyone: Access = () => true;

export const isPublic: Access = () => {
  return {
    _status: {
      equals: 'published'
    }
  };
};

type isAuthenticated = (args: AccessArgs<User>) => boolean;

export const authenticated: isAuthenticated = ({ req: { user } }) => {
  return Boolean(user);
};

export const authenticatedOrPublished: Access = ({ req: { user } }) => {
  return true;
  if (user) {
    return true;
  }

  return {
    _status: {
      equals: 'published'
    }
  };
};

export const isAdmin: Access = ({ req: { user } }) => {
  if (user?.role === 'admin') {
    return true;
  }
  return false;
};
export const isEditor: Access = ({ req: { user } }) => {
  if (user?.role === 'admin' || user?.role === 'editor') {
    return true;
  }
  return false;
};
