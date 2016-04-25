---
layout: administration
permalink: /administration/formulaireData.html
---

<div class="formulaireData" ng-app="administration">
  <h1>Nouvelle Catégorie</h1>
  <form ng-submit="downloadCategory()" ng-controller="formulaireCategory">
    <fieldset>
      <label for="name" >Nom Categorie</label>
      <input id="name" type="text" ng-model="myTitle"
        placeholder="ex : Java" ng-class="myTitle==='' ? 'error' : ''"/><br/>
      <div class="input-file-container">
        <label for="my-file">Icone Categorie</label>
    		<input class="input-file" id="my-file" type="file" onchange="angular.element(this).scope().setFile(this)" />
    		<label ng-if="myImage.name===undefined" for="my-file"
          class="input-file-trigger error">Select a file...</label>
    		<label ng-if="myImage.name!==undefined" for="my-file"
          class="input-file-trigger completed">[[myImage.name]]</label>
    	</div>
      <p><em>Dans le dossier : /assets/TrainingsCategories/WhiteIcon</em></p>
    </fieldset>

    <input type="submit" value="Download"
      ng-class="!isValide() ? 'errorDownload' : ''">
  </form>

  <br/><hr/>

  <h1>Nouvelle Formation</h1>
  <form ng-submit="downloadTraining()" ng-controller="formulaireTraining">
    <fieldset>
      <legend>Modifier</legend>
      <div class="input-file-container">
        <label for="my-fileTraining">Fichier à modifier</label>
        <input class="input-file" id="my-fileTraining" type="file" onchange="angular.element(this).scope().setFile(this)" />
        <label ng-if="myFile.name===undefined" for="my-fileTraining"
          class="input-file-trigger">Select a file...</label>
        <label ng-if="myFile.name!==undefined" for="my-fileTraining"
          class="input-file-trigger completed">[[myFile.name]]</label>
      </div>
      <p><em>Dans le dossier : /_trainings</em></p>
    </fieldset>

    <fieldset>
      <legend>Générale</legend>
      <label for="title">Titre</label>
      <input id="title" type="text" ng-model="myTitle"
        placeholder="ex : Les nouveautés de Java 8" ng-class="myTitle==='' ? 'error' : ''"/><br/>
      <label for="ref">Référence</label>
      <input id="ref" type="text" ng-model="myRef" placeholder="ex : TR-JAVA8"
         ng-class="myRef==='' ? 'error' : ''"/><br/>
      <label for="category">Catégorie</label>
      <select id="category" ng-model="myCategorie" ng-class="myCategorie==='' ? 'error' : ''">
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
    </fieldset>
    <fieldset>
      <legend>En tête</legend>
      <label for="public">Public cible</label>
      <input id="public" type="text" ng-model="myPublic"
        placeholder="ex : Développeurs Java" ng-class="myPublic==='' ? 'error' : ''"/><br/>
      <label for="cost">Coût</label>
      <input id="cost" type="text" ng-model="myCost"
        placeholder="ex : 590 € HT" ng-class="myCost==='' ? 'error' : ''"/><br/>
      <label for="detailcost">Détails Coût</label>
      <input id="detailcost" type="text" ng-model="myCostDescription" placeholder="ex : par participant"/><br/>
      <label for="duration">Durée</label>
      <input id="duration" type="text" ng-model="myDuration"
        placeholder="ex : 1 jours" ng-class="myDuration==='' ? 'error' : ''"/><br/>
      <label for="durationdetail">Détails Durée</label>
      <input id="durationdetail" type="text" ng-model="myDurationDescription" placeholder="ex : 40% théorie, 60% pratique"/><br/>
    </fieldset>
    <fieldset>
      <label for="namefile">Nom du fichier</label>
      <input id="namefile" type="text" ng-model="myName" placeholder="ex : LesNouveautesDeJava8"/><br/>
    </fieldset>
    <fieldset>
      <legend>Facultatif</legend>

      <label for="contentfile">Contenu</label>
      <textarea id="contentfile" rows="4" cols="50" ng-model="myContenu"
        placeholder="ex : Cette formation vise à vous faire découvrir les nouveautés de Java 8."></textarea>

      <label>Sujets</label><br/>
      <div id="divSujets">
        <div ng-repeat="s in mySubject">
          <input type="text" ng-model="s.name"
            placeholder="ex : Expressions Lambda" ng-class="s.name==='' ? 'error' : ''" focus/>
          <input class="littlebutton" type="button" value="x" ng-click="removeSubject($index)"/>
        </div>
      </div>
      <input class="littlebutton" type="button" value="+" ng-click="addSubject()"/>

      <br/>
      <label>Programme</label><br/>
      <div ng-repeat="p in myProgram">
        <input type="text" ng-model="p.title" placeholder="ex : Les Streams"
           ng-class="p.title==='' ? 'error' : ''" focus/>
        <input class="littlebutton" type="button" value="x" ng-click="removeProgram($index)"/>
        <div ng-repeat="a in p.activity" style="margin-left:50px;">
          <input type="text" ng-model="a.name" placeholder="ex : Pipeline"
            ng-class="a.name==='' ? 'error' : ''" focus/>
          <input class="littlebutton" type="button" value="x" ng-click="removeActivity($parent.$index, $index)"/>
        </div>
        <input class="littlebutton" type="button" value="+" ng-click="addActivity($index)" style="margin-left:50px;"/>
      </div>
      <input class="littlebutton" type="button" value="+" ng-click="addProgram()"/>


    </fieldset>

    <input class="button" type="submit" value="Download"
      ng-class="!isValide() ? 'errorDownload' : ''">
  </form>

  <br/><hr/>

  <p>
    <a href="{{ '/administration/errorFormat.html' | prepend: site.baseurl }}">Test le format des fichiers Markdown (.md)</a>
    <br/>
    <br/>
    <a href="{{ site.url }}/{{ site.baseurl }}">Page d'accueil</a>
  </p>


  <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular.min.js"></script>
  <script src="../js/app.js"></script>
</div>
