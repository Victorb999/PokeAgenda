<template>
    <div class="status-box-container" >      
        <h1>Base status</h1>
        
                <div class="lista-atributos">
                   <ul class="lista-base-status">
                        <li v-for='(status,index) in pokeresposta' :key='index'>
                        <b-badge class="badge-status" :class='color[0].type.name'>{{status.stat.name}}</b-badge><b-icon-arrow-right-short></b-icon-arrow-right-short>
                        <span> {{status.base_stat}}</span>
                        <!-- <b-collapse v-if="(index+1)%3 === 0"></b-collapse>           -->
                        </li>
                    </ul>
                    <div class='grafico'>
                    <div id="chart">
                        <apexchart type="radar" height="350" :options="chartOptions" :series="series"></apexchart>
                    </div>
                    </div>
                </div>
    
    
    </div>
</template>

<script>
import apexchart from 'vue-apexcharts'
export default {
     props:{
        pokeresposta: Array,
        color: Array
    },
    components: {
        apexchart,
    },
    data(){
        return{
            series: [{
                name: 'Stats',
                data: [],
            }],
            chartOptions: {                
                chart: {
                    height: 350,
                    type: 'radar',
                        animations: {
                            enabled: true,
                            easing: 'easeinout',
                            speed: 800,
                            animateGradually: {
                                enabled: true,
                                delay: 150
                            },
                            dynamicAnimation: {
                                enabled: true,
                                speed: 350
                            }
                        }
                },
                responsive: [{
                    breakpoint: 500,
                    options: {
                        plotOptions: {
                            radar: {
                                    size: 70,                                    
                            }
                        },       
                    },
                }],
                title: {
                    text: ''
                },
                xaxis: {
                    categories: [],
                    min: 0,
                    max:200,
                    labels: {
                        show: true,
                        style: {
                            colors: [],
                            fontSize: '13px',
                            fontFamily: 'Oswald, Helvetica, Arial, sans-serif',
                            fontWeight: 800,
                            cssClass: 'apexcharts-xaxis-label',
                        },

                    },
                },
                yaxis:{
                    min: 0,
                    max:200, 
                        labels: {
                        show: false,
                        style: {
                            colors: [],
                            fontSize: '0px',
                        },

                    },               
                },
                dataLabels: {
                    enabled: false,
                },
                plotOptions: {
                    radar: {
                            size: 140,
                            polygons: {
                                strokeColor: '#e9e9e9',
                                fill: {
                                    colors: ['#f8f8f8', '#fff']
                                }
                            }
                    }
                },            
                colors: ['#FF4560'],
                markers: {
                    size: 2,
                    colors: ['#fff'],
                    strokeColor: '#000',
                    strokeWidth: 1,
                },
                
            },
                      
          
        }
    },
    beforeMount(){
       this.montaGrafico()
       //console.log(this.chartOptions.xaxis.categories,this.series[0].data)
    },
    watch:{
        pokeresposta:{
            handler() {                
                this.montaGrafico()          
            }
        }
    },
    methods: {
        montaGrafico(){
            this.pokeresposta.map((resp) =>{
                //console.log(resp.stat.name,resp.base_stat)                
                this.chartOptions.xaxis.categories = [...this.chartOptions.xaxis.categories,resp.stat.name]
                this.chartOptions.xaxis.labels.style.colors = [...this.chartOptions.xaxis.labels.style.colors,'#333333']
                this.series[0].data = [...this.series[0].data,resp.base_stat]                
            })           
            //console.log(this.colors[this.color[0].type.name],this.chartOptions.colors)
            this.chartOptions.colors[0] = this.colors[this.color[0].type.name]
        }
    },
    
}
</script>