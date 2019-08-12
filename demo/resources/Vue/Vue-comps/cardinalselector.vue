<template>
    <div class="directions" >
        <template v-for="(c, index) in classes">
            <br v-if="index > 0 && index%3 === 0"/>

            <input v-if="index === 5" type='radio' :value='c' :id='c' name='direction' checked>
            <input v-else type='radio' :value='c' :id='c' name='direction' >
            <button :class="c+' dcell btn'">
                <label v-if="index !==4" :for='c'>
                    <i class="fas fa-chevron-right"></i>
                </label>
            </button>

        </template>
    </div>
</template>
<script>
    export default {
        componentName: 'comp',
        props: {

            classes: {
                default:function(){
                    return ['dtl','dt','dtr','dl','dx','dr','dbl','db','dbr']
                }
            }
        },
        methods: {},

        components: {},
    }
</script>