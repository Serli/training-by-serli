---
layout: administration
permalink: /administration/ListeContenu.html
---

<div ng-app="administration" ng-controller="ListContenu">
  <input type="text" ng-model="research.title" placeholder="Search...">
  <div>
    <ul>
        <li ng-repeat="n in (trainings|filter:research)">
          <!-- /// training //////////////////////////////////////////////// -->
          <h2>[[n.title]]</h2>
          <ul>
            <li>[[n.public]]</li>
            <li>[[n.costs]] [[n.costsdescription]]</li>
            <li>[[n.duration]] [[n.durationdescription]]</li>
            <li>[[n.ref]]</li>
            <li>SUJETS :</li>
            <ul>
              <li ng-repeat="s in n.subject">[[s]]</li>
            </ul>
            <li>PROGRAMME :</li>
            <ul>
              <li ng-repeat="p in n.program">
                [[p.name]]
                <ul>
                  <li ng-repeat="a in p.activity">[[a]]</li>
                </ul>
              </li>
            </ul>
            <li>PRÉSENTATION :</li>
            <li>[[n.presentation]]</li>
          </ul>
          <!-- ///////////////////////////////////////////////////////////// -->
        </li>
    </ul>
  </div>

  <p>
    <a href="{{ '/administration/errorFormat.html' | prepend: site.baseurl }}">Test le format des fichiers Markdown (.md)</a>
    <br/>
    <br/>
    <a href="{{ '/administration/formulaireData.html' | prepend: site.baseurl }}">Générateur de fichier Markdown (.md)</a>
    <br/>
    <br/>
    <a href="{{ site.url }}/{{ site.baseurl }}">Page d'accueil</a>
  </p>

</div>

<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular.min.js"></script>
<script>
  // code in that file for Jekyll can fill with data
  var app = angular.module('administration', []);

  app .config(['$interpolateProvider', function ($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
  }]);

  app.controller('ListContenu', function($scope) {
    $scope.research = {
      title: ""
    };
    $scope.trainings = [
      {% for training in site.pages %} {% if training.layout == 'training' %} {% if training.title %}
        {
          href: "{{ training.url | prepend: site.baseurl }}",
          title: "{% if training.title %}{{training.title}}{% else %}{{site.title}}{% endif %}",
          public: "{{ training.public }}",
          costs: "{{ training.costs }}",
          costsdescription: "{{ training.costs-description }}",
          duration: "{{ training.duration }}",
          durationdescription: "{{ training.duration-description }}",
          ref: "{{ training.ref }}",
          subject: function () {
            var resultSubject = [];
            {% for s in training.subject %}
              resultSubject.push("{{s}}");
            {% endfor %}
            return resultSubject;
          }(),
          program: function () {
            var resultProgram  = [];
            {% for p in training.program %}
              var nameProgram = "{{p.title}}";
              var activityProgram = [];
              {% for a in p.activity %}
                activityProgram.push("{{a}}");
              {% endfor %}
              resultProgram.push({name:nameProgram, activity:activityProgram});
            {% endfor %}
            return resultProgram;
          }(),
          presentation: "{{ training.presentation }}"
        },
      {% endif %} {% endif %} {% endfor %}
    ];
  });
</script>
