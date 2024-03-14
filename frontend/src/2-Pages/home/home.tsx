import { useAppDispatch, useAppSelector } from '../../1-App/redux/store'
import { Link } from 'react-router-dom'
import { logOut } from '../../1-App/redux/slices/user'
import './home.scss'

export const Home = () => {
  const { data } = useAppSelector(state => state.login)
  const dispatch = useAppDispatch()

  const singOut = () => {
    dispatch(logOut())
    window.localStorage.removeItem('token')  
  }

  return (
    <div>
      hello 
        {data ? 
         <button  onClick={() => singOut()} className='btnLogout'>Выйти</button>
         : <Link to='/login'><button>Войти</button></Link>
        }
    </div>
  )
}
