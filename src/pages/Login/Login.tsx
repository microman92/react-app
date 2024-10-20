import Title from '@/components/Title/Title';
import styles from './Login.module.css';
import Input from '@/components/Input/Input';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@/components/Button/Button';
import { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { login, userActions } from '@/store/user.slice';
import { RootState } from '@/store/store';

export type LoginForm = {
    email: {
        value: string
    },
    password: {
        value: string
    }
};


export function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const { jwt, loginState } = useSelector((s: RootState) => s.user);


    useEffect(() => {

        if (jwt) {
            navigate('/');
        }

    }, [jwt, navigate]);

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        dispatch(userActions.clearError());

        const target = e.target as typeof e.target & LoginForm;
        const { email, password } = target;
        await sendLogin(email.value.toLowerCase(), password.value);
    };

    const sendLogin = async (email: string, password: string) => {
        dispatch(login({ email, password }));
    };

    return <>
        <div className={styles['login']}>
            <Title className={styles['login-title']}> Вход </Title>

            {loginState && <div className={styles['error']}>{loginState}</div>}
            <form className={styles['form']} onSubmit={submit}>

                <label htmlFor="email" className={styles['label']}>
                    Ваш email
                    <Input placeholder='Ivan' id='email' name='email' />
                </label>

                <label htmlFor="password" className={styles['label']}>
                    Ваш пароль
                    <Input placeholder='******' id='password' name='password' type='password' />
                </label>
                <Button className={styles['btn']} appereance='big'>Вход</Button>
            </form>

            <div className={styles['form-bottom']}>
                <span>Нет аккаунта?</span>
                <Link className={styles['regLink']} to='/auth/register'>Зарегистрироватья</Link>
            </div>

        </div>
    </>;
}