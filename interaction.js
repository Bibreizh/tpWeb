
// La création d'un Dnd requière un canvas et un interacteur.
// L'interacteur viendra dans un second temps donc ne vous en souciez pas au départ.
function DnD(canvas, interactor) {
	// Définir ici les attributs de la 'classe'
	this.startX = 0;
	this.startY = 0;
	this.endX = 0;
	this.endY = 0;
	this.clic = false;
	this.interacteur = interactor;
	// Developper les 3 fonctions gérant les événements
	this.clicEvent = function(evt){
		this.clic = true;
		var pos= getMousePosition(canvas, evt);
		this.startX = pos.x;
		this.startY = pos.y;
		this.interacteur.onInteractionStart(this);
	}.bind(this);
	
	this.moveEvent = function(evt){
		if(this.clic){
		var pos= getMousePosition(canvas, evt);
		this.endX = pos.x;
		this.endY = pos.y;
		this.interacteur.onInteractionUpdate(this);
		}

	}.bind(this);
	
	this.releaseEvent = function(evt){
		var pos= getMousePosition(canvas, evt);
		this.endX = pos.x;
		this.endY = pos.y;
		this.clic=false;
		this.interacteur.onInteractionEnd(this);
	}.bind(this);
	// Associer les fonctions précédentes aux évènements du canvas.
	
	canvas.addEventListener('mousedown', this.clicEvent, false);
	canvas.addEventListener('mousemove', this.moveEvent, false);
	canvas.addEventListener('mouseup', this.releaseEvent, false);
};


// Place le point de l'événement evt relativement à la position du canvas.
function getMousePosition(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
};



