import React from 'react'
import { Pages } from '../2-Pages'
import { Provider } from 'react-redux'
import { useAppDispatch } from './redux/store'
import { fetchGetMeBytoken } from './redux/slices/user'
import './App.css'

function App() {
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    dispatch(fetchGetMeBytoken())
  }, [])

   return (
    <>
        <Pages/>
    </>
  )
}

export default App
