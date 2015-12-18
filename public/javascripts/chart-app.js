 app = angular.module('simple-chart', []);
google.load("visualization", "1", {packages:["corechart"]});

app.controller('MainController', ['$scope', '$http',  function($scope, $http) {
  $http.get('/data').success(function(data){
    
  var dataArray = formatDataForView(data);

  var table = google.visualization.arrayToDataTable(dataArray, false);
  var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));

  
  var options = {
    title:'Sale Performance over Years ',
    //subtitle: 'League of Legends World Championship vs Dota2 The International',
    //chart: {title:'eSports Prize Pools',
    //subtitle: 'League of Legends World Championship vs Dota2 The International '},
    series:{
      0:{color:'#000066'},
      1:{color: '#990000'}
    },

    width: 900,
    hAxis: {
      title: 'Year',
      titleTextStyle: {
        
        italic: false,
        bold: true,
      },
      format: '',
      gridlines: {count: 5},
    },
    
    
    
    vAxis: {
      title: 'In Billions',
      titleTextStyle:{
        bold: true,
        italic: true,
      },
      textStyle: {
        color: 'green'
        
      },
     format: 'currency',
      gridlines: {count: 11},
      
    }
    
      

  };
  chart.draw(table, options);
  

  });
}]);

function formatDataForView(data) {
  
    var dataArray = [], keysArray = [];
    
    //get the keys
    for(var prop in data[0]) {
      keysArray.push(prop);
    }
    
    dataArray.push(keysArray);
    
    //get the values
    data.forEach(function(value){
        var dataEntry = [];
        for(var prop in value) {
          dataEntry.push(parseInt(value[prop], 0));
        }
        dataArray.push(dataEntry);
    });
  
    return dataArray;

}