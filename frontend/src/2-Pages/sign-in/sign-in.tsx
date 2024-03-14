import { useAppDispatch, useAppSelector } from '../../1-App/redux/store'
import { fetchUserLogin } from '../../1-App/redux/slices/user'
import { isAuthUser } from '../../1-App/redux/slices/user'
import { Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { TextField } from '@mui/material'
import { Button } from '../../6-Shared'

import './sign-in.scss'

export const SignIn = () => {
  const isAuth = useAppSelector(isAuthUser)
  const dispatch = useAppDispatch()

  const { 
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const loginDataSend = async (value: any) => {
    const data = await dispatch(fetchUserLogin(value))
    if(!data.payload) {
      window.alert('Что то пошло не так попробуйте снова')
    } else {
      window.localStorage.setItem('token', data.payload.token)
    }
  }

  if(isAuth) {
    return <Navigate to='/'/>  
  }

  return (
    <div className='login'>
        <div className="login__title">Вход в личный кабинет</div>
        <form className='form' onSubmit={handleSubmit(loginDataSend)}>
          <TextField
          label='E-Mail'
          type='email'
          error={Boolean(errors.email ?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'enter your email' })}
          />
          <TextField
          label='Password'
          type='password'
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'enter your password' })}
          />
          <div className='form__respass'><a href='/sendEmail'>Забыл пароль</a></div>
          <div className="form__navigation">
            <Button class ='btnLogin' title='Войти'></Button>
            <Button class ='btnRegister' title='Зарегистрироватся'></Button>
          </div>
        </form>
    </div>
  )
}
