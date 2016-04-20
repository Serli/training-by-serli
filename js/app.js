function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

var app = angular.module('administration', []);

app .config(['$interpolateProvider', function ($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
}]);

app.controller('formulaireCategory', function($scope) {
  $scope.myTitle = "";
  $scope.setFile = function(element) {
        $scope.$apply(function($scope) {
            $scope.myImage = element.files[0];
        });
    };
  $scope.downloadCategory = function () {
    if ($scope.isValide()) {
      var layoutCategory = "sommaire";
      var titleCategory = $scope.myTitle;
      var nodeCategory = titleCategory.replace(/[^a-zA-Z0-9]/g, '');
      var permalinkCategory = "/" + nodeCategory + ".html";
      var imageCategory = $scope.myImage.name;

      var textCategory =
      "---" + "\n" +
      "layout: " + layoutCategory + "\n" +
      "title: " + titleCategory + "\n" +
      "permalink: " + permalinkCategory + "\n" +
      "node: " + nodeCategory + "\n" +
      "image: /assets/TrainingsCategories/WhiteIcon/" + imageCategory + "\n" +
      "---";
      var nameFileCategory = nodeCategory + ".md";
      download(nameFileCategory, textCategory);
    }
  };
  $scope.isValide = function () {
    return ($scope.myTitle!=='' && $scope.myImage!==undefined);
  };
});

app.controller('formulaireTraining', ['$scope', function($scope) {
  $scope.myTitle = "";
  $scope.myRef = "";
  $scope.myCategorie = "";
  $scope.myPublic = "";
  $scope.myCost = "";
  $scope.myCostDescription = "";
  $scope.myDuration = "";
  $scope.myDurationDescription = "";
  $scope.myName = "";
  $scope.mySubject = [];
  $scope.myProgram = [];
  $scope.myContenu = "";
  $scope.addSubject = function () {
    $scope.mySubject = $scope.mySubject.concat([{subject:''}]);
  };
  $scope.removeSubject = function (n) {
    console.log(n);
    $scope.mySubject.splice(n,1);
  };
  $scope.addProgram = function () {
    $scope.myProgram = $scope.myProgram.concat([{title: '',activity: []}]);
  };
  $scope.removeProgram = function (n) {
    $scope.myProgram.splice(n,1);
  };
  $scope.addActivity = function (n) {
    $scope.myProgram[n].activity = $scope.myProgram[n].activity.concat([{name: ''}]);
  };
  $scope.removeActivity = function (nProgram, nActivity) {
    $scope.myProgram[nProgram].activity.splice(nActivity,1);
  };
  $scope.downloadTraining = function () {
    if ($scope.isValide()) {
      var layoutTraining = "training";
      var titleTraining = $scope.myTitle;
      var refTraining = $scope.myRef;
      var categorieTraining = $scope.myCategorie;
      var permalinkTraining = "/" + categorieTraining + "/" + refTraining;
      var publicTraining = $scope.myPublic;
      var costsTraining = $scope.myCost;
      var costsDescriptionTraining = $scope.myCostDescription;
      var durationTraining = $scope.myDuration;
      var durationDescriptionTraining = $scope.myDurationDescription;
      var nameTraining = $scope.myName;
      var subjectTraining = $scope.mySubject;
      var programTraining = $scope.myProgram;
      var contenuTraining = $scope.myContenu;

      var textTraining =
      "---" + "\n" +
      "layout: " + layoutTraining + "\n" +
      "title: " + titleTraining + "\n" +
      "permalink: " + permalinkTraining + "\n" +
      "categories: " + categorieTraining + "\n" +
      "public: " + publicTraining + "\n" +
      "costs: " + costsTraining + "\n" +
      "costs-description: " + costsDescriptionTraining + "\n" +
      "duration: " + durationTraining + "\n" +
      "duration-description: " + durationDescriptionTraining + "\n" +
      "ref: " + refTraining + "\n" +
      "subject: [\n";
      subjectTraining.forEach(
        function (element, index, array) {
          if(index!=0) {
            textTraining = textTraining + ",\n";
          }
          textTraining = textTraining + "\'" + element.subject + "\'";
        }
      );
      textTraining = textTraining + "\n]\n";
      if (programTraining.length>0) {
        textTraining = textTraining + "program: [\n";
        programTraining.forEach(
          function (element, index, array) {
            if(index!=0) {
              textTraining = textTraining + ",\n";
            }
            textTraining = textTraining + " {\n  title: \'" + element.title + "\',\n  activity: [\n";
            element.activity.forEach(
              function (activityelement, activityindex, activityarray) {
                if(activityindex!=0) {
                  textTraining = textTraining + ",\n";
                }
                textTraining = textTraining + "   \'" + activityelement.name + "\'";
              }
            );
            textTraining = textTraining + "\n  ]\n }\n";
          }
        );
        textTraining = textTraining + "]\n";
      }
      textTraining = textTraining + "---\n\n";
      if (contenuTraining != "") {
        textTraining = textTraining + "### Présentation\n\n" + contenuTraining.replace('\n','  \n');
      }
      var nameFileTraining = nameTraining!=='' ? nameTraining + ".md" : "undefine.md";
      download(nameFileTraining, textTraining);
    }
  };
  $scope.isValide = function () {
    var result = $scope.myTitle!=='';
    result = result && $scope.myRef!=='';
    result = result && $scope.myCategorie!=='';
    result = result && $scope.myPublic!=='';
    result = result && $scope.myCost!=='';
    result = result && $scope.myDuration!=='';
    $scope.mySubject.forEach(
      function (element, index, array) {
        result = result && element.subject!=='';
      }
    );
    $scope.myProgram.forEach(
      function (element, index, array) {
        result = result && element.title!=='';
        element.activity.forEach(
          function (activityelement, activityindex, activityarray) {
            result = result && activityelement.name!=='';
          }
        );
      }
    );
    return result;
  };
}]);
