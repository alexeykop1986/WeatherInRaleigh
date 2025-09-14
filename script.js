// Raleigh Coordinates
let latitude = 35.7796;
let longitude = -78.6382;

// Daily
document.getElementById('btn-daily').addEventListener('click', function () {
  let url = 'https://api.open-meteo.com/v1/forecast'
          + '?latitude=' + latitude
          + '&longitude=' + longitude
          + '&timezone=America/New_York'
          + '&daily=temperature_2m_max,temperature_2m_min,precipitation_sum'
          + '&forecast_days=16';

  fetch(url)
    .then(function (res) { return res.json(); })
    .then(function (data) {
      let d = data.daily;
      let html = '<table><tr><th>Date</th><th>Max (°C)</th><th>Min (°C)</th><th>Precip (mm)</th></tr>';
      for (let i = 0; i < d.time.length; i++) {
        html += '<tr>'
          + '<td>' + d.time[i] + '</td>'
          + '<td>' + d.temperature_2m_max[i] + '</td>'
          + '<td>' + d.temperature_2m_min[i] + '</td>'
          + '<td>' + (d.precipitation_sum[i] || 0) + '</td>'
          + '</tr>';
      }
      html += '</table>';
      document.getElementById('output').innerHTML = html;
    })
    .catch(function (err) {
      document.getElementById('output').textContent = 'Error: ' + err;
    });
});

// Hourly
document.getElementById('btn-hourly').addEventListener('click', function () {
  let url = 'https://api.open-meteo.com/v1/forecast'
          + '?latitude=' + latitude
          + '&longitude=' + longitude
          + '&timezone=America/New_York'
          + '&hourly=temperature_2m,precipitation_probability';

  fetch(url)
    .then(function (res) { return res.json(); })
    .then(function (data) {
      let h = data.hourly;
      let html = '<table><tr><th>Time</th><th>Temp (°C)</th><th>Precip (%)</th></tr>';
      
      let now = new Date();
      let num = 1;
      let i = 0;
      while (num <=24 && i < h.time.length) {
          let t = new Date(h.time[i]);
          if (t>=now) {
              num++;
              html += '<tr>'
              + '<td>' + h.time[i].replace("T", " ") + '</td>'
              + '<td>' + h.temperature_2m[i] + '</td>'
              + '<td>' + (h.precipitation_probability[i] || 0) + '</td>'
              + '</tr>';
          }
          i++;
      }
      html += '</table>';
      document.getElementById('output').innerHTML = html;
    })
    .catch(function (err) {
      document.getElementById('output').textContent = 'Error: ' + err;
    });
});


// Historical

let now = new Date();

let yearAgo = new Date(now);
yearAgo.setFullYear(now.getFullYear() - 1);

let elevenMonthsAgo = new Date(now);
elevenMonthsAgo.setMonth(now.getMonth() - 11);

let start = yearAgo.toISOString().slice(0, 10);
let end   = elevenMonthsAgo.toISOString().slice(0, 10);

document.getElementById('btn-historical').addEventListener('click', function () {
  let url = 'https://historical-forecast-api.open-meteo.com/v1/forecast'
            + '?latitude=' + latitude
            + '&longitude=' + longitude
            + '&start_date=' + start
            + '&end_date=' + end
            + '&timezone=America/New_York'
            + '&daily=temperature_2m_max,temperature_2m_min,precipitation_sum';

  fetch(url)
    .then(function (res) { return res.json(); })
    .then(function (data) {
      let d = data.daily;
      let html = '<table><tr><th>Date</th><th>Max (°C)</th><th>Min (°C)</th><th>Precip (mm)</th></tr>';
      for (let i = 0; i < d.time.length; i++) {
        html += '<tr>'
          + '<td>' + d.time[i] + '</td>'
          + '<td>' + d.temperature_2m_max[i] + '</td>'
          + '<td>' + d.temperature_2m_min[i] + '</td>'
          + '<td>' + (d.precipitation_sum[i] || 0) + '</td>'
          + '</tr>';
      }
      html += '</table>';
      document.getElementById('output').innerHTML = html;
    })
    .catch(function (err) {
      document.getElementById('output').textContent = 'Error: ' + err;
    });
});

// Show daily wi
document.getElementById('btn-daily').click();