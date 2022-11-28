import * as d3 from 'd3';
import { xAxis, yAxis } from '@/composables/d3/decoration/axis';
import { naiveGrid } from '@/composables/d3/decoration/grid';

export function naiveHeatmap(
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
  if (data.value.length === 0) {
    return d3.create('svg');
  }
  const color = d3.scaleSequentialPow(
    [0, data.value.length ? d3.max(d3.max(data.value)) : 0],
    heatmapColor,
  );

  const x = d3
    .scaleLinear()
    .domain([0, data.value[0].length])
    .nice()
    .rangeRound([margin.left, width - margin.right]);

  const y = d3
    .scaleLinear()
    .domain([0, data.value.length])
    .nice()
    .rangeRound([margin.top, height - margin.bottom]);

  const svg = d3
    .create('svg')
    .attr('viewBox', [0, 0, width, height])
    .attr('width', width)
    .attr('height', height);

  svg
    .append('g')
    .selectAll('g')
    .data(data.value)
    .join('g')
    .attr('transform', (d, i) => {
      return `translate(0,${y(1) + (y(2) - y(1)) * i})`;
    })
    .selectAll('rect')
    .data((d) => d)
    .join('rect')
    .attr('x', (d, i) => {
      return x(1) + (x(2) - x(1)) * i;
    })
    .attr('width', (d, i) => x(2) - x(1) - 1)
    .attr('height', (d, i) => y(2) - y(1) - 1)
    .attr('fill', (d) => color(d));

  return svg;
}
