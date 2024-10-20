
import { TitleProps } from './Title.props';
import styles from './Title.module.css';
import cn from 'classnames';


function Title({ children, className, ...props }: TitleProps) {

    return (
        <h1 className={cn(className, styles['title'])} {...props}>{children}</h1>
    );
};

export default Title;
