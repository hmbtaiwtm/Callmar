import { useForm } from 'react-hook-form'
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../1-App/redux/store";
import { TextField } from "@mui/material";
import { fetchUserRegister, isAuthUser } from "../../1-App/redux/slices/user";
import { Button } from '../../6-Shared';

import './register.scss'

export const Register = () => {
  const isAuth = useAppSelector(isAuthUser)
  const dispatch = useAppDispatch()
  
    const { 
        register,
        handleSubmit,
        formState: { errors, isValid }
      } = useForm({
        defaultValues: {
          email: '',
          password: '',
          name: '',
          address: '',
          phone: '',
        }
      })

      const RegisterDataSend = async (value: any) => {
        const data = await dispatch(fetchUserRegister(value))
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
        <div className="register">
            <h2 className="register_title">Регистрация</h2>
            <p className="register_subtitle">После регистрации вы получите:</p><br/>
            <p className="register_subtitle">10 минут связи - бесплатно</p>
            <form className='register_form' onSubmit={handleSubmit(RegisterDataSend)}>
            <TextField
              label='E-Mail'
              type='email'
              error={Boolean(errors.email?.message)}
              helperText={errors.email?.message}
              {...register('email', { required: 'enter your email' })}
            />
            <TextField
              label='Name'
              type='text'
              error={Boolean(errors.name?.message)}
              helperText={errors.name?.message}
              {...register('name', { required: 'enter your name' })}
            />
            <TextField
              label='WebSiteUrl'
              type='url'
              error={Boolean(errors.address?.message)}
              helperText={errors.address?.message}
              {...register('address', { required: 'enter your webSiteUrl' })}
            />
            <TextField
              label='telNumber'
              type='tel'
              error={Boolean(errors.phone?.message)}
              helperText={errors.phone?.message}
              {...register('phone', { required: 'enter your telNumber' })}
            />
            <TextField
              label='password'
              type='password'
              error={Boolean(errors.password?.message)}
              helperText={errors.password?.message}
              {...register('password', { required: 'enter your password' })}
            />
            <Button class='btnRegister' title='Зарегистрироватся'></Button>
            </form>
        </div>
    )
}