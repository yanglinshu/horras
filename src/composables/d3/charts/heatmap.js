/* eslint-disable no-unused-vars */
import * as d3 from 'd3';
import useChartState from '@/composables/charts/useChartState';
import { doDebounce } from '@/composables/utils/useDebounce';

const { setTimeRange } = useChartState();

function defineAxis({
  xType = d3.scaleLinear(),
  yType = d3.scaleLinear(),
  xDomain,
  yDomain,
  margin,
  width,
  height,
}) {
  const x = xType.domain(xDomain).range([margin.left, width - margin.right]);
  const y = yType.domain(yDomain).range([margin.top, height - margin.bottom]);
  return { x, y };
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function naiveHeatmap(
  {
    width = 400,
    height = 900,
    margin = {
      top: 10,
      right: 30,
      bottom: 10,
      left: 30,
    },
    heatmapColor = d3.interpolateRdPu,
    // d3.interpolateCubehelixLong('#f0f9e8', '#08306b')
    // d3.interpolateHslLong(d3.hsl(0, 0, 0.5), d3.hsl(0, 0, 0.9))
    // d3.interpolateLab('#ffffff', '#ff0000')
  },
  data,
) {
  if (data.value.length === 0) {
    return d3.create('svg');
  }
  const color = d3.scaleSequentialPow(
    [0, data.value.length ? d3.max(d3.max(data.value)) : 0],
    heatmapColor,
  );

  const { x, y } = defineAxis({
    xDomain: [0, data.value[0].length + 2],
    yDomain: [0, data.value.length + 2],
    ...arguments[0],
  });

  const svg = d3
    .create('svg')
    .attr('viewBox', [0, 0, width, height])
    .attr('width', width)
    .attr('height', height);

  svg
    .append('g')
    .attr('id', 'heatmap')
    .selectAll('g')
    .data(data.value)
    .join('g')
    .attr('cy', (d, i) => y(1) + (y(2) - y(1)) * i)
    .attr('transform', (d, i) => {
      return `translate(0,${y(1) + (y(2) - y(1)) * i})`;
    })
    .selectAll('.naives')
    .data((d) => d)
    .join('rect')
    .attr('class', 'naives')
    .attr('isCell', true)
    .attr('x', (d, i) => {
      return x(1) + (x(2) - x(1)) * i;
    })
    .attr('cy', function (d, i, g) {
      return this.parentNode.getAttribute('cy');
    })
    .attr('width', (d, i) => x(2) - x(1) - 1)
    .attr('height', (d, i) => y(2) - y(1) - 1)
    .attr('fill', (d) => color(d));

  let draw_weather_blocks = () => {
    let weather = [
      {
        year: '2017',
        month: '05',
        day: '01',
        days: '0',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '25',
        tem_lower: '32',
      },
      {
        year: '2017',
        month: '05',
        day: '02',
        days: '1',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '25',
        tem_lower: '34',
      },
      {
        year: '2017',
        month: '05',
        day: '03',
        days: '2',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '36',
      },
      {
        year: '2017',
        month: '05',
        day: '04',
        days: '3',
        weather_upper: '大到暴雨',
        weather_lower: '雷阵雨',
        tem_upper: '25',
        tem_lower: '32',
      },
      {
        year: '2017',
        month: '05',
        day: '05',
        days: '4',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '24',
        tem_lower: '30',
      },
      {
        year: '2017',
        month: '05',
        day: '06',
        days: '5',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '24',
        tem_lower: '31',
      },
      {
        year: '2017',
        month: '05',
        day: '07',
        days: '6',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '24',
        tem_lower: '31',
      },
      {
        year: '2017',
        month: '05',
        day: '08',
        days: '7',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '24',
        tem_lower: '33',
      },
      {
        year: '2017',
        month: '05',
        day: '09',
        days: '8',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '25',
        tem_lower: '31',
      },
      {
        year: '2017',
        month: '05',
        day: '10',
        days: '9',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '25',
        tem_lower: '32',
      },
      {
        year: '2017',
        month: '05',
        day: '11',
        days: '10',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '25',
        tem_lower: '34',
      },
      {
        year: '2017',
        month: '05',
        day: '12',
        days: '11',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '25',
        tem_lower: '34',
      },
      {
        year: '2017',
        month: '05',
        day: '13',
        days: '12',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '25',
        tem_lower: '30',
      },
      {
        year: '2017',
        month: '05',
        day: '14',
        days: '13',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '24',
        tem_lower: '30',
      },
      {
        year: '2017',
        month: '05',
        day: '15',
        days: '14',
        weather_upper: '雷阵雨',
        weather_lower: '雷阵雨',
        tem_upper: '24',
        tem_lower: '32',
      },
      {
        year: '2017',
        month: '05',
        day: '16',
        days: '15',
        weather_upper: '雷阵雨',
        weather_lower: '雷阵雨',
        tem_upper: '24',
        tem_lower: '29',
      },
      {
        year: '2017',
        month: '05',
        day: '17',
        days: '16',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '24',
        tem_lower: '29',
      },
      {
        year: '2017',
        month: '05',
        day: '18',
        days: '17',
        weather_upper: '多云',
        weather_lower: '雷阵雨',
        tem_upper: '24',
        tem_lower: '30',
      },
      {
        year: '2017',
        month: '05',
        day: '19',
        days: '18',
        weather_upper: '雷阵雨',
        weather_lower: '雷阵雨',
        tem_upper: '24',
        tem_lower: '29',
      },
      {
        year: '2017',
        month: '05',
        day: '20',
        days: '19',
        weather_upper: '大雨',
        weather_lower: '多云',
        tem_upper: '24',
        tem_lower: '30',
      },
      {
        year: '2017',
        month: '05',
        day: '21',
        days: '20',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '25',
        tem_lower: '30',
      },
      {
        year: '2017',
        month: '05',
        day: '22',
        days: '21',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '32',
      },
      {
        year: '2017',
        month: '05',
        day: '23',
        days: '22',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '34',
      },
      {
        year: '2017',
        month: '05',
        day: '24',
        days: '23',
        weather_upper: '雷阵雨',
        weather_lower: '雷阵雨',
        tem_upper: '25',
        tem_lower: '32',
      },
      {
        year: '2017',
        month: '05',
        day: '25',
        days: '24',
        weather_upper: '大雨',
        weather_lower: '雷阵雨',
        tem_upper: '25',
        tem_lower: '28',
      },
      {
        year: '2017',
        month: '05',
        day: '26',
        days: '25',
        weather_upper: '多云',
        weather_lower: '阵雨',
        tem_upper: '24',
        tem_lower: '28',
      },
      {
        year: '2017',
        month: '05',
        day: '27',
        days: '26',
        weather_upper: '阵雨',
        weather_lower: '多云',
        tem_upper: '25',
        tem_lower: '28',
      },
      {
        year: '2017',
        month: '05',
        day: '28',
        days: '27',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '25',
        tem_lower: '29',
      },
      {
        year: '2017',
        month: '05',
        day: '29',
        days: '28',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '25',
        tem_lower: '30',
      },
      {
        year: '2017',
        month: '05',
        day: '30',
        days: '29',
        weather_upper: '阵雨',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '31',
      },
      {
        year: '2017',
        month: '05',
        day: '31',
        days: '30',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '33',
      },
      {
        year: '2017',
        month: '06',
        day: '01',
        days: '31',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '27',
        tem_lower: '35',
      },
      {
        year: '2017',
        month: '06',
        day: '02',
        days: '32',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '28',
        tem_lower: '37',
      },
      {
        year: '2017',
        month: '06',
        day: '03',
        days: '33',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '28',
        tem_lower: '37',
      },
      {
        year: '2017',
        month: '06',
        day: '04',
        days: '34',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '28',
        tem_lower: '37',
      },
      {
        year: '2017',
        month: '06',
        day: '05',
        days: '35',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '27',
        tem_lower: '37',
      },
      {
        year: '2017',
        month: '06',
        day: '06',
        days: '36',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '27',
        tem_lower: '35',
      },
      {
        year: '2017',
        month: '06',
        day: '07',
        days: '37',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '33',
      },
      {
        year: '2017',
        month: '06',
        day: '08',
        days: '38',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '27',
        tem_lower: '34',
      },
      {
        year: '2017',
        month: '06',
        day: '09',
        days: '39',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '32',
      },
      {
        year: '2017',
        month: '06',
        day: '10',
        days: '40',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '32',
      },
      {
        year: '2017',
        month: '06',
        day: '11',
        days: '41',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '33',
      },
      {
        year: '2017',
        month: '06',
        day: '12',
        days: '42',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '33',
      },
      {
        year: '2017',
        month: '06',
        day: '13',
        days: '43',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '27',
        tem_lower: '34',
      },
      {
        year: '2017',
        month: '06',
        day: '14',
        days: '44',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '27',
        tem_lower: '34',
      },
      {
        year: '2017',
        month: '06',
        day: '15',
        days: '45',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '27',
        tem_lower: '34',
      },
      {
        year: '2017',
        month: '06',
        day: '16',
        days: '46',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '34',
      },
      {
        year: '2017',
        month: '06',
        day: '17',
        days: '47',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '32',
      },
      {
        year: '2017',
        month: '06',
        day: '18',
        days: '48',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '31',
      },
      {
        year: '2017',
        month: '06',
        day: '19',
        days: '49',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '33',
      },
      {
        year: '2017',
        month: '06',
        day: '20',
        days: '50',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '27',
        tem_lower: '34',
      },
      {
        year: '2017',
        month: '06',
        day: '21',
        days: '51',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '27',
        tem_lower: '36',
      },
      {
        year: '2017',
        month: '06',
        day: '22',
        days: '52',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '34',
      },
      {
        year: '2017',
        month: '06',
        day: '23',
        days: '53',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '34',
      },
      {
        year: '2017',
        month: '06',
        day: '24',
        days: '54',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '34',
      },
      {
        year: '2017',
        month: '06',
        day: '25',
        days: '55',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '34',
      },
      {
        year: '2017',
        month: '06',
        day: '26',
        days: '56',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '27',
        tem_lower: '35',
      },
      {
        year: '2017',
        month: '06',
        day: '27',
        days: '57',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '34',
      },
      {
        year: '2017',
        month: '06',
        day: '28',
        days: '58',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '34',
      },
      {
        year: '2017',
        month: '06',
        day: '29',
        days: '59',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '34',
      },
      {
        year: '2017',
        month: '06',
        day: '30',
        days: '60',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '34',
      },
      {
        year: '2017',
        month: '07',
        day: '01',
        days: '61',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '35',
      },
      {
        year: '2017',
        month: '07',
        day: '02',
        days: '62',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '34',
      },
      {
        year: '2017',
        month: '07',
        day: '03',
        days: '63',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '33',
      },
      {
        year: '2017',
        month: '07',
        day: '04',
        days: '64',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '32',
      },
      {
        year: '2017',
        month: '07',
        day: '05',
        days: '65',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '33',
      },
      {
        year: '2017',
        month: '07',
        day: '06',
        days: '66',
        weather_upper: '中雨',
        weather_lower: '中雨',
        tem_upper: '25',
        tem_lower: '32',
      },
      {
        year: '2017',
        month: '07',
        day: '07',
        days: '67',
        weather_upper: '中雨',
        weather_lower: '阵雨',
        tem_upper: '25',
        tem_lower: '31',
      },
      {
        year: '2017',
        month: '07',
        day: '08',
        days: '68',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '25',
        tem_lower: '32',
      },
      {
        year: '2017',
        month: '07',
        day: '09',
        days: '69',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '25',
        tem_lower: '33',
      },
      {
        year: '2017',
        month: '07',
        day: '10',
        days: '70',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '35',
      },
      {
        year: '2017',
        month: '07',
        day: '11',
        days: '71',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '33',
      },
      {
        year: '2017',
        month: '07',
        day: '12',
        days: '72',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '31',
      },
      {
        year: '2017',
        month: '07',
        day: '13',
        days: '73',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '31',
      },
      {
        year: '2017',
        month: '07',
        day: '14',
        days: '74',
        weather_upper: '雷阵雨',
        weather_lower: '雷阵雨',
        tem_upper: '25',
        tem_lower: '29',
      },
      {
        year: '2017',
        month: '07',
        day: '15',
        days: '75',
        weather_upper: '中雨',
        weather_lower: '大雨',
        tem_upper: '25',
        tem_lower: '30',
      },
      {
        year: '2017',
        month: '07',
        day: '16',
        days: '76',
        weather_upper: '中雨',
        weather_lower: '中雨',
        tem_upper: '25',
        tem_lower: '29',
      },
      {
        year: '2017',
        month: '07',
        day: '17',
        days: '77',
        weather_upper: '小到中雨',
        weather_lower: '阵雨',
        tem_upper: '25',
        tem_lower: '31',
      },
      {
        year: '2017',
        month: '07',
        day: '18',
        days: '78',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '31',
      },
      {
        year: '2017',
        month: '07',
        day: '19',
        days: '79',
        weather_upper: '雷阵雨',
        weather_lower: '阵雨',
        tem_upper: '25',
        tem_lower: '32',
      },
      {
        year: '2017',
        month: '07',
        day: '20',
        days: '80',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '25',
        tem_lower: '32',
      },
      {
        year: '2017',
        month: '07',
        day: '21',
        days: '81',
        weather_upper: '多云',
        weather_lower: '雷阵雨',
        tem_upper: '25',
        tem_lower: '32',
      },
      {
        year: '2017',
        month: '07',
        day: '22',
        days: '82',
        weather_upper: '中到大雨',
        weather_lower: '中到大雨',
        tem_upper: '25',
        tem_lower: '29',
      },
      {
        year: '2017',
        month: '07',
        day: '23',
        days: '83',
        weather_upper: '阵雨',
        weather_lower: '中雨',
        tem_upper: '25',
        tem_lower: '30',
      },
      {
        year: '2017',
        month: '07',
        day: '24',
        days: '84',
        weather_upper: '阵雨',
        weather_lower: '中到大雨',
        tem_upper: '26',
        tem_lower: '31',
      },
      {
        year: '2017',
        month: '07',
        day: '25',
        days: '85',
        weather_upper: '阵雨',
        weather_lower: '阵雨',
        tem_upper: '25',
        tem_lower: '31',
      },
      {
        year: '2017',
        month: '07',
        day: '26',
        days: '86',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '32',
      },
      {
        year: '2017',
        month: '07',
        day: '27',
        days: '87',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '32',
      },
      {
        year: '2017',
        month: '07',
        day: '28',
        days: '88',
        weather_upper: '雷阵雨',
        weather_lower: '雷阵雨',
        tem_upper: '26',
        tem_lower: '31',
      },
      {
        year: '2017',
        month: '07',
        day: '29',
        days: '89',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '32',
      },
      {
        year: '2017',
        month: '07',
        day: '30',
        days: '90',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '27',
        tem_lower: '33',
      },
      {
        year: '2017',
        month: '07',
        day: '31',
        days: '91',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '27',
        tem_lower: '34',
      },
      {
        year: '2017',
        month: '08',
        day: '01',
        days: '92',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '28',
        tem_lower: '35',
      },
      {
        year: '2017',
        month: '08',
        day: '02',
        days: '93',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '27',
        tem_lower: '35',
      },
      {
        year: '2017',
        month: '08',
        day: '03',
        days: '94',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '27',
        tem_lower: '34',
      },
      {
        year: '2017',
        month: '08',
        day: '04',
        days: '95',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '33',
      },
      {
        year: '2017',
        month: '08',
        day: '05',
        days: '96',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '25',
        tem_lower: '34',
      },
      {
        year: '2017',
        month: '08',
        day: '06',
        days: '97',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '34',
      },
      {
        year: '2017',
        month: '08',
        day: '07',
        days: '98',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '25',
        tem_lower: '34',
      },
      {
        year: '2017',
        month: '08',
        day: '08',
        days: '99',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '27',
        tem_lower: '35',
      },
      {
        year: '2017',
        month: '08',
        day: '09',
        days: '100',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '27',
        tem_lower: '35',
      },
      {
        year: '2017',
        month: '08',
        day: '10',
        days: '101',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '27',
        tem_lower: '35',
      },
      {
        year: '2017',
        month: '08',
        day: '11',
        days: '102',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '27',
        tem_lower: '35',
      },
      {
        year: '2017',
        month: '08',
        day: '12',
        days: '103',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '27',
        tem_lower: '35',
      },
      {
        year: '2017',
        month: '08',
        day: '13',
        days: '104',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '27',
        tem_lower: '36',
      },
      {
        year: '2017',
        month: '08',
        day: '14',
        days: '105',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '27',
        tem_lower: '36',
      },
      {
        year: '2017',
        month: '08',
        day: '15',
        days: '106',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '35',
      },
      {
        year: '2017',
        month: '08',
        day: '16',
        days: '107',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '33',
      },
      {
        year: '2017',
        month: '08',
        day: '17',
        days: '108',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '33',
      },
      {
        year: '2017',
        month: '08',
        day: '18',
        days: '109',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '33',
      },
      {
        year: '2017',
        month: '08',
        day: '19',
        days: '110',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '33',
      },
      {
        year: '2017',
        month: '08',
        day: '20',
        days: '111',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '33',
      },
      {
        year: '2017',
        month: '08',
        day: '21',
        days: '112',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '33',
      },
      {
        year: '2017',
        month: '08',
        day: '22',
        days: '113',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '32',
      },
      {
        year: '2017',
        month: '08',
        day: '23',
        days: '114',
        weather_upper: '大雨',
        weather_lower: '雷阵雨',
        tem_upper: '25',
        tem_lower: '29',
      },
      {
        year: '2017',
        month: '08',
        day: '24',
        days: '115',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '34',
      },
      {
        year: '2017',
        month: '08',
        day: '25',
        days: '116',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '32',
      },
      {
        year: '2017',
        month: '08',
        day: '26',
        days: '117',
        weather_upper: '雷阵雨',
        weather_lower: '大雨',
        tem_upper: '26',
        tem_lower: '31',
      },
      {
        year: '2017',
        month: '08',
        day: '27',
        days: '118',
        weather_upper: '大雨',
        weather_lower: '中雨',
        tem_upper: '26',
        tem_lower: '30',
      },
      {
        year: '2017',
        month: '08',
        day: '28',
        days: '119',
        weather_upper: '雷阵雨',
        weather_lower: '雷阵雨',
        tem_upper: '25',
        tem_lower: '30',
      },
      {
        year: '2017',
        month: '08',
        day: '29',
        days: '120',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '29',
      },
      {
        year: '2017',
        month: '08',
        day: '30',
        days: '121',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '25',
        tem_lower: '32',
      },
      {
        year: '2017',
        month: '08',
        day: '31',
        days: '122',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '33',
      },
      {
        year: '2017',
        month: '09',
        day: '01',
        days: '123',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '25',
        tem_lower: '33',
      },
      {
        year: '2017',
        month: '09',
        day: '02',
        days: '124',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '33',
      },
      {
        year: '2017',
        month: '09',
        day: '03',
        days: '125',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '33',
      },
      {
        year: '2017',
        month: '09',
        day: '04',
        days: '126',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '27',
        tem_lower: '34',
      },
      {
        year: '2017',
        month: '09',
        day: '05',
        days: '127',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '27',
        tem_lower: '33',
      },
      {
        year: '2017',
        month: '09',
        day: '06',
        days: '128',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '33',
      },
      {
        year: '2017',
        month: '09',
        day: '07',
        days: '129',
        weather_upper: '雷阵雨',
        weather_lower: '雷阵雨',
        tem_upper: '25',
        tem_lower: '32',
      },
      {
        year: '2017',
        month: '09',
        day: '08',
        days: '130',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '33',
      },
      {
        year: '2017',
        month: '09',
        day: '09',
        days: '131',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '34',
      },
      {
        year: '2017',
        month: '09',
        day: '10',
        days: '132',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '34',
      },
      {
        year: '2017',
        month: '09',
        day: '11',
        days: '133',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '25',
        tem_lower: '35',
      },
      {
        year: '2017',
        month: '09',
        day: '12',
        days: '134',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '33',
      },
      {
        year: '2017',
        month: '09',
        day: '13',
        days: '135',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '33',
      },
      {
        year: '2017',
        month: '09',
        day: '14',
        days: '136',
        weather_upper: '中到大雨',
        weather_lower: '中到大雨',
        tem_upper: '26',
        tem_lower: '30',
      },
      {
        year: '2017',
        month: '09',
        day: '15',
        days: '137',
        weather_upper: '小到中雨',
        weather_lower: '阵雨',
        tem_upper: '26',
        tem_lower: '32',
      },
      {
        year: '2017',
        month: '09',
        day: '16',
        days: '138',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '32',
      },
      {
        year: '2017',
        month: '09',
        day: '17',
        days: '139',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '33',
      },
      {
        year: '2017',
        month: '09',
        day: '18',
        days: '140',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '34',
      },
      {
        year: '2017',
        month: '09',
        day: '19',
        days: '141',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '34',
      },
      {
        year: '2017',
        month: '09',
        day: '20',
        days: '142',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '34',
      },
      {
        year: '2017',
        month: '09',
        day: '21',
        days: '143',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '32',
      },
      {
        year: '2017',
        month: '09',
        day: '22',
        days: '144',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '25',
        tem_lower: '32',
      },
      {
        year: '2017',
        month: '09',
        day: '23',
        days: '145',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '25',
        tem_lower: '32',
      },
      {
        year: '2017',
        month: '09',
        day: '24',
        days: '146',
        weather_upper: '暴雨',
        weather_lower: '阵雨',
        tem_upper: '25',
        tem_lower: '31',
      },
      {
        year: '2017',
        month: '09',
        day: '25',
        days: '147',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '32',
      },
      {
        year: '2017',
        month: '09',
        day: '26',
        days: '148',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '32',
      },
      {
        year: '2017',
        month: '09',
        day: '27',
        days: '149',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '33',
      },
      {
        year: '2017',
        month: '09',
        day: '28',
        days: '150',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '31',
      },
      {
        year: '2017',
        month: '09',
        day: '29',
        days: '151',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '25',
        tem_lower: '31',
      },
      {
        year: '2017',
        month: '09',
        day: '30',
        days: '152',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '25',
        tem_lower: '32',
      },
      {
        year: '2017',
        month: '10',
        day: '01',
        days: '153',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '25',
        tem_lower: '32',
      },
      {
        year: '2017',
        month: '10',
        day: '02',
        days: '154',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '25',
        tem_lower: '31',
      },
      {
        year: '2017',
        month: '10',
        day: '03',
        days: '155',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '25',
        tem_lower: '31',
      },
      {
        year: '2017',
        month: '10',
        day: '04',
        days: '156',
        weather_upper: '雷阵雨',
        weather_lower: '多云',
        tem_upper: '26',
        tem_lower: '32',
      },
      {
        year: '2017',
        month: '10',
        day: '05',
        days: '157',
        weather_upper: '雷阵雨',
        weather_lower: '中到大雨',
        tem_upper: '25',
        tem_lower: '29',
      },
      {
        year: '2017',
        month: '10',
        day: '06',
        days: '158',
        weather_upper: '中到大雨',
        weather_lower: '雷阵雨',
        tem_upper: '25',
        tem_lower: '28',
      },
      {
        year: '2017',
        month: '10',
        day: '07',
        days: '159',
        weather_upper: '阵雨',
        weather_lower: '阵雨',
        tem_upper: '25',
        tem_lower: '31',
      },
      {
        year: '2017',
        month: '10',
        day: '08',
        days: '160',
        weather_upper: '雷阵雨',
        weather_lower: '中雨',
        tem_upper: '25',
        tem_lower: '30',
      },
      {
        year: '2017',
        month: '10',
        day: '09',
        days: '161',
        weather_upper: '大雨',
        weather_lower: '大雨',
        tem_upper: '25',
        tem_lower: '29',
      },
      {
        year: '2017',
        month: '10',
        day: '10',
        days: '162',
        weather_upper: '雷阵雨',
        weather_lower: '阵雨',
        tem_upper: '25',
        tem_lower: '31',
      },
      {
        year: '2017',
        month: '10',
        day: '11',
        days: '163',
        weather_upper: '雷阵雨',
        weather_lower: '阵雨',
        tem_upper: '25',
        tem_lower: '30',
      },
      {
        year: '2017',
        month: '10',
        day: '12',
        days: '164',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '25',
        tem_lower: '30',
      },
      {
        year: '2017',
        month: '10',
        day: '13',
        days: '165',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '24',
        tem_lower: '29',
      },
      {
        year: '2017',
        month: '10',
        day: '14',
        days: '166',
        weather_upper: '多云',
        weather_lower: '阵雨',
        tem_upper: '23',
        tem_lower: '29',
      },
      {
        year: '2017',
        month: '10',
        day: '15',
        days: '167',
        weather_upper: '大暴雨',
        weather_lower: '暴雨',
        tem_upper: '19',
        tem_lower: '22',
      },
      {
        year: '2017',
        month: '10',
        day: '16',
        days: '168',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '20',
        tem_lower: '26',
      },
      {
        year: '2017',
        month: '10',
        day: '17',
        days: '169',
        weather_upper: '中到大雨',
        weather_lower: '中到大雨',
        tem_upper: '24',
        tem_lower: '28',
      },
      {
        year: '2017',
        month: '10',
        day: '18',
        days: '170',
        weather_upper: '阵雨',
        weather_lower: '多云',
        tem_upper: '24',
        tem_lower: '27',
      },
      {
        year: '2017',
        month: '10',
        day: '19',
        days: '171',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '23',
        tem_lower: '29',
      },
      {
        year: '2017',
        month: '10',
        day: '20',
        days: '172',
        weather_upper: '阵雨',
        weather_lower: '阵雨',
        tem_upper: '23',
        tem_lower: '27',
      },
      {
        year: '2017',
        month: '10',
        day: '21',
        days: '173',
        weather_upper: '多云',
        weather_lower: '阵雨',
        tem_upper: '23',
        tem_lower: '27',
      },
      {
        year: '2017',
        month: '10',
        day: '22',
        days: '174',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '22',
        tem_lower: '27',
      },
      {
        year: '2017',
        month: '10',
        day: '23',
        days: '175',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '21',
        tem_lower: '27',
      },
      {
        year: '2017',
        month: '10',
        day: '24',
        days: '176',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '22',
        tem_lower: '27',
      },
      {
        year: '2017',
        month: '10',
        day: '25',
        days: '177',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '21',
        tem_lower: '28',
      },
      {
        year: '2017',
        month: '10',
        day: '26',
        days: '178',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '21',
        tem_lower: '28',
      },
      {
        year: '2017',
        month: '10',
        day: '27',
        days: '179',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '21',
        tem_lower: '28',
      },
      {
        year: '2017',
        month: '10',
        day: '28',
        days: '180',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '21',
        tem_lower: '29',
      },
      {
        year: '2017',
        month: '10',
        day: '29',
        days: '181',
        weather_upper: '多云',
        weather_lower: '阵雨',
        tem_upper: '22',
        tem_lower: '27',
      },
      {
        year: '2017',
        month: '10',
        day: '30',
        days: '182',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '22',
        tem_lower: '26',
      },
      {
        year: '2017',
        month: '10',
        day: '31',
        days: '183',
        weather_upper: '多云',
        weather_lower: '多云',
        tem_upper: '21',
        tem_lower: '26',
      },
    ];
    let weather_types = [
      '多云',
      '小到中雨',
      '中雨',
      '中到大雨',
      '大雨',
      '阵雨',
      '雷阵雨',
      '大到暴雨',
      '暴雨',
      '大暴雨',
    ];
    let color_weather = (d) => d3.interpolateBlues(d);
    let color_scale = d3.scaleBand().domain(weather_types).range([0.1, 1]);
    let color = (d) => color_weather(color_scale(d));
    let width_rect = x(2) - x(1) - 1;
    let height_rect = y(2) - y(1) - 1;
    svg
      .append('g')
      .attr('class', 'weather')
      .append('g')
      .attr('class', 'weather_upper_all')
      .selectAll('.weather_upper')
      .data(weather)
      .join('rect')
      .attr('class', 'weather_upper')
      .attr('x', (d, i) => x(1) + (x(2) - x(1)) * i)
      .attr('y', (d, i) => y(0))
      .attr('width', width_rect)
      .attr('height', height_rect)
      .attr('fill', (d) => color(d.weather_upper));
    svg
      .select('.weather')
      .append('g')
      .attr('class', 'weather_lower_all')
      .selectAll('.weather_lower')
      .data(weather)
      .join('rect')
      .attr('class', 'weather_lower')
      .attr('x', (d, i) => x(1) + (x(2) - x(1)) * i)
      .attr('y', (d, i) => y(data.value.length + 1))
      .attr('width', width_rect)
      .attr('height', height_rect)
      .attr('fill', (d) => color(d.weather_lower));
  };
  draw_weather_blocks();
  let draw_num_lines = () => {
    let data_hour = [];
    let data_day = [];
    data.value.forEach((d) => {
      data_hour.push(d3.sum(d));
    });
    for (let i = 0; i < data.value[0].length; i++) {
      data_day.push(0);
      for (let j = 0; j < 24; j++) {
        data_day[i] += data.value[j][i];
      }
    }

    let draw_day_num = () => {
      let data_day_slope = [];
      let color = ['red', 'green'];
      data_day_slope.push(0);
      for (let i = 1; i < data_day.length; i++) {
        data_day_slope.push(data_day[i] - data_day[i - 1]);
      }
      let day_x_scale = d3
        .scaleLinear()
        .domain([0, data.value[0].length + 2])
        .range([margin.left, width - margin.right]);
      let x_minus = day_x_scale(1) - day_x_scale(0) - 1;
      let heigh_p = 0.5;
      let day_y_scale_day = d3
        .scaleLinear()
        .domain([0, d3.max(data_day)])
        .range([height - margin.bottom, height]);
      svg
        .append('g')
        .attr('class', 'day_num_all')
        .selectAll('.day_num')
        .data(data_day)
        .join('rect')
        .attr('class', 'day_num')
        .attr('y', (d) => height - margin.bottom)
        .attr('x', (d, i) => {
          return x(1) + (x(2) - x(1)) * i;
        })
        .attr(
          'height',
          (d) => heigh_p * (day_y_scale_day(d) - day_y_scale_day(0)),
        )
        .attr('width', x_minus)
        .attr('fill', (d, i) => {
          return color[data_day_slope[i] >= 0 ? 0 : 1];
        });
    };
    draw_day_num();

    let draw_hour_num = () => {
      let data_hour_slope = [];
      let color = ['red', 'green'];
      data_hour_slope.push(0);
      for (let i = 1; i < data_hour.length; i++) {
        data_hour_slope.push(data_hour[i] - data_hour[i - 1]);
      }
      let hour_x_scale_day = d3
        .scaleLinear()
        .domain(d3.extent(data_hour))
        .range([width - margin.right, width - 10]);
      let y_minus = y(2) - y(1) - 1;
      svg
        .append('g')
        .attr('class', 'hour_num_all')
        .selectAll('.hour_num')
        .data(data_hour)
        .join('rect')
        .attr('class', 'hour_num')
        .attr('x', (d) => width - margin.right)
        .attr('y', (d, i) => {
          return y(1) + (y(2) - y(1)) * i;
        })
        .attr('height', y_minus)
        .attr('width', (d) => hour_x_scale_day(d) - hour_x_scale_day(0))
        .attr('fill', (d, i) => {
          return color[data_hour_slope[i] >= 0 ? 0 : 1];
        });
    };
    draw_hour_num();
  };
  draw_num_lines();
  let draw_range = () => {
    let text = svg.append('g').attr('class', 'range');
    text
      .append('text')
      .attr('id', 'day_up')
      .attr('x', margin.left / 2 + 10)
      .attr('y', 40)
      .text('2017/5/1')
      .attr('text-anchor', 'middle');
    text
      .append('text')
      .attr('id', 'day_low')
      .attr('x', margin.left / 2 + 10)
      .attr('y', 60)
      .text('-2017/10/31')
      .attr('text-anchor', 'middle');
    text
      .append('text')
      .attr('id', 'hour')
      .attr('x', margin.left / 2 + 10)
      .attr('y', 80)
      .text('0-24')
      .attr('text-anchor', 'middle');
  };
  draw_range();
  return svg;
}

export function brushedHeatmap(
  {
    width = 400,
    height = 900,
    margin = {
      top: 20,
      right: 30,
      bottom: 40,
      left: 30,
    },
    heatmapColor = d3.interpolateRdPu,
  },
  data,
) {
  let svg = naiveHeatmap(...arguments);

  // A dict to indicate whether a cell is selected
  let isSelected = {};

  if (data.value.length === 0) {
    return svg;
  }

  const { x, y } = defineAxis({
    xDomain: [0, data.value[0].length],
    yDomain: [0, data.value.length],
    ...arguments[0],
  });

  const brushstart = () => {
    svg.node().focus();
  };

  const brushmove = doDebounce((event) => {
    const selection = event.selection;
    if (!selection) {
      svg.selectAll('.naives').attr('opacity', '1');
      return;
    }
    const [[x0, y0], [x1, y1]] = selection;
    svg.selectAll('.naives').each((d, i, g) => {
      const node = d3.select(g[i]);
      node.attr('opacity', '0.5');
      if (!node.attr('isCell')) {
        return;
      }
      const currentX = node.attr('x');
      const currentY = node.attr('cy');

      if (
        currentX >= x0 &&
        currentX <= x1 &&
        currentY >= y0 &&
        currentY <= y1
      ) {
        isSelected[`${currentX},${currentY}`] = true;
        node.attr('opacity', '1');
        // node.attr('filter', 'brightness(50%)');
      } else {
        if (isSelected[`${currentX},${currentY}`]) {
          node.attr('opacity', '0.5');
          //node.attr('filter', 'brightness(100%)');
          isSelected[`${currentX},${currentY}`] = false;
        }
      }
    });
  }, 50);

  const brushend = (event) => {
    const selection = event.selection;
    if (!selection) {
      svg.select('#day_up').text(`2017/5/1`);

      svg.select('#day_low').text(`-2017/10/31`);
      svg.select('#hour').text(`0-24`);
      svg.selectAll('.naives').attr('opacity', '1');
      return;
    }
    const [[x0, y0], [x1, y1]] = selection;

    // Convert pixel coordinates to data coordinates
    let xRange = [x.invert(x0), x.invert(x1)];
    let yRange = [y.invert(y0), y.invert(y1)];

    // Make sure xRange, yRange are non-negative integers
    xRange = xRange.map((d) =>
      clamp(Math.round(d), 0, data.value[0].length - 1),
    );
    yRange = yRange.map((d) => clamp(Math.round(d), 0, data.value.length - 1));
    let xRange_time = [];
    let Month_day = [31, 30, 31, 31, 30, 31];
    xRange.forEach((d) => {
      let m = 0;
      let days = d + 1;
      while (days > Month_day[m]) {
        days -= Month_day[m];
        m += 1;
      }
      xRange_time.push({
        month: m + 5,
        day: days,
      });
    });
    svg
      .select('#day_up')
      .text(`2017/${xRange_time[0].month}/${xRange_time[0].day}`);

    svg
      .select('#day_low')
      .text(`-2017/${xRange_time[1].month}/${xRange_time[1].day}`);
    svg.select('#hour').text(`${yRange[0]}-${yRange[1] + 1}`);
    setTimeRange(xRange, yRange);
  };
  let brush = d3
    .brush()
    .extent([
      [margin.top, 0],
      [width - margin.right, height - margin.bottom],
    ])
    .on('start', brushstart)
    .on('brush', brushmove)
    .on('end', brushend);

  svg.select('#heatmap').call(brush);

  return svg;
}
