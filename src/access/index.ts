import type { Access } from "payload";

export const isAuthenticated: Access = ({ req: { user } }) => {
  return Boolean(user);
};

export const isAdmin: Access = ({ req: { user } }) => {
  return user?.role === "admin";
};

export const isAdminOrEditor: Access = ({ req: { user } }) => {
  return user?.role === "admin" || user?.role === "editor";
};

export const isAdminOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false;

  return (
    user.role === "admin" || {
      id: {
        equals: user.id,
      },
    }
  );
};
