let cities;

// SCATTER PLOT

d3.csv('cities.csv', d3.autoType).then(data => {
    cities = data
    filtered = cities.filter(city => city.eu)
    console.log('cities', filtered)

    d3.select('.city-count').text("Number of cities: " + filtered.length)

    const scatter_width = 700;
    const scatter_height = 550;
    
    const svg = d3.select('.population-plot')
        .append('svg')
        .attr('width', scatter_width)
        .attr('height', scatter_height)

    const circles = svg.selectAll('.circle')
        .data(filtered)
        .enter()
        .append('circle')
        .attr('cx', (d, i) => d.x)
        .attr('cy', (d, i) => d.y)
        .attr('r', (d, i) => {
            if (d.population < 1000000) {
                return 4
            }
            else {
                return 8
            }
        })
        .attr('fill', 'blue')

    const labels = svg.selectAll('.text')
    .data(filtered.filter(city => city.population >= 1000000))
    .enter()
    .append('text')
    .attr('x', (d, i) => d.x)
    .attr('y', (d, i) => d.y)
    .attr('dy', -12)
    .attr('text-anchor', 'middle')
    .attr('font-size', '11px')
    .text(d => d.country)
});

// BAR CHART

let buildings;

d3.csv('buildings.csv', d3.autoType).then(data => {
    buildings = data
    sorted = buildings.sort((a, b) => b.height_ft - a.height_ft)
    console.log('buildings', sorted)

    // Set initial values
    d3.select('.image').attr('src', 'img/1.jpg')
    d3.select('.building-name').text(sorted[0].building)
    d3.select('.height').text(sorted[0].height_ft)
    d3.select('.city').text(sorted[0].city)
    d3.select('.country').text(sorted[0].country)
    d3.select('.floors').text(sorted[0].floors)
    d3.select('.completed').text(sorted[0].completed)

    const bar_width = 500;
    const bar_height = 500;

    const svg = d3.select('.building-chart')
        .append('svg')
        .attr('width', bar_width)
        .attr('height', bar_height)

    const bars = svg.selectAll('.bar')
        .data(sorted)
        .enter()
        .append('rect')
        .attr('width', d => d.height_px)
        .attr('height', 30)
        .attr('x', 180)
        .attr('y', (d, i) => i * 35)
        .attr('fill', 'orange')
        .on('click', (event, d) => {
            d3.select('.image').attr('src', 'img/' + (sorted.indexOf(d) + 1).toString() + '.jpg')
            d3.select('.building-name').text(d.building)
            d3.select('.height').text(d.height_ft)
            d3.select('.city').text(d.city)
            d3.select('.country').text(d.country)
            d3.select('.floors').text(d.floors)
            d3.select('.completed').text(d.completed)
        })

    const building_names = svg.selectAll('.text1')
        .data(sorted)
        .enter()
        .append('text')
        .attr('x', 0)
        .attr('y', (d, i) => i * 35 + 20)
        .attr('text-anchor', 'start')
        .attr('font-size', 11.5)
        .text(d => d.building)

    const building_heights = svg.selectAll('.text2')
        .data(sorted)
        .enter()
        .append('text')
        .attr('x', d => d.height_px + 180)
        .attr('y', (d, i) => i * 35 + 11)
        .attr('text-anchor', 'end')
        .attr('alignment-baseline', 'hanging')
        .attr('fill', 'white')
        .attr('font-size', 12)
        .attr('dx', -10)
        .text(d => d.height_ft + ' ft')
})