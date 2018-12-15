<template>
    <div class="location-wrapper">
        <Select v-model="currentProvince" style="width:100px" placeholder="选择省份" @on-change="provinceChoosed">
            <Option v-for="item in provinceList" :value="item.code" :key="item.code">{{ item.name }}</Option>
        </Select>
        <Select v-model="currentCity" style="width:100px" placeholder="选择城市" @on-change="cityChoosed">
            <Option v-for="item in cityList" :value="item.code" :key="item.code">{{ item.name }}</Option>
        </Select>
    </div>
</template>
<script>
import list from 'china-location/dist/location.json'
import ChinaLocation from 'china-location'

export default {
    data() {
        return {
            currentProvince: '',
            currentCity: '',
            provinceList: [],
            cityList: [],
            location: new ChinaLocation(list),
        }
    },
    created() {
        this.provinceList = this.location.currentProvinces
    },
    methods: {
        provinceChoosed() {
            this.location.changeProvince(this.currentProvince)
            this.cityList = this.location.currentCities
        },
        cityChoosed() {
            this.location.changeCity(this.currentCity)
            let currentLocation = this.location.getCurrentAddress()
            let cityInfo = {
                province: currentLocation.province.name,
                city: currentLocation.city.name
            }
            this.$emit('choose', cityInfo)
        },
    }
}
</script>
<style scoped>
.location-wrapper {
    display: inline;
}
</style>
