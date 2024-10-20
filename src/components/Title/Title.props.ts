import { HTMLAttributes, ReactNode } from 'react';

export interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
    children: ReactNode,
}