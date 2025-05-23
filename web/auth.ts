import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import type { Provider } from 'next-auth/providers';


const providers: Provider[] = [Credentials({
  credentials: {
    email: { label: 'Email Address', type: 'email' },
    password: { label: 'Password', type: 'password' },
  },
  async authorize(c) {
    console.log(`${process.env.EXPRESS_API_URL}/users/login`)
    const user = await fetch(`${process.env.EXPRESS_API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(c),
    })
      .then((res) => res.json())
      .then((data) => data.data)
      .catch((error) => {
        console.error("Error getting user:", error)
        return null
      })

    return user;
  },
}),
];




export const providerMap = providers.map((provider) => {
  if (typeof provider === 'function') {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  }
  return { id: provider.id, name: provider.name };
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,



  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    authorized({ auth: session, request: { nextUrl } }) {
      const isLoggedIn = !!session?.user;
      const isPublicPage = nextUrl.pathname.startsWith('/public');

      if (isPublicPage || isLoggedIn) {
        return true;
      }

      return false; // Redirect unauthenticated users to login page
    },
  },
});
