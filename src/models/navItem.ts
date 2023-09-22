import { ReactNode } from 'react';

export default interface NavItem {
    name: string;
    path: string;
    icon: ReactNode;
}
