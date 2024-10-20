import Title from '@/components/Title/Title';
import styles from '@/pages/Login/Login.module.css';
import Input from '@/components/Input/Input';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@/components/Button/Button';
import { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { userActions, register } from '@/store/user.slice';
import { RootState } from '@/store/store';


export type RegisterForm = {
    email: {
        value: string
    },
    password: {
        value: string
    },
    name: {
        value: string
    }
};


export function Register() {

    const navigate = useNavigate();

    const dispatch = useDispatch<AppDispatch>();

    const { jwt, registerError } = useSelector((s: RootState) => s.user);

    useEffect(() => {

        if (jwt) {
            navigate('/');
        }

    }, [jwt, navigate]);

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        dispatch(userActions.clearRegisterError());

        const target = e.target as typeof e.target & RegisterForm;
        const { email, password, name } = target;
        await sendLogin(email.value.toLowerCase(), password.value, name.value);
    };

    const sendLogin = async (email: string, password: string, name: string) => {
        dispatch(register({ email, password, name }));
    };

    return <>
        <div className={styles['login']}>
            <Title className={styles['login-title']}> Регистрация </Title>

            {registerError && <div className={styles['error']}>{registerError}</div>}
            <form className={styles['form']} onSubmit={submit}>

                <label htmlFor="email" className={styles['label']}>
                    Ваш email
                    <Input placeholder='Ivan' id='email' name='email' />
                </label>

                <label htmlFor="password" className={styles['label']}>
                    Ваш пароль
                    <Input placeholder='******' id='password' name='password' type='password' />
                </label>

                <label htmlFor="name" className={styles['label']}>
                    Ваше имя
                    <Input placeholder='Имя' id='name' name='name' />
                </label>

                <Button className={styles['btn']} appereance='big'>Зарегистрироваться</Button>
            </form>

            <div className={styles['form-bottom']}>
                <span>Есть аккаунт?</span>
                <Link className={styles['regLink']} to='/auth/login'>Войти</Link>
            </div>

        </div>
    </>;
}