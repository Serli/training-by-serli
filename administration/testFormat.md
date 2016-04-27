---
layout: administration
permalink: /administration/errorFormat.html
---

# Test le format des fichiers Markdown (.md)

Un champ obligatoire est t’il manquant ?  
La référence est t’elle unique ?  
La catégorie existe-t-elle ?  

<fieldset>
  <legend>ERREURS FICHIERS FORMATIONS</legend>

  {% for training in site.posts %}

    {% if training.title %}
      {% assign my_lenght = training.title|size %}
      {% if 40 <= my_lenght %}
        <hr/>
        <h3>{{training.title}}</h3>
        <p><em>ATTENTION : Le titre est trés grand ({{my_lenght}} lettres) : il peut y avoir des problèmes d’affichage</em></p>
      {% endif %}
    {% else %}
    <hr/>
    <h3><em>ERREUR : Pas de champ title</em></h3>
    {% endif %}

    {% if training.permalink %}
      {% if training.ref %}
        {% if training.permalink contains training.ref %}
        {% else %}
          <hr/>
          {% if training.title %}
            <h3>{{training.title}}</h3>
          {% endif %}
          <p><em>ATTENTION : l'adresse de la page ne contient pas la référence</em></p>
        {% endif %}
      {% endif %}
    {% else %}
      <hr/>
      {% if training.title %}
        <h3>{{training.title}}</h3>
      {% endif %}
      <p><em>ERREUR : Pas de champ permalink</em></p>
    {% endif %}

    {% if training.public %}
    {% else %}
      <hr/>
      {% if training.title %}
        <h3>{{training.title}}</h3>
      {% endif %}
      <p><em>ERREUR : Pas de champ public</em></p>
    {% endif %}

    {% if training.costs %}
    {% else %}
      <hr/>
      {% if training.title %}
        <h3>{{training.title}}</h3>
      {% endif %}
      <p><em>ERREUR : Pas de champ costs</em></p>
    {% endif %}

    {% if training.duration %}
    {% else %}
      <hr/>
      {% if training.title %}
        <h3>{{training.title}}</h3>
      {% endif %}
      <p><em>ERREUR : Pas de champ duration</em></p>
    {% endif %}

    {% if training.ref %}
      {% assign my_ref_exist = false %}
      {% for t in site.pages %}
        {% if t.layout == 'training' %}
          {% if t.ref %}
            {% if training.ref == t.ref %}
              {% if my_ref_exist == true %}
                <hr/>
                {% if training.title %}
                  <h3>{{training.title}}</h3>
                {% endif %}
                <p><em>ERREUR : {{training.ref}} n'est pas unique</em></p>
              {% else %}
                {% assign my_ref_exist = true %}
              {% endif %}
            {% endif %}
          {% endif %}
        {% endif %}
      {% endfor %}
    {% else %}
      <hr/>
      {% if training.title %}
        <h3>{{training.title}}</h3>
      {% endif %}
      <p><em>ERREUR : Pas de reférence</em></p>
    {% endif %}

    {% if training.subject %}
    {% else %}
      <hr/>
      {% if training.title %}
        <h3>{{training.title}}</h3>
      {% endif %}
      <p><em>ERREUR : Pas de champ subject - vous pouvez mettre un tableau vide</em></p>
    {% endif %}

  {% endfor %}

  <hr/>
</fieldset>

<a href="{{ '/administration/formulaireData.html' | prepend: site.baseurl }}">Générateur de fichier Markdown (.md)</a>
<br/>
<br/>
<a href="{{ '/administration/ListeContenu.html' | prepend: site.baseurl }}">Liste du Contenu</a>
<br/>
<br/>
<a href="{{ site.url }}/{{ site.baseurl }}">Page d'accueil</a>
