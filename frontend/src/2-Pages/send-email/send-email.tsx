import React from 'react'
import { useAppDispatch, useAppSelector } from '../../1-App/redux/store'
import { fetchSendEmail } from '../../1-App/redux/slices/email'
import { useForm } from 'react-hook-form'
import { TextField } from '@mui/material'
import { Button } from '../../6-Shared'
import './send-email.scss'

export const SendEmail = () => {
  const [ fromSent, setFormSent ] = React.useState(false)
    const { status } = useAppSelector(state => state.email) 
    const dispatch = useAppDispatch()

    const {
      register,
      handleSubmit,
      formState: { errors, isValid }
    } = useForm({
      defaultValues: {
        email: ''
      }
    })

    const submitEmail =  async (value: any) => {
      dispatch(fetchSendEmail(value))
      setFormSent(true)
    }

  return (
    <div className='email'>
        <div className="email__title">
            Введите вашу почту на которую мы  отправим вам <br /> ссылку для сброса вашего пароля
        </div>
        <form className='email__form' onSubmit={handleSubmit(submitEmail)}>
            <TextField
            className='email__form_input'
            label="E-mail"
            type= "email"
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            {...register('email', {required: 'введите вашу почту'})}
            />       
            {fromSent && <div className="email__loading">{status}</div>}  
            <Button class='btnEmail' title='отправить'></Button> 
        </form>
    </div>
  )
}
