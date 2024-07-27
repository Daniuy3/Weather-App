import styles from './App.module.css'
import Form from './components/Form/Form'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import useWeather from './hooks/useWeather';
import WeatherDetail from './components/WeatherDetail/WeatherDetail';
import { SpinnerCircular } from 'spinners-react';

function App() {
  
  const {fetchWeather, weather, weatherEmpty, loading, founded} = useWeather()


  return (
    <>
      <h1 className={styles.title}>Buscador de Clima</h1>
      <div className={styles.container}>
        <Form fetchWeather={fetchWeather}/>
        <div className={styles.stateContainer}>
        {!weatherEmpty && <WeatherDetail weather={weather}/>}
        {loading && <SpinnerCircular size={52} thickness={100} speed={180} color="rgba(172, 110, 57, 1)" secondaryColor="rgba(0, 0, 0, 0.32)" />}
        {!founded && <p className={styles.error}>Ciudad no encontrada</p>}
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default App
