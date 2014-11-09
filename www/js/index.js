'use strict';

if (typeof require !== 'undefined') {
  var contentful = require('../../index');
}

var client = contentful.createClient({
  space: 'nwjz2y8ebkoe',
  accessToken: 'dd2116b448283861435cd960098cf0848ebcd98209884f390973e5437d9999e3'
});

var App = angular.module('nmi', []);

App.controller('DemoCtrl', DemoCtrl);

function DemoCtrl($scope, $q, $filter) {
  $scope.space = $q.when(client.space());

  $scope.contentTypes = $q.when(client.contentTypes());

  $scope.contentTypes.then(function(types) {{
    if (!types || !types.length) return;
    $scope.contentType = types[0];
  }});

  $scope.$watch('contentType', function(contentType) {
    if (!contentType) return;
    $scope.entries = $q.when(client.entries({
      //order: '-sys.createdAt',
	  
      content_type: contentType.sys.id,
	  //'sys.id[ne]': '4h4IBDIuwEsgSY2yKaoeOK'
	 //'sys.updatedAt[gte]': '2014-02-24T00:00:00Z'
		
		//query: 'Lecture'
		//content_type: 'LMDk78py4EcgUSokKEqio',
		'fields.audience': 'family',
		'fields.museum': 'Natural History'
		//order: 'fields.StartDate'
    }));
	$scope.allEvents = $q.when(client.entries({
      content_type: 'LMDk78py4EcgUSokKEqio'
    }));
	$scope.archEvents = $q.when(client.entries({
      content_type: 'LMDk78py4EcgUSokKEqio',
	  'fields.museum': 'Archaeology'
    }));
	$scope.decEvents = $q.when(client.entries({
      content_type: 'LMDk78py4EcgUSokKEqio',
	  'fields.museum': 'Decorative Arts & History'
    }));
	$scope.clEvents = $q.when(client.entries({
      content_type: 'LMDk78py4EcgUSokKEqio',
	  'fields.museum': 'Country Life'
    }));
	$scope.nhEvents = $q.when(client.entries({
      content_type: 'LMDk78py4EcgUSokKEqio',
	  'fields.museum': 'Natural History'
    }));
	$scope.clPermExhib = $q.when(client.entries({
      content_type: '2pjzxkVZR26sYgomOO2WaC',
	  'fields.museum': 'Country Life',
	  'fields.type':'Permanent'
    }));
	$scope.clTempExhib = $q.when(client.entries({
      content_type: '2pjzxkVZR26sYgomOO2WaC',
	  'fields.museum': 'Country Life',
	  'fields.type':'Temporary'
    }));
	
  });
  
  /*
  $scope.dateOfEvents = $q.when(client.entries({
      content_type: 'LMDk78py4EcgUSokKEqio',
	  //'sys.updatedAt[gte]': '2014-02-27T00:00:00Z'
		//'fields.startDate': '2014-03-04',
		'fields.startDate[gte]': '2014-03-04',
		'fields.startDate[lte]': '2014-03-04',
    }));*/
	
	$scope.$watch('searchDate', function (searchDate) {
		if (!searchDate) return;
         $scope.dateOfEvents = $q.when(client.entries({
			content_type: 'LMDk78py4EcgUSokKEqio',
			//'fields.startDate[gte]': '2014-03-04',
			//'fields.endDate[lte]': '2014-03-04',
			'fields.startDate[lte]': $scope.searchDate,
			'fields.endDate[gte]': $scope.searchDate
		}));
    });
  
  $scope.$watch('searchText', function (searchText) {
		if (!searchText) return;
        $scope.searchedEvents = $q.when(client.entries({
			content_type: 'LMDk78py4EcgUSokKEqio',
			query: $scope.searchText
		}));
    });
	
	
	$scope.expand = function(entry) {
		entry.show = !entry.show
	}
	
	$scope.types = {adults: true, children:true, family:true, post:true, prim:true};
			
	$scope.search=[];
	
	
}

App.filter('myfilter', function() {
   return function( items, types) {
   
    var filtered = [];
    
    angular.forEach(items, function(item) {
       
		 if(types.family == true && item.fields.audience == "Family"){
			filtered.push(item);
		}
		else if(types.children== true && item.fields.audience == "Children"){
			filtered.push(item);
		}
		else if(types.adults== true && item.fields.audience == "Adults"){
			filtered.push(item);
		}
		
    });
  
    return filtered;
  };
});




App.directive('myDatepicker', function() {
    return function(scope, element, attrs) {     

		element.datepicker({
			beforeShowDay: noMonday,
			dateFormat : 'yy-mm-dd', 
			dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                onSelect: function(dateText, inst) {                     
                    var mdlAttr = $(this).attr('ng-model');
                    scope[attrs.ngModel] = dateText;                    
                    scope.$apply();                                                   
                }                
        });

    }
  });
  
  function noMonday(date){
          var day = date.getDay();
                      return [(day != 1), ''];
  }; 