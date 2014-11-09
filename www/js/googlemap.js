


var directionDisplay,
	directionsService = new google.maps.DirectionsService(),
	map;

function initialiseA() 
{
	directionsDisplay = new google.maps.DirectionsRenderer();
	var mapCenter = new google.maps.LatLng(53.340617, -6.255244);

	var myOptions = {
		zoom:10,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		center: mapCenter
	}

	map = new google.maps.Map(document.getElementById("Archmap"), myOptions);
	directionsDisplay.setMap(map);
	directionsDisplay.setPanel(document.getElementById("ArchDirections"));  
}
					   
function calculateRouteArch() 
{
	var selectedMode = $("#mode").val(),
		start = $("#from").val(),
		end = $("#to").val();

	if(start == '' || end == '')
	{
		// cannot calculate route
		$("#ArchResults").hide();
		return;
	}
	else
	{
		var request = {
			origin:start, 
			destination:end,
			travelMode: google.maps.DirectionsTravelMode[selectedMode]
		};

		directionsService.route(request, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				directionsDisplay.setDirections(response); 
				$("#ArchResults").show();
				/*
					var myRoute = response.routes[0].legs[0];
					for (var i = 0; i < myRoute.steps.length; i++) {
						alert(myRoute.steps[i].instructions);
					}
				*/
			}
			else {
				$("#ArchResults").hide();
			}
		});

	}
}