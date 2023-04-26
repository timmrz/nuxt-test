import { defineStore } from "pinia";
import axios from "axios";
import { ICity, IWeatherData } from "~/types/weatherTypes";
import ShortUniqueId from "short-unique-id";

export const uid = new ShortUniqueId();

export const useWeatherStore = defineStore("weather", () => {
	const cities = ref<ICity[]>([
		{
			name: "Brno",
			latitude: "49.20",
			longitude: "16.61",
		},
		{
			name: "Prague",
			latitude: "50.09",
			longitude: "14.42",
		},
		{
			name: "Ostrava",
			latitude: "49.83",
			longitude: "18.28",
		},
	]);

	const selectedCity = ref<ICity | {}>({});

	const weatherData = ref<IWeatherData | []>([]);

	// Tato funkce byla vytvořena v chatu gpt, byl jsem příliš líný na to, abych ji napsal sám.

	function getDateAndDayOfWeek(dateString: string): { date: string; dayOfWeek: string } {
		const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		const date = new Date(dateString);
		const dayOfWeek = daysOfWeek[date.getDay()];
		const formattedDate = date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
		return { date: formattedDate, dayOfWeek };
	}

	const fetchData = async () => {
		if ("name" in selectedCity.value) {
			try {
				const { data } = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.value.latitude}&longitude=${selectedCity.value.longitude}&daily=rain_sum&timezone=Europe%2FBerlin`);
				weatherData.value = { city: selectedCity.value.name, ...data };
			} catch (error) {
				console.log(error);
			}
		}
	};

	const getDailyWeatherData = (weatherData: IWeatherData | []): { time: string; rain_sum: number; id: string }[] => {
		const dailyWeatherData: { time: string; rain_sum: number; id: string }[] = [];

		if (typeof weatherData === "object" && weatherData !== null && !Array.isArray(weatherData)) {
			weatherData.daily.time.forEach((time, index) => {
				const rainSum = weatherData.daily.rain_sum[index];
				dailyWeatherData.push({ time, rain_sum: rainSum, id: uid() });
			});
		}

		dailyWeatherData.shift();
		return dailyWeatherData;
	};

	const changeSelectedCity = (city: ICity) => {
		selectedCity.value = city;
	};

	return { fetchData, weatherData, cities, changeSelectedCity, selectedCity, getDateAndDayOfWeek, getDailyWeatherData };
});
