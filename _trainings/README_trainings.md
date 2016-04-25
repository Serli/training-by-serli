# Structure des fichiers TRAININGS

## TRAININGS_CATEGORY

### 5 paramétres

* layout :
  * égale à : *sommaire*
  * indique qu'il s'agit d'un fichier catégorie qui doit être affiché dans le menu
* title :
  * le nom à afficher
  * Attention : s'il est trop grand, il peut ne pas s'afficher correctement
* permalink :
  * l'adresse de la page listant les formations de cette catégories
  * généralement nom.html
* node :
  * le nom interne de la catégorie
  * peut-être différent de title
  * doit être unique
  * ne doit pas contenir d'espaces
* image :
  * l'adresse de l'image qui sera afficher dans le menu
  * généralement /assets/TrainingsCategories/WhiteIcon/nom.png

pas de corps de page.

## TRAININGS

### 12 paramétres

* layout :
  * égale à : *training*
  * indique qu'il s'agit d'un fichiers de formation
* title :
  * le nom de la formation
  * Attention : s'il est trop grand, il peut ne pas s'afficher correctement
* permalink :
  * l'adresse de la page de formation
  * généralement NomCatégorie/reférence.html
* categories :
  * nom interne de la catégorie de cette formation
    * le champ node
* public :
  * le public ciblé par cette formation
    * exemple : Développeurs Java
* cost :
  * le coût de cette formation
    * exemple 1500 € HT
* costs-description :
  * facultatif
  * détails supplémentaire sur le coût
    * exemple : par participant
* duration :
  * la durée de cette formation
    * exemple : 3 jours
* duration-description :
  * facultatif
  * détails supplémentaire sur la durée
    * exemple : 50% théorie, 50% pratique
* ref :
  * la référence de la formation
    * exemple : TR-ANGULARJS
* subject :
  * les sujets abordé durant la formation
  * un tableau de string
  * peut-être un tableau vide
* program :
  * facultatif
  * le programme de la formation
  * tableau d'objets
    * title :
      * titre de la partie
    * activity :
      * liste des activités de cette partie
      * tableau de string
      * peut-être un tableau vide

### Corps de fichier

présentation de la formation
généralement de la forme :

  h3 : Présentation
  paragraphe : blabla sur la formation

## Génération automatique de fichier

  /administration/formulaireData.html

## Vérification automatique du format

/administration/errorFormat.html
