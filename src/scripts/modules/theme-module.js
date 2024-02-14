AppName.Modules.ThemeModule = (function () {
  //Dependencies
  var core = AppName.Core;

  //////////////////////
  // Private Methods //
  ////////////////////
  const _blockLinksSlider = () => {
    var itemsCount = $('.external-link .item').length
    if (itemsCount > 12) {
      $('.external-link').removeClass('grid-style');
      $('.external-link').slick({
        rows: 2,
        dots: true,
        arrows: false,
        speed: 300,
        slidesToShow: 6,
        slidesToScroll: 6,
        responsive: [
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            }
          }
        ]
      });
    }
  };

  var _programSlider = function() {
    $('.slider-wrapper').slick({
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      variableWidth: true,
      responsive: [{
          breakpoint: 767,
          settings: {
            variableWidth: false,
          }
        }]
    });
  }

  var _salaryBands = function() {
    
    $('.roles').each(function() {
      $(this).click(function() {
        var tableId = $(this).attr('id');

        $('.table-description').addClass('hide');
        $('.table-description').removeClass('show');
        $('.' + tableId).addClass('show');

      })


    });
  }
  
  var _clock = function() {
	  function startTime() {
		  var today = new Date();
		  var options = { timeZone: 'Australia/Sydney' }; 
		  today = new Date(today.toLocaleString('en-US', options));

		  var hr = today.getHours();
		  var min = today.getMinutes();
		  var sec = today.getSeconds();
		  ap = (hr < 12) ? "<span>AM</span>" : "<span>PM</span>";
		  hr = (hr == 0) ? 12 : hr;
		  hr = (hr > 12) ? hr - 12 : hr;
		  // Add a zero in front of numbers < 10
		  hr = checkTime(hr);
		  min = checkTime(min);
		  sec = checkTime(sec);
// 		  document.getElementById("clock").innerHTML = hr + ":" + min + ":" + sec + " " + ap;
		  $('.clock').each(function() {
			  $(this).html(hr + ":" + min);
		  });
		  
		  $('.ap').each(function() {
			  $(this).html(ap);
		  });
		  

		  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		  var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		  var curWeekDay = days[today.getDay()];
		  var curDay = today.getDate();
		  var curMonth = months[today.getMonth()];
		  var curYear = today.getFullYear();
		  var date = curWeekDay + ", " + curDay + " " + curMonth + " " + curYear;
// 		  document.getElementById("date").innerHTML = date;
		  
		  $('.date').each(function() {
			  $(this).html(date);
		  });

		  var time = setTimeout(function() { startTime() }, 500);
	  }

	  function checkTime(i) {
		  if (i < 10) {
			  i = "0" + i;
		  }
		  return i;
	  }
	  startTime();
  }
  
  var _weatherUpdate = function () {
	  const apiKey = "4d8fb5b93d4af21d66a2948710284366";
	  const url = `https://api.openweathermap.org/data/2.5/weather?q=sydney&appid=${apiKey}&units=metric`;

	  fetch(url)
		.then(response => response.json())
		.then(data => {
		  const { main, name, sys, weather } = data;
		  
		   $('.weather-track .temperature').each(function() {
			  $(this).html(Math.round(main.temp) + '&deg;C');
		  });
		  
		  $('.weather-track .location span').each(function() {
			  $(this).html(name);
		  });
		  
		  $('.weather-track .status').each(function() {
			  $(this).html(weather[0]["description"]);
		  });
		  
		  $('.weather-track .high-temp').each(function() {
			  $(this).html('High '+ Math.round(main.temp_max) +'&deg;C');
		  });
		  
		  $('.weather-track .low-temp').each(function() {
			  $(this).html('Low '+ Math.round(main.temp_min) +'&deg;C');
		  });
		  
		})
		.catch(() => {
		  console.log("INVALID API CALL");
		});
  }
  
   var _stockPrice = function () {
	   
	   const apiKey = "6582c359c1d7d4.26171077";
	   const url = `https://eodhd.com/api/eod/IGN.AU?api_token=${apiKey}&fmt=json`;
	   
	   fetch(url)
		.then(response => response.json())
		.then(data => {
		   console.log(data)
		   
		   const lastItem = data[data.length - 1];
		   const inputDate = new Date(lastItem.date);
			const options = { day: 'numeric', month: 'long', year: 'numeric' };
			const formattedDate = inputDate.toLocaleDateString('en-GB', options);

		   console.log(lastItem)
		   
		   $('.stock-track .number').each(function() {
			  $(this).html(lastItem.close);
		   });
		   
		   $('.stock-date span').each(function() {
			  $(this).html(formattedDate);
		   });
		   
		   $('.difference').each(function() {
			  var priceDif = lastItem.close - lastItem.open;
			  var priceRounded = Number(priceDif.toFixed(3))
			  $(this).html(priceRounded);
		   });
		   
		   $('.percentage').each(function() {
			  var percentageChange = ((lastItem.close - lastItem.open) / lastItem.open) * 100;
			  $(this).html(percentageChange.toFixed(2) + '%');
			   
			   if (lastItem.open > lastItem.close){
				   $('.stock-track .ticker').addClass('dumping');
			   } else {
				   $('.stock-track .ticker').addClass('pumping');
			   }
		   });

	   }).catch(() => {
		   console.log("INVALID API CALL");
	   });
   }

  /////////////////////
  // Public Methods //
  ///////////////////
  const init = function () {
    _blockLinksSlider();
    _programSlider();
    _salaryBands();
	_clock();
	_weatherUpdate();
	_stockPrice();
  };

  return {
    init: init,
  };
})();
