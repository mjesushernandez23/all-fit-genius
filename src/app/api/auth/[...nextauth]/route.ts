import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import query from '@/database/mysql';
import bs from 'bcryptjs';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'email', placeholder: 'test@test.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;
        const user = await query
          .get<any[]>('select * from user where email = ?', [credentials.email])
          .then(({ data }) => (bs.compareSync(credentials.password, data[0].password) ? data[0] : null))
          .catch(() => null);

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: '/inicio',
  },
});

export { handler as GET, handler as POST };

// import bs from 'bcryptjs';
// import query from '@/database/mysql';
// import { UserProps } from '@/models';
// import type { NextApiRequest, NextApiResponse } from 'next';
// import { singToken, isValidToken } from '@/utils';

// // export async function GET(req: Request) {
// //   const param = new URL(req.url).searchParams.get('me');
// //   const token = cookies().get('token')?.value;

// //   if (!token || !param) return new NextResponse('Missing params', { status: 400 });
// //   const userId = await isValidToken(`${token}`)
// //     .then((id) => id)
// //     .catch((e) => null);
// //   console.log(userId, token);
// //   console.log(userId);
// //   if (!userId) return new NextResponse('Toke no valid', { status: 400 });

// //   try {
// //     const { data, status } = await query.get<ResponseUser[]>('select * from user where id = ?', [`${userId}`]);
// //     if (status === 204) return new NextResponse('Error inesperado', { status: 500 });
// //     const { id, password, ...rest } = data[0];
// //     const response = JSON.stringify({ user: rest });
// //     return new NextResponse(response);
// //   } catch (error) {
// //     new NextResponse('Error inesperado', { status: 500 });
// //   }
// // }

// //TODO falta agregar el de renovar el token

// // export async function POST(req: Request) {
// //   const { email, name, password, role } = (await req.json()) as UserProps;

// //   const insert = `insert into user (email,name,password,role) values (?,?,?,?)`;
// //   const params = [email, name, bs.hashSync(password), `${role}`];
// //   return await query
// //     .crud(insert, params)
// //     .then(() => new NextResponse('se creo', { status: 200 }))
// //     .catch(() => new NextResponse('error', { status: 500 }));
// // }

// export async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { method } = req;
//   if (method === 'PUT') return loginUser(req, res);
// }

// const loginUser = async (req: NextApiRequest, res: NextApiResponse) => {
//   const { email, password } = req.body;

//   const result = await query
//     .get<ResponseUser[]>('select * from user where email = ?', [email])
//     .then(({ data }) => (bs.compareSync(password, data[0].password) ? data[0] : null))
//     .catch(() => null);
//   if (!result) return res.status(400).json('Error email o contraseña');
//   const { id, password: p, role, ...rest } = result;
//   const token = singToken(id, result.email, role);

//   // cookies().set({
//   //   name: 'token',
//   //   value: token,
//   //   httpOnly: true,
//   //   maxAge: 60 * 6 * 24,
//   // });
//   const response = JSON.stringify({ user: { ...rest, role }, token });
//   return res.status(200).json(response);
// };

// interface ResponseUser extends UserProps {
//   id: number;
// }


