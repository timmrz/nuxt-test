<template>
    <div v-if=" 'daily' in weatherData " v-for="data in getDailyWeatherData( weatherData )"
         :key=" data.id "
         class="bg-gray-700 shadow-lg my-5 rounded-2xl flex flex-col sm:flex-row items-center w-full justify-around py-4">
        <div
             class="text-2xl lg:text-3xl text-gray-100 flex  items-center flex-1 flex justify-center">
            <p class="py-3"> {{ getDateAndDayOfWeek( data.time ).date }}, {{ getDateAndDayOfWeek(
                data.time ).dayOfWeek }} </p>
        </div>
        <div class="flex items-center text-gray-100 flex-1 justify-center">
            <p class="text-2xl lg:text-3xl"> Total rainfall: {{ data.rain_sum }}mm</p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useWeatherStore } from '../stores/index'

import { storeToRefs } from 'pinia'

export default defineComponent( {
    setup() {
        const store = useWeatherStore()

        const { weatherData } = storeToRefs( store )
        const { getDateAndDayOfWeek, getDailyWeatherData } = store

        return {
            weatherData,
            getDateAndDayOfWeek,
            getDailyWeatherData
        }
    }
} )
</script>

<style scoped></style>