
import Styles from './Button.module.css';
import { ButtonProps } from './Button.props';
import cn from 'classnames';



function Button({ children, className, appereance = 'small', ...props }: ButtonProps) {

    return (
        <button className={
            cn(className,
                Styles['button'],
                Styles['accent'],
                {
                    [Styles['small']]: appereance === 'small',
                    [Styles['big']]: appereance === 'big'
                })
        } {...props} >{children}</button>

    );
}




export default Button;