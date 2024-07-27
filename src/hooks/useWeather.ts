import { SearchType } from "../types"
import axios from "axios";
import { useMemo, useState } from "react";
import {Slide, toast} from 'react-toastify'
import { string, object, number, parse, InferOutput} from "valibot";

/* 
    -string: funcion que valida que el valor sea un string
    -object: funcion que valida que el valor sea un objeto
    -number: funcion que valida que el valor sea un numero
    -InferOutput: funcion que devuelve el tipo de dato de un esquema
    -parse: funcion que valida el esquema de un objeto
*/

/* Esquema de validacion de la respuesta del API */
const WeatherSchema = object({
    name: string(),
    main: object({
        temp: number(),
        temp_min: number(),
        temp_max: number(),
    })
})

export type WeatherType = InferOutput<typeof WeatherSchema>

export default function useWeather() {
    
    const initialWeather = {
        name: "",
        main: {
            temp: 0,
            temp_min: 0,
            temp_max: 0,
        }
    }
    const [weather, setWeather] = useState<WeatherType>(initialWeather)
    /* state para el spinner */
    const [loading, setLoading] = useState(false)
    /* state de falla */
    const [founded, setfounded] = useState(true)

    const weatherEmpty = useMemo(() => weather.name === "" ,[weather.name])
    /* Funcion que hace la peticion al API */
    const fetchWeather = async (search : SearchType) => {
        /* Reinicio el valor del weather antes de consultar la api */

        /* Destructuro la busqueda por sus dos campos */
        const {city, country} = search;
        const appid = import.meta.env.VITE_API_KEY


        /* Seteo los states como verdaderos */
        setLoading(true)
        setfounded(true)

        try {
            /* Reinicio el weather en caso de una segunda peticion */
            setWeather(initialWeather)

            /* Hago la peticion al API para longitud y latitud*/
            const geoURL =`https://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&appid=${appid}`
           
            const {data} = await axios(geoURL)

            /* Asigno la latitud y longitud recibida de los datos en una variable */
            const lat = data[0].lat
            const lon = data[0].lon
            
            /* Hago la peticion al API para el clima */
            const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}`
            /*             ↓↓↓↓  Asi se renombra la desestructuracion de un objeto */
            const {data : weather} = await axios(weatherURL)

            const weatherData = parse(WeatherSchema, weather)
            if(weatherData) {
                setWeather(weatherData)
            }
        }
        catch (error) {
            /* Si no se encuentra la ciudad, envio una notificacion de error */
            toast('No se encontro la ciudad', {type: 'error', autoClose: 2000, theme: "dark", transition: Slide, style: {fontSize: '1.5rem'}})
            
            /* Si no encuentra la ciudad lo seteo como not founded */
            setfounded(false)
        }
        setLoading(false)
    }

    return {
        fetchWeather,
        weather,
        weatherEmpty,
        loading,
        setLoading,
        founded
    }
}