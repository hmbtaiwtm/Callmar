import { Navigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector} from '../../1-App/redux/store'
import { fetchRessPass } from '../../1-App/redux/slices/email'
import { useForm } from 'react-hook-form'
import { TextField } from '@mui/material'
import { Button } from '../../6-Shared'
import './ress-pass.scss'

export const RessetPass = () => {
  const { ressPass } = useAppSelector(state => state.email)
  const { id } = useParams()
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    defaultValues: {
      newPassword: '',
      repeatPassword: ''
    }
  })

  const submitRessPass =  async (value: any) => {
    const { newPassword, repeatPassword } = value;

      if (newPassword !== repeatPassword) {
        setError('repeatPassword', { type: 'manual', message: 'пароль не совпадает' });
      }  else {
          setError('repeatPassword', { type: 'manual', message: '' });
          dispatch(fetchRessPass({ id: id, password: newPassword }))
      }
  }

  if(ressPass) {
    return <Navigate to='/login'/>
  }

  return (
    <div className='ressPass'>
        <div className="ressPass__title">
           Придумайт новый надежный и не забываемый пароль :)
        </div>
        <form className='ressPass__form' onSubmit={handleSubmit(submitRessPass)}>
            <div className="ressPass__form_wrapper">
              <TextField
              className='ressPass__form_newPass'
              label="New Password"
              type= "password"
              error={Boolean(errors.newPassword?.message)}
              helperText={errors.newPassword?.message}
              {...register('newPassword', {required: 'введите пароль'})}
              /> 
              <TextField
              className='ressPass__form_repeatPass'
              label="Repeat Password"
              type= "password"
              error={Boolean(errors.repeatPassword?.message)}
              helperText={errors.repeatPassword?.message}
              {...register('repeatPassword', {required: 'повторите пароль'})}
              />            
            </div>
            <Button class='btnRessPass' title='изменить'></Button> 
        </form>
    </div>
  )
}
