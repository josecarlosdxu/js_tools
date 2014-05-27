$(function() {



  uiBack.init();
  toolbarLanguages.init();
  mainNavBack.init();

  selectGroup.init();







  if($('#myfirstchart').length === 0) {

  	console.log('escape falsy / no se encuentra el chart "myfirstchart" ➜ traza desde main_back.js');

  	return false;
  }




new Morris.Bar({
  // ID of the element in which to draw the chart.
  element: 'myfirstchart',
  // Chart data records -- each entry in this array corresponds to a point on
  // the chart.
  data: [
    { month: 'Enero',       euro: 4250 },
    { month: 'Feb.',     euro: 3150 },
    { month: 'Marzo',       euro: 2350 },
    { month: 'Abril',       euro: 4540 },
    { month: 'Mayo',        euro: 2980 },
    { month: 'Junio',       euro: 1450 },
    { month: 'Julio',       euro: 5950 },
    { month: 'Agosto',      euro: 950 },
    { month: 'Sept.',  euro: 1250 },
    { month: 'Oct.',     euro: 5150 },
    { month: 'Nov.',   euro: 2350 },
    { month: 'Dic.',   euro: 6230 }
  ],
  // The name of the data record attribute that contains x-values.
  xkey: ['month'],
  // A list of names of data record attributes that contain y-values.
  ykeys: ['euro'],
  // Labels for the ykeys -- will be displayed when you hover over the
  // chart.
  labels: ['importe en €']
});

Morris.Donut({
  element: 'myfirstchart2',
  data: [
    {label: "PayPal", value: 8500},
    {label: "Transferencia", value: 6500},
    {label: "Credit Card", value: 2150}
  ],
  formatter: function (y, data) { return y + '€' }
});


















});
