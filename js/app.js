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
    $scope.mySubject = $scope.mySubject.concat([{name:''}]);
  };
  $scope.removeSubject = function (n) {
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
          textTraining = textTraining + "\'" + element.name + "\'";
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
      if (contenuTraining != "") {
        textTraining = textTraining + "presentation: '" + contenuTraining + "'\n";
      }
      textTraining = textTraining + "---";
      if (contenuTraining != "") {
        textTraining = textTraining + contenuTraining;
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
  $scope.setFile = function(element) {
    $scope.$apply(
      function($scope) {
        $scope.myFile = element.files[0];
        var fr = new FileReader();
        fr.onerror = function() {
            console.log('Oups, une erreur s\'est produite...');
        };
        fr.onload = function() {
          $scope.$apply(
            function() {
              var fileBody = fr.result;

              function valueSingleLineFields (fields, text) {
                if (fields.length<1) {
                  console.log("fields vide");
                  return "";
                }
                var searchString = '\n';
                var preIndex = text.indexOf(fields);
                if (preIndex === -1) {
                  console.log("fields inconnu : "+fields);
                  return "";
                }
                preIndex = preIndex + fields.length;
                var postIndex = text.substring(preIndex).indexOf(searchString);
                if (postIndex === -1) {
                  console.log("aucun retour à la ligne");
                  return "";
                }
                postIndex = preIndex + postIndex;
                return text.substring(preIndex, postIndex).replace(/[\n\r]/g, '').trim();
              }

              function valueArrayFields (fields, text) {
                var preIndex = text.indexOf(fields);
                if (preIndex === -1) {
                  return [];
                }
                preIndex = preIndex + fields.length;

                var postIndex = text.substring(preIndex).indexOf("]");
                if (postIndex === -1) {
                  console.log("aucune fin de tableau");
                  return [];
                }
                postIndex = preIndex + postIndex;


                var newPreIndex = text.substring(preIndex, postIndex).indexOf("[");
                if (newPreIndex === -1) {
                  console.log("aucun début de tableau");
                  return [];
                }
                preIndex = preIndex + newPreIndex + "[".length;

                var listSubject = text.substring(preIndex, postIndex).replace(/[\n\r]/g, ' ').trim();
                var result = [];
                listSubject.split("'").forEach(function (element, index, array) {
                  if (element.replace(/[\n\r'" ,]/g, '') !== '') {
                    result.push({name: element.replace(/[\n\r'"]/g, '').trim()});
                  }
                });
                return result;
              }

              function valueProgramFields (text) {
                var preIndex = text.indexOf("program: ");
                if (preIndex === -1) {
                  return [];
                }
                preIndex = preIndex + "program: ".length;

                var postIndex = text.substring(preIndex).indexOf("---");
                if (postIndex === -1) {
                  return [];
                }
                postIndex = preIndex + postIndex;


                var newPreIndex = text.substring(preIndex, postIndex).indexOf("[");
                if (newPreIndex === -1) {
                  return [];
                }
                preIndex = preIndex + newPreIndex + "[".length;

                var newPostIndex = text.substring(preIndex, postIndex).lastIndexOf("]");
                if (newPostIndex === -1) {
                  return [];
                }
                postIndex = preIndex + newPostIndex;

                var listProgram = text.substring(preIndex, postIndex).trim();
                var result = [];

                var newListProgram = [];
                listProgram.split("{").forEach(function (element, index, array) {
                  element.split("}").forEach(function (elementelement, elementindex, elementarray) {
                    if (elementelement.replace(/[\n\r,]/g, '').trim().length>0) {
                      newListProgram.push(elementelement.trim());
                    }
                  });
                });
                listProgram = newListProgram;

                listProgram.forEach(function (element, index, array) {
                  var titleProgram = valueSingleLineFields("title: ", element).replace(/[\n\r,']/g, '');
                  var activityProgram = valueArrayFields("activity: ", element);
                  result.push({title: titleProgram, activity: activityProgram});
                });
                return result;
              }

              $scope.myTitle = valueSingleLineFields("title: ", fileBody);
              $scope.myRef =  valueSingleLineFields("ref: ", fileBody);
              $scope.myCategorie =  valueSingleLineFields("categories: ", fileBody);
              $scope.myPublic =  valueSingleLineFields("public: ", fileBody);
              $scope.myCost =  valueSingleLineFields("costs: ", fileBody);
              $scope.myCostDescription =  valueSingleLineFields("costs-description: ", fileBody);
              $scope.myDuration =  valueSingleLineFields("duration: ", fileBody);
              $scope.myDurationDescription =  valueSingleLineFields("duration-description: ", fileBody);
              $scope.myName = $scope.myFile.name.substring(0, $scope.myFile.name.indexOf('.md')).trim();

              if (fileBody.indexOf("### Présentation\n\n") !== -1) {
                $scope.myContenu = fileBody.substring(
                  fileBody.indexOf("### Présentation\n\n")+"### Présentation\n\n".length,
                  fileBody.length-1).trim();
              } else {
                $scope.myContenu = "";
              }

              if (fileBody.indexOf("presentation: '") !== -1) {
                $scope.myContenu = fileBody.substring(
                  fileBody.indexOf("presentation: '")+"presentation: '".length,
                  fileBody.indexOf("'\n---")).trim();
              } else {
                $scope.myContenu = "";
              }

              $scope.mySubject = valueArrayFields("subject: ", fileBody);
              $scope.myProgram = valueProgramFields(fileBody);
            }
          );
        }
        fr.readAsText($scope.myFile);
      }
    );
  };
}]);

app.directive('focus', function() {
  return {
    link: function(scope, element, attrs) {
      element[0].focus();
    }
  };
});
