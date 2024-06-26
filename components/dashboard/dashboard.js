import React from 'react';
import Card from '@material-ui/core/Card';
import Subheader from '@material-ui/core/ListSubheader';
import '../style.css';
import Chart from "react-apexcharts";
import mange from '../../config/breadcrumbsManager';
import getConnect from '../common/connect';

class SimpleLineChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series1: [{
        data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54, 59, 90, 100]
      }],
      options1: {
        chart: {
          type: 'line',
          width: 100,
          height: 100,
          sparkline: {
            enabled: true
          }
        },
        tooltip: {
          fixed: {
            enabled: false
          },
          x: {
            show: false
          },
          y: {
            title: {
              formatter: function (seriesName) {
                return ''
              }
            }
          },
          marker: {
            show: false
          }
        }
      },
    };
  }
  render() {
    return (
      <Chart options={this.state.options1} series={this.state.series1} type="line" height={100} width={250} />
    )
  }
}

class ColumnChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      series: [{
        name: 'Active',
        data: [44, 55, 41, 67, 22, 43, 21, 49]
      }, {
        name: 'Completed',
        data: [13, 23, 20, 8, 13, 27, 33, 12]
      }, {
        name: 'Canceled',
        data: [11, 17, 15, 15, 21, 14, 15, 13]
      }],
      options: {
        chart: {
          type: 'bar',
          height: 500,
          stacked: true,
        },
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }],
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
          ],
        },
        fill: {
          opacity: 1
        },
        legend: {
          position: 'top',
        },
      },


    };
  }
  render() {
    return (
      <div id="chart">
        <Chart options={this.state.options} series={this.state.series} type="bar" height={500} />
      </div>
    )
  }
}

class DonutChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      series: [44, 55, 41],
      options: {
        chart: {
          type: 'donut',
        },
        responsive: [{
          breakpoint: 500,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },


    };
  }



  render() {
    return (


      <div id="chart">
        <Chart options={this.state.options} series={this.state.series} type="donut" height={508} />
      </div>
    )
  }
}

class LineChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      series: [{
        name: "Series 1",
        data: [400, 500, 600, 650, 700, 710, 750, 770, 800, 810, 750, 700]
      },
      {
        name: "Series 2",
        data: [300, 310, 200, 350, 400, 420, 430, 500, 600, 400, 600, 650]
      }]
      ,
      options: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: 'Distributions',
          align: 'left'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
        legend: {
          position: 'top'
        }
      },


    };
  }
  render() {
    return (
      <div id="chart">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="line"
          width="1050"
        />
      </div>
    )
  }
}
class RadialbarsChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [68],
      options: {
        chart: {
          height: 350,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: '80%',
            }
          },
        },
        labels: ['Hit Rate this year'],
        legend: {
          position: 'top'
        }
      },
      series1: [76],
      options1: {
        chart: {
          height: 350,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: '80%',
            }
          },
        },
        labels: ['Deal this year'],
        legend: {
          position: 'top'
        }
      }
    };
  }



  render() {
    return (

      <div>
        <div id="chart">
          <Chart options={this.state.options} series={this.state.series} type="radialBar" height={290} />
        </div>
        <div id="chart">
          <Chart options={this.state.options1} series={this.state.series1} type="radialBar" height={285} />
        </div>
      </div>
    )
  }
}


class Dashboard extends React.Component {
  componentDidMount() {
    this.props.setBreadcrumbs(mange(['Dashboard']));

  }


  render() {
    return (
      <div className="product-list">
        <Subheader className={`subheader`}>
          <div className="row pr-0 pl-0">
            <div className="col-md-6 pr-0 pl-0">
              <h1 className={`listHeadH1`}>Overview</h1>
            </div>
          </div>
        </Subheader>
        <div className="row">
          <div className="col-xs-3">
            <Card>
              <div className={`row pr-0 pl-0 innerItem`}>
                <div className={`col-xs-12 pr-0 pl-0`}>
                  Distribution Costs
                            </div>
                <div className={`col-xs-12 pr-0 pl-0`}>
                  27632 +2.5%
                            </div>
                <div className={`col-xs-12 pr-0 pl-0`}>
                  Compared to ($21340 last year)
                            </div>
              </div>
            </Card>
          </div>
          <div className="col-xs-3">
            <Card>
              <div className={`row pr-0 pl-0 innerItem`}>
                <div className={`col-xs-12 pr-0 pl-0`}>
                  Operating Costs
                            </div>
                <div className={`col-xs-12 pr-0 pl-0`}>
                  20199 +0.5%
                            </div>
                <div className={`col-xs-12 pr-0 pl-0`}>
                  Compared to ($19000 last year)
                            </div>
              </div>
            </Card>
          </div>
          <div className="col-xs-3">
            <Card>
              <div className={`row pr-0 pl-0 innerItem`}>
                <div className={`col-xs-12 pr-0 pl-0`}>
                  Lobor Costs
                            </div>
                <div className={`col-xs-12 pr-0 pl-0`}>
                  110 -1.5%
                            </div>
                <div className={`col-xs-12 pr-0 pl-0`}>
                  Compared to ($165 last year)
                            </div>
              </div>
            </Card>
          </div>
          <div className="col-xs-3">
            <Card>
              <div className={`row pr-0 pl-0 innerItem`}>
                <div className={`col-xs-12 pr-0 pl-0`}>
                  Order Costs
                            </div>
                <div className={`col-xs-12 pr-0 pl-0`}>
                  12632 +2.5%
                            </div>
                <div className={`col-xs-12 pr-0 pl-0`}>
                  Compared to ($19000 last year)
                            </div>
              </div>
            </Card>
          </div>
        </div>
        <div>
          <div className="row" ref='root'>
            <div className="col-xs-7">
              <div style={{ width: '100%' }}>
                <Card>

                  <ColumnChart />
                </Card>

              </div>
            </div>
            <div className="col-xs-5">
              <Card>

                <DonutChart />
              </Card>

            </div>
          </div>
          <div className="row">
            <div className="col-xs-3">
              <Card>
                <RadialbarsChart />
                <SimpleLineChart />
              </Card>
            </div>
            <div className="col-xs-9">
              <Card>
                <LineChart />

              </Card>
            </div>

          </div>
        </div>

      </div>
    );
  }
}

export default getConnect(Dashboard);

