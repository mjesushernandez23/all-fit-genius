//dependencies
import { FC } from 'react';
//state
//hooks
//material
import Icon from '@mui/material/Icon';
//utils
//interfaces
import type { IconProps } from '@mui/material/Icon';
//others
interface MyIconProps extends IconProps {
  name: string;
}
const MyIcon: FC<MyIconProps> = ({ name, ...rest }) => {
  return <Icon {...rest}>{name}</Icon>;
};

export default MyIcon;
