<template>
    <div class="flex flex-col relative">
        <div
             class="border-2 inline-block cursor-pointer rounded-xl border-gray-600 bg-gray-100 duration-300 mb-6 absolute w-full">
            <div class=" flex  justify-between items-center  py-3 px-5   text-2xl"
                 @click=" changeShowCities "> {{ checkSelectedCity() }}
                <IconsIcBaselineArrowDropDown v-if=" !showCities " />
                <IconsIcBaselineArrowDropDownCircle v-else />
            </div>
            <div v-if=" showCities " class="py-4 px-5">
                <div @click=" clickCity( city ) "
                     class="text-2xl flex justify-center items-center border-b-2 border-gray-400 py-3 hover:border-gray-600 duration-300"
                     v-for="city in cities" :key=" city.name ">{{ city.name }}</div>
            </div>
        </div>
        <button
                @click=" fetchData "
                class="bg-green-200 hover:bg-green-300 duration-300 px-5 py-3 text-3xl rounded-xl border-2 border-gray-400 mt-24">Show
            Rain Sum</button>
    </div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue'
import { useWeatherStore } from '~/stores';
import { ICity } from '~/types/weatherTypes';


export default defineComponent( {
    setup() {

        const store = useWeatherStore()

        const showCities = ref( false )

        const { cities, selectedCity } = storeToRefs( store )

        const { changeSelectedCity, fetchData } = store

        function changeShowCities() {
            showCities.value = !showCities.value
        }

        function clickCity( city: ICity ) {
            changeSelectedCity( city )
            changeShowCities()
        }

        function checkSelectedCity() {
            if ( 'name' in selectedCity.value ) {
                return selectedCity.value.name
            }

            return 'Select City'
        }

        return {
            cities,
            showCities,
            changeShowCities,
            clickCity,
            checkSelectedCity,
            fetchData,
        }
    }
} )
</script>

<style scoped></style>


