import { useForm } from 'react-hook-form'
import './scss/RegisterPage.scss'
function RegisterPage() {

  const { register, handleSubmit } = useForm();
  return (

      <div className='form-container'>
        <form className="form-register" onSubmit={handleSubmit(values => {
          console.log(values)
        })}>
          <h1 className='title-register'>Registro de padre</h1>
          <div className='input-container'>
            <label htmlFor="">Nombre:</label>
            <input autoComplete='off' className="inputs" type="tex" {...register("firstname", { required: true })} placeholder='Nombre' />
          </div>
          <div className='input-container'>
            <label htmlFor="">Apellidos:</label>
            <input autoComplete='off' className="inputs" type="tex" {...register("lastname", { required: true })} placeholder='Apellido' />
          </div>
          <div className='input-container'>
            <label htmlFor="">Email:</label>
            <input autoComplete='off' className="inputs" type="email" {...register("email", { required: true })} placeholder='Email' />
          </div>
          <div className='input-container'>
            <label htmlFor="">Contraseña:</label>
            <input autoComplete='off' className="inputs" type="password" {...register("password", { required: true })} placeholder='Contraseña' />
          </div>
          <div className='input-container'>
            <label htmlFor="">Telefono:</label>
            <input autoComplete='off' className="inputs" type="number" name="phone" placeholder='Telefono' />
          </div>
          <div className='input-container'>
            <label htmlFor="">Pin:</label>
            <input autoComplete='off' className="inputs" type="number" {...register("pin", { required: true, minLength: 6, maxLength: 6 })} placeholder='Pin' />
          </div>
          <div className='input-container'>
            <label htmlFor="">Pais:</label>
            <input autoComplete='off' className="inputs" type="tex" {...register("country")} placeholder='Pais' />
          </div>
          <div className='input-container'>
            <label htmlFor="">Fecha de nacimiento:</label>
            <input autoComplete='off' className="inputs" type="date" {...register("birthDate", { required: true })} placeholder='Fecha de nacimiento' />
          </div>
          <div className='button-container'>
            <button className="buttons" type='submit'>Registrar:</button>
          </div>
        </form>
      </div>
  )
}

export default RegisterPage