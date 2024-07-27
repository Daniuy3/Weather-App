

export const formatTemperature = (temp: number) => {
    const newTemp = parseInt((temp - 273.15).toString());
    return `${newTemp}°C`;
}