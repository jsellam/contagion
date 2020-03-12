import React from 'react'
import Input from '../Input/Input'
import CanvasJSReact from './canvasjs.react';


const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const hasError = (v) => {
  if(v === '') return true
  return parseFloat(v).toString() != v
}


class Stats extends React.PureComponent {


  constructor(props) {

    super(props)
    this.state = {
      totalPopulation:70000000,
      dailyContact:50,
      probability:0.50,
      duration:10,
      mortality:3,
      r0:2.5,
      result:[],
      endDeath:0
    }
  }

  componentDidMount() {
    this.recalculate()
  }

  handleChange = (id, value) => {
    this.setState({[id]:value},this.recalculate)
  }

 toggleDataSeries = (e)=> {
    if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible ){
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    this.chart.render();
  }
  
  

  recalculate = () => {
    
    
    let  {totalPopulation, dailyContact, probability, duration, mortality} = this.state
    
    const error = hasError(totalPopulation) || hasError(dailyContact) || hasError(probability) || hasError(duration) || hasError(mortality)
    
    if(error) return

    totalPopulation = parseFloat(totalPopulation)
    dailyContact = parseFloat(dailyContact)
    probability = parseFloat(probability)
    duration = parseFloat(duration)
    mortality = parseFloat(mortality)

    const r0 = dailyContact * probability * duration / 100

    probability = probability/100
    mortality = mortality/100

    const result = [
      {
        malades:2000,
        remis:200,
        morts:50,
        sains:totalPopulation - 2000 - 200 - 50
      }
    ]
    for(var i=1;i<180;i++) {
      let prev = result[i-1]
      let malades = prev.malades + prev.malades * dailyContact * probability * (prev.sains /totalPopulation ) - (1/duration)*prev.malades  - (mortality/duration)*prev.malades
      console.log('malades',i,malades)
      let remis = prev.remis+(1/duration)*prev.malades
      let morts = prev.morts+(mortality/duration)*prev.malades
      let sains = totalPopulation-malades-remis-morts
      result.push({
        malades,
        remis,
        morts,
        sains
      })
    }

    const config = {
      theme:"dark2",
      animationEnabled:true,
      title:{
        text: "Epidémie SIR"
      },
      axisY :{
        includeZero: false,
        title: "Population",
      },
      legend:{
        cursor:"pointer",
        itemclick: this.toggleDataSeries
      },
      data:[
        {
          type:"spline",
          showInLegend:true,
          name:"Sains",
          dataPoints:result.map(({sains}, index)=> ({label:'j'+index, y:Math.floor(sains)}))
        },
        {
          type:"spline",
          showInLegend:true,
          name:"Malades",
          dataPoints:result.map(({malades}, index)=> ({label:'j'+index, y:Math.floor(malades)}))
        },
        {
          type:"spline",
          showInLegend:true,
          name:"Remis",
          dataPoints:result.map(({remis}, index)=> ({label:'j'+index, y:Math.floor(remis)}))
        },
        {
          type:"spline",
          showInLegend:true,
          name:"Morts",
          dataPoints:result.map(({morts}, index)=> ({label:'j'+index, y:Math.floor(morts)}))
        },
      ]
    }

    const endDeath = Math.floor(result[result.length-1].morts)

    //console.log(result)
    
    
    this.setState({r0, config,endDeath})
  }

  //69996677	2631	629 63

  render() {



    return (
      <div>
      <div className="header">
        Adaptation web du tableau de <a href="https://twitter.com/dlouapre/status/1238075347855380482">@David Louapre</a><br />
        Développé par <a href="https://twitter.com/chloridrik">@Jérémie sellam.</a>
       
      </div>
        <div className="columns">
          <div className="left-column">
            <Input label="Population totale" value={this.state.totalPopulation} id="totalPopulation" onChange={this.handleChange}/>
            <Input label="Nombre de contacts quotidiens" value={this.state.dailyContact} id="dailyContact" onChange={this.handleChange}/>
            <Input label="Probabilité de transmission (%)" value={this.state.probability} id="probability" onChange={this.handleChange}/>
            <Input label="Durée de la maladie (jours)" value={this.state.duration} id="duration" onChange={this.handleChange}/>
            <Input label="Taux mortalité (%)" value={this.state.mortality} id="mortality" onChange={this.handleChange}/>
            <div>R0: {this.state.r0}</div>
            <div>Nombre de morts au bout de 6 mois : {this.state.endDeath}</div>
          </div>
          <div className="right-column">
          <CanvasJSChart ref={e => this.chart = e} options = {this.state.config}
              /* onRef = {ref => this.chart = ref} */
          />
          </div>
        </div>
      </div>
    )
  }

}

export default Stats