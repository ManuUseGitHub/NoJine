<script>

    // import your vue components here (references to files)
    import cardinalselector from '../Vue-comps/cardinalselector.vue'


    export default {
        main: new Vue({
            el: '#main',

            props: {
                // viewData : viewData
            },

            data: {
                // message: 'Hello world !'
            },

            components: {
                'cardinalselector':cardinalselector
            },

            methods: {
                /*
                * Write your custom repeating behaviors here -> DRY
                * */
            }
        })
    }

    /*
    * Note :
    *   use *** this.$el *** in child components to get this root component
    *   to use the main component methods instead of redefining every time
    *   the same behavior -> DRY
    * */

</script>