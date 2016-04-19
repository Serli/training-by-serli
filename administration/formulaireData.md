---
layout: administration
permalink: /administration/formulaireData.html
---

<a href="{{ '/administration/errorFormat.html' | prepend: site.baseurl }}">Test le format des fichiers Markdown (.md)</a>

<div ng-app="administration">
  <h1>Nouvelle Catégorie</h1>
  <form ng-submit="downloadCategory()" ng-controller="formulaireCategory">
    Nom Categorie : <input type="text" ng-model="myTitle" /><br/>
    Nom image Categorie : <input type="file" onchange="angular.element(this).scope().setFile(this)" /><br/>
    <input type="submit" value="Download">
  </form>

  <br/>
  <h1>Nouvelle Formation</h1>
  <form ng-submit="downloadTraining()" ng-controller="formulaireTraining">
    Titre : <input type="text" ng-model="myTitle" /><br/>
    Référence : <input type="text" ng-model="myRef" /><br/>
    <!-- Catégorie : <input type="text" ng-model="myCategorie" /><br/> -->
    Catégorie : <select ng-model="myCategorie">
    {% for somaire in site.pages %}
      {% if somaire.layout == 'sommaire' %}
        {% if somaire.title %}
          {% if somaire.node %}
            <option value="{{somaire.node}}">{{somaire.title}}</option>
          {% endif %}
        {% endif %}
      {% endif %}
    {% endfor %}
    </select><br/>
    Public cible : <input type="text" ng-model="myPublic" /><br/>
    Coût : <input type="text" ng-model="myCost" /><br/>
    Détails Coût : <input type="text" ng-model="myCostDescription" /><br/>
    Durée : <input type="text" ng-model="myDuration" /><br/>
    Détails Durée : <input type="text" ng-model="myDurationDescription" /><br/>
    Nom du fichier : <input type="text" ng-model="myName" /><br/>

    Sujets :
    <div ng-repeat="s in mySubject">
      <input type="text" ng-model="s.subject" />
      <input type="button" value="x" ng-click="removeSubject($index)"/>
    </div>
    <input type="button" value="+" ng-click="addSubject()"/>

    <br/>

    Programme :
    <div ng-repeat="p in myProgram">
      <input type="text" ng-model="p.title" />
      <input type="button" value="x" ng-click="removeProgram($index)"/>
      <div ng-repeat="a in p.activity" style="margin-left:50px;">
        <input type="text" ng-model="a.name" />
        <input type="button" value="x" ng-click="removeActivity($parent.$index, $index)"/>
      </div>
      <input type="button" value="+" ng-click="addActivity($index)" style="margin-left:50px;"/>
    </div>
    <input type="button" value="+" ng-click="addProgram()"/><br/>
    Contenu : <textarea rows="4" cols="50" ng-model="myContenu"></textarea><br/>

    <br/>
    <input type="submit" value="Download">
  </form>

  <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular.min.js"></script>
  <script src="../js/app.js"></script>
</div>
