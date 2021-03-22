import { Permission } from '../types/Permission';

export const getAuth = (perm: Permission): string | null => {
    switch(perm) {
        case Permission.DNE:    return null;
        case Permission.NONE:   return '';
        case Permission.STD:    return ' auth.std,';
        case Permission.ADMIN:  return ' auth.admin,';
        case Permission.TB:     return ' auth.tb,'
    }
}