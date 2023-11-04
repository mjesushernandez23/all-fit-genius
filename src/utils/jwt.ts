import jwt from 'jsonwebtoken';

const seed = process.env.JWT_SEED;

export const singToken = (_id: number, email: string) => {
  if (!seed) throw new Error('sin palabra semilla');

  return jwt.sign({ _id, email }, seed, { expiresIn: '30d' });
};

export const isValidToken = (token: string): Promise<number> => {
  if (!seed) throw new Error('sin palabra semilla');

  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, seed, (err, payload) => {
        console.log('err', err, payload);
        if (err) return reject('JWT no es valido');
        const { _id } = payload as { _id: number };
        resolve(_id);
      });
    } catch (error) {
      console.log('catch error ');
      reject('JWT no es valido');
    }
  });
};
