import { useState} from 'react'
import { countries} from '../../data/countries'
import styles from './Form.module.css'
import { SearchType} from '../../types'


import {Slide, toast} from 'react-toastify'


type FormProps = {
                /* Como es una funcion asincrona
                    necesita el Promise    ↓↓↓↓  */
    fetchWeather: (search : SearchType) => Promise<void>
}
function Form({fetchWeather} : FormProps) {

    /* Objeto principal de busqueda */
    const [search, setSearch] = useState<SearchType>({
        city: '',
        country: ''
    })

    /* Funcion que setea los valores del formulario */
    function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
        setSearch({
            ...search,
            [e.target.name] : e.target.value
        })
    }
    /* validacion del formulario */
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        /* Valido que ningun campo este vacio */
        if(Object.values(search).includes('')) {
            /* Envia notificacion de error y */
            toast('Todos los campos son obligatorios', {type: 'error', autoClose: 2000, theme: "dark", transition: Slide, style: {fontSize: '1.5rem'}})
            return
        }
        /* Hago la consulta al API con la busqueda validada */
        fetchWeather(search)
    }
    

  return (
    <form 
        className={styles.form}
        onSubmit={handleSubmit}
    >
      

      <div className={styles.field}>
        <label htmlFor="city">Ciudad:</label>
        <input 
            type="text" 
            id='city'
            name='city'
            placeholder='Ej: Buenos Aires'
            value={search.city}
            onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="country">Pais:</label>
        <select 
            name="country" 
            id="country"
            onChange={handleChange}
        >
        <option value='' disabled>-- Seleccione un país --</option>
        {countries.map((country) => (
            <option key={country.code} value={country.code}>
                {country.name}
            </option>
        ))}
        </select>
      </div>
      <input type="submit" value="Consultar Clima" className={styles.submit}/>
    </form>
  )
}

export default Form