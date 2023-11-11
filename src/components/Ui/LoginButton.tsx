//dependencies
import { signIn, signOut, useSession } from 'next-auth/react';
import { FC } from 'react';
//state
//hooks
//material
//utils
//interfaces
//others
interface LoginButtonProps {}
const LoginButton: FC<LoginButtonProps> = (props) => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
};

export default LoginButton;
