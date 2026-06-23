import GithubProvider from "next-auth/providers/github"

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: "Ov23liPl6PkDz7oX3UL5",
      clientSecret: "f6b6c5c1bb8b93d854abc6dc71146f56c2fc83d0",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "releaseblog-dev-secret-v4",
  callbacks: {
    async jwt({ token, account }) {
      if (account) { token.accessToken = account.access_token }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      return session
    },
  },
  pages: { signIn: "/login" },
}
