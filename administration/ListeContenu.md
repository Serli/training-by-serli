---
layout: administration
permalink: /administration/ListeContenu.html
---

<div ng-app="administration" ng-controller="ListContenu">
  <input type="text" ng-model="research.title" placeholder="Search..."/>
  <select ng-model="research.news"
          ng-options="choix.v as choix.n for choix in [{ n: 'ALL', v: true }, { n: 'NEWS', v: false }]">
  </select>
  <div>
    <ul>
        <li ng-repeat="n in (trainings|filter:research.title)"
          ng-style="{ 'color' : (n.myClass=='Old') ? 'darkgray' : ((n.myClass=='Maj') ? 'green' : ((n.myClass=='Add') ? 'blue' : 'red' )) }">
          <!-- /// training //////////////////////////////////////////////// -->
          <h2>[[n.date]][[n.title]]</h2>
          <ul ng-if="(n.myClass!='Old')||research.news">
            <li ng-if="n.myClass=='Remove'"><h4>Supprimer</h4></li>
            <li ng-if="n.myClass=='Maj'"><h4>Modifier</h4></li>
            <li ng-if="n.myClass=='Add'"><h4>Ajouter</h4></li>
            <li ng-if="n.public!='' && n.myClass!='Remove'">[[n.public]]</li>
            <li ng-if="n.costs!='' && n.myClass!='Remove'">[[n.costs]] [[n.costsdescription]]</li>
            <li ng-if="n.duration!='' && n.myClass!='Remove'">[[n.duration]] [[n.durationdescription]]</li>
            <li>[[n.ref]]</li>
            <li ng-if="n.subject!=[] && n.myClass!='Remove'">SUJETS :</li>
            <ul>
              <li ng-repeat="s in n.subject">[[s]]</li>
            </ul>
            <li ng-if="n.program!=[] && n.myClass!='Remove'">PROGRAMME :</li>
            <ul>
              <li ng-repeat="p in n.program">
                [[p.name]]
                <ul>
                  <li ng-repeat="a in p.activity">[[a]]</li>
                </ul>
              </li>
            </ul>
            <li ng-if="n.presentation!='' && n.myClass!='Remove'">PRÉSENTATION :</li>
            <li ng-if="n.presentation!='' && n.myClass!='Remove'">[[n.presentation]]</li>
          </ul>
          <!-- ///////////////////////////////////////////////////////////// -->
          <hr/>
        </li>
    </ul>
  </div>

  <p>
    <a href="{{ '/administration/formulaireData.html' | prepend: site.baseurl }}">Ajout et modification des formations</a>
    <br/>
    <br/>
    <a href="{{ site.url }}/{{ site.baseurl }}">Page d'accueil</a>
  </p>

</div>

<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular.min.js"></script>
<script>
  var ListeContenuSite = [
    {% for training in site.posts %}
      {
        myClass: "Old",
        myDate: "{{ training.date | date: '%Y-%m-%d' }}",
        date: "{{ training.date | date_to_long_string }} - ",
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
    {% endfor %}
  ];
</script>
<script src="../js/ListContenu.js"></script>
