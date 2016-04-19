---
layout: administration
permalink: /administration/errorFormat.html
---

<a href="{{ '/administration/formulaireData.html' | prepend: site.baseurl }}">Générateur de fichier</a>

# Test le format des fichiers Markdown (.md)

Un champ obligatoire est t’il manquant ?  
La référence est t’elle unique ?  
La catégorie existe-t-elle ?  

- - -

## ERREURS FICHIERS CATÉGORIES :

{% for somaire in site.pages %}
  {% if somaire.layout == 'sommaire' %}

    {% if somaire.title %}
      {% assign my_lenght = somaire.title|size %}
      {% if 40 <= my_lenght %}
- - -

{{somaire.title}}  
*ATTENTION : Le titre est trés grand ({{my_lenght}} lettres) : il peut y avoir des problèmes d’affichage*
      {% endif %}
    {% else %}
- - -
### *ERREUR : Pas de champ title*
    {% endif %}

    {% if somaire.permalink %}
    {% else %}
- - -
      {% if somaire.title %}
### {{somaire.title}}
      {% endif %}
*ERREUR : Pas de champ permalink*
    {% endif %}

    {% if somaire.node %}
    {% else %}
- - -
      {% if somaire.title %}
### {{somaire.title}}
      {% endif %}
*ERREUR : Pas de champ node*
    {% endif %}

    {% if somaire.image %}
    {% else %}
- - -
      {% if somaire.title %}
### {{somaire.title}}
      {% endif %}
*ERREUR : Pas de champ image*
    {% endif %}

  {% endif %}
{% endfor %}

- - -
- - -

## ERREURS FICHIERS FORMATIONS :

{% for training in site.pages %}
  {% if training.layout == 'training' %}

    {% if training.title %}
      {% assign my_lenght = training.title|size %}
      {% if 40 <= my_lenght %}
- - -

{{training.title}}  
*ATTENTION : Le titre est trés grand ({{my_lenght}} lettres) : il peut y avoir des problèmes d’affichage*
      {% endif %}
    {% else %}
- - -
### *ERREUR : Pas de champ title*
    {% endif %}

    {% if training.permalink %}
      {% if training.ref %}
        {% if training.permalink contains training.ref %}
        {% else %}
- - -
          {% if training.title %}
{{training.title}}  
          {% endif %}
*ATTENTION : l'adresse de la page ne contient pas la référence*
        {% endif %}
      {% endif %}
    {% else %}
- - -
      {% if training.title %}
### {{training.title}}
      {% endif %}
*ERREUR : Pas de champ permalink*
    {% endif %}

    {% if training.categories %}
      {% assign my_categorie_exist = false %}
      {% for somaire in site.pages %}
        {% if somaire.layout == 'sommaire' %}
          {% if somaire.node %}
            {% if somaire.node == training.categories %}
              {% assign my_categorie_exist = true %}
            {% endif %}
          {% endif %}
        {% endif %}
      {% endfor %}
      {% if my_categorie_exist != true %}
- - -
        {% if training.title %}
### {{training.title}}
        {% endif %}
*ERREUR : {{training.categories}} n'est pas une categorie valide*
      {% endif %}
    {% else %}
- - -
      {% if training.title %}
### {{training.title}}
      {% endif %}
*ERREUR : Pas de champ categories*
    {% endif %}

    {% if training.public %}
    {% else %}
- - -
      {% if training.title %}
### {{training.title}}
      {% endif %}
*ERREUR : Pas de champ public*
    {% endif %}

    {% if training.costs %}
    {% else %}
- - -
      {% if training.title %}
### {{training.title}}
      {% endif %}
*ERREUR : Pas de champ costs*
    {% endif %}

    {% if training.duration %}
    {% else %}
- - -
      {% if training.title %}
### {{training.title}}
      {% endif %}
*ERREUR : Pas de champ duration*
    {% endif %}

    {% if training.ref %}
      {% assign my_ref_exist = false %}
      {% for t in site.pages %}
        {% if t.layout == 'training' %}
          {% if t.ref %}
            {% if training.ref == t.ref %}
              {% if my_ref_exist == true %}
- - -
                {% if training.title %}
### {{training.title}}
                {% endif %}
*ERREUR : {{training.ref}} n'est pas unique*
              {% else %}
                {% assign my_ref_exist = true %}
              {% endif %}
            {% endif %}
          {% endif %}
        {% endif %}
      {% endfor %}
    {% else %}
- - -
      {% if training.title %}
### {{training.title}}
      {% endif %}
*ERREUR : Pas de reférence*
    {% endif %}

    {% if training.subject %}
    {% else %}
- - -
      {% if training.title %}
### {{training.title}}
      {% endif %}
*ERREUR : Pas de champ subject - vous pouvez mettre un tableau vide*
    {% endif %}

  {% endif %}
{% endfor %}

- - -
- - -
