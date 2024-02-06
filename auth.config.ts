import type { NextAuthConfig } from 'next-auth';


export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl?.pathname.startsWith('/dashboard');

      if (isOnDashboard) {
        return isLoggedIn; // Allow access if logged in, redirect otherwise
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      return true; // Allow access in other cases
    },
  },
  providers: [], // Add providers here when needed
};
