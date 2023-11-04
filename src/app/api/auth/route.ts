import bs from 'bcryptjs';
import { cookies } from 'next/headers';
import query from '@/database/mysql';
import { UserProps } from '@/models';
import { NextResponse } from 'next/server';
import { singToken, isValidToken } from '@/utils';

export async function GET(req: Request) {
  const param = new URL(req.url).searchParams.get('me');
  const token = cookies().get('token')?.value;

  if (!token || !param) return new NextResponse('Missing params', { status: 400 });
  const userId = await isValidToken(`${token}`)
    .then((id) => id)
    .catch((e) => null);
  console.log(userId, token);
  console.log(userId);
  if (!userId) return new NextResponse('Toke no valid', { status: 400 });

  try {
    const { data, status } = await query.get<ResponseUser[]>('select * from user where id = ?', [`${userId}`]);
    if (status === 204) return new NextResponse('Error inesperado', { status: 500 });
    const { id, password, ...rest } = data[0];
    const response = JSON.stringify({ user: rest });
    return new NextResponse(response);
  } catch (error) {
    new NextResponse('Error inesperado', { status: 500 });
  }
}

//TODO falta agregar el de renovar el token 

export async function POST(req: Request) {
  const { email, name, password, role } = (await req.json()) as UserProps;

  const insert = `insert into user (email,name,password,role) values (?,?,?,?)`;
  const params = [email, name, bs.hashSync(password), `${role}`];
  return await query
    .crud(insert, params)
    .then(() => new NextResponse('se creo', { status: 200 }))
    .catch(() => new NextResponse('error', { status: 500 }));
}

export async function PUT(req: Request) {
  const { email, password } = await req.json();

  const result = await query
    .get<ResponseUser[]>('select * from user where email = ?', [email])
    .then(({ data }) => (bs.compareSync(password, data[0].password) ? data[0] : null))
    .catch(() => null);
  if (!result) return new NextResponse('Error email o contraseña', { status: 400 });
  const { id, password: p, ...rest } = result;
  const token = singToken(id, result.email);

  const response = JSON.stringify({ user: rest, token });
  return new NextResponse(response, { status: 200 });
}

interface ResponseUser extends UserProps {
  id: number;
}
