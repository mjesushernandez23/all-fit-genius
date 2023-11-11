import type { LinkNavProps } from '@models';

export const navLinksPublic: LinkNavProps[] = [
  { icon: 'view_cozy', route: '/inicio', title: 'Inicio' },
  { icon: '', route: '/auth/login', title: 'Iniciar sesión' },
];

export const redirectTo: Record<number, string> = {
  2: '/couch',
};

const _couchOptions = [{ icon: 'view_cozy', route: '/couch', title: 'Entrenador' }] satisfies LinkNavProps[];

export const couch = _couchOptions;
