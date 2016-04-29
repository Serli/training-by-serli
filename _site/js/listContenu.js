function twoDigit(n){
  return n > 9 ? "" + n: "0" + n;
}
function currentDate () {
  var date = new Date();
  var annee   = date.getFullYear();
  var mois    = date.getMonth() + 1;
  var jour    = date.getDate();
  return ""+annee+"-"+twoDigit(mois)+"-"+twoDigit(jour);
}
function comparedDate(ADate, BDate){
  if (ADate.localeCompare(BDate) == -1) {
    return "After";
  } else if (ADate.localeCompare(BDate) == 1) {
    return "Before";
  } else {
    return "Equal";
  }
}

var lastVisite = localStorage.getItem("lastVisite");
localStorage.setItem("lastVisite", currentDate());

var lastListRef = localStorage.getItem("lastListRef");
var actualListRef = "";
ListeContenuSite.forEach(function (element, index, array) {
  if (index != 0) {
    actualListRef += "\n";
  }
  actualListRef += element.ref + ":" + element.title;
});
localStorage.setItem("lastListRef", actualListRef);

lastListRef = lastListRef.split("\n");
lastListRef.forEach(function (element, index, array) {
  lastListRef[index] = element.split(":");
});

console.log(ListeContenuSite);

console.log(actualListRef);
console.log(lastListRef);

console.log(lastVisite);
console.log(currentDate());

// code in that file for Jekyll can fill with data
var app = angular.module('administration', []);

app .config(['$interpolateProvider', function ($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
}]);

app.controller('ListContenu', function($scope) {
  $scope.research = {
    title: "",
    news: false
  };
  $scope.trainings = ListeContenuSite;
  $scope.trainings.forEach(function (element, index, array) {
    if (element.myDate.localeCompare(lastVisite) == -1) {
      console.log("Old");
      $scope.trainings[index].myClass = "Old";
    } else {
      var existRef = false;
      lastListRef.forEach(function (lastListRefelement, lastListRefindex, lastListRefarray) {
        existRef = existRef || lastListRefelement[0] == element.ref;
      });
      if (existRef) {
        console.log("Maj");
        $scope.trainings[index].myClass = "Maj";
      } else {
        console.log("Add");
        $scope.trainings[index].myClass = "Add";
      }
    }
  });
  lastListRef.forEach(function (element, index, array) {
    var existRef = false;
    $scope.trainings.forEach(function (trainingselement, trainingsindex, trainingsarray) {
      existRef = existRef || element[0]==trainingselement.ref
    });
    if (!existRef) {
      $scope.trainings = [{
        myClass: "Remove",
        myDate: "",
        date: "",
        href: "",
        title: element[1],
        public: "",
        costs: "",
        costsdescription: "",
        duration: "",
        durationdescription: "",
        ref: element[0],
        subject:[],
        program: [],
        presentation: ""
      }].concat($scope.trainings);
    }
  });
});
