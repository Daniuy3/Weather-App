import { formatTemperature } from '../../helpers'
import { WeatherType } from '../../hooks/useWeather'
import styles from './WeatherDetail.module.css'

type WeatherDetailProps = {
    weather: WeatherType
    }
function WeatherDetail({weather} : WeatherDetailProps) {
  return (
    <div className={styles.container}>
        <h2>Clima de: {weather.name}</h2>
        <p className={styles.current}>{formatTemperature(weather.main.temp)}</p>
        <div className={styles.temperatures}>
            <p>Min: <span>{formatTemperature(weather.main.temp_min)}</span></p>
            <p>Max: <span>{formatTemperature(weather.main.temp_max)}</span></p>
        </div>
    </div>
  )
}

export default WeatherDetail