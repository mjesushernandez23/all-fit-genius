import bs from 'bcryptjs';
import query from '@/database/mysql';
import { UserProps } from '@/models';
import { NextResponse } from 'next/server';

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

  const response = await query
    .get<UserProps[]>('select * from user where email = ?', [email])
    .then(({ data }) => {
      const isValid = bs.compareSync(password, data[0].password);

      console.log(data, isValid);
    })
    .catch(() => {
      console.log('error');
    });
  return new NextResponse('s');
}
