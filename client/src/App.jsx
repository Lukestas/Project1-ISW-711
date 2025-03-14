import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <div className='container'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<h1>Home Page</h1>} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/about' element={<h1>About Page</h1>} />
          <Route path='/profile' element={<h1>Profile Page</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App