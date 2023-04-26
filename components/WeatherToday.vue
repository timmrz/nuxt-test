<template>
    <div v-if=" 'daily' in weatherData "
         class="bg-gray-700 shadow-lg my-5 rounded-2xl p-6 lg:p-20 flex items-center flex-col sm:flex-row gap-7 w-full justify-between flex-wrap">
        <h2 class="text-gray-100 text-6xl md:text-7xl">{{ weatherData.city }}</h2>
        <div
             class="text-2xl lg:text-3xl text-gray-100 flex flex-col items-center sm:gap-3 lg:gap-5">
            <p> {{ getDateAndDayOfWeek( weatherData.daily.time[0] ).date }} </p>
            <p> {{ getDateAndDayOfWeek( weatherData.daily.time[0] ).dayOfWeek }} </p>
        </div>
        <div class="flex flex-col items-center text-gray-100">
            <p class="text-2xl lg:text-3xl"> Total rainfall: </p>
            <p class="text-4xl lg:text-6xl font-semibold">{{ weatherData.daily.rain_sum[0] }}{{
                weatherData.daily_units.rain_sum }}</p>
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

        const { selectedCity, weatherData } = storeToRefs( store )
        const { getDateAndDayOfWeek } = store



        return {
            weatherData,
            selectedCity,
            getDateAndDayOfWeek
        }
    }
} )
</script>

<style scoped></style>