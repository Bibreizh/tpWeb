
var editingMode = { rect: 0, line: 1 };

function Pencil(ctx, drawing, canvas) {
	this.currEditingMode = editingMode.line;
	this.currLineWidth = 5;
	this.currColour = '#000000';
	this.currentShape = 0;

	// Liez ici les widgets à la classe pour modifier les attributs présents ci-dessus.
	document.getElementById('spinnerWidth').onchange= (e) => this.currLineWidth = e.target.value;
    document.getElementById('colour').onchange= (e) => this.currColour=e.target.value;

	document.getElementById('butRect').onclick= (_) => this.currEditingMode = editingMode.rect ;

	document.getElementById('butLine').onclick= (_) => this.currEditingMode = editingMode.line ;
	
	document.getElementById("reset").onclick = (_) => resetShapeList(ctx, canvas);
	new DnD(canvas, this);

	// Implémentez ici les 3 fonctions onInteractionStart, onInteractionUpdate et onInteractionEnd
	this.onInteractionStart = function(dnd){
	}.bind(this);
	
	this.onInteractionUpdate = function(dnd){
		if(this.currEditingMode === editingMode.rect){
			this.currentShape = new Rectangle(dnd.startX, dnd.startY, this.currLineWidth, this.currColour, dnd.endY - dnd.startY, dnd.endX - dnd.startX);
			drawing.paint(ctx, canvas);
			this.currentShape.paint(ctx);
		}
		else{
			this.currentShape = new Line(dnd.startX, dnd.startY, this.currLineWidth, this.currColour, dnd.endX, dnd.endY);
			drawing.paint(ctx, canvas);
			this.currentShape.paint(ctx);
		}
	}.bind(this);
	
	this.onInteractionEnd = function (dnd) {
	    var uuid = generateUUID();
	    drawing.shapeArray.set(uuid, this.currentShape);
	    this.currentShape.paint(ctx);
	    updateShapeList(uuid, this.currentShape);
	    document.getElementById("remove" + uuid).onclick = (event) =>
	      remove(drawing, event.currentTarget.id.substring(6), ctx, canvas);
  }.bind(this);

  function remove(drawing, index, ctx, canvas) {
    drawing.shapeArray.delete(index);
    document.getElementById("liRemove" + index).remove();
    drawing.paint(ctx);
  }
	function generateUUID(){
        var d = new Date().getTime();//Timestamp
        var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16;//random number between 0 and 16
            if(d > 0){//Use timestamp until depleted
                r = (d + r)%16 | 0;
                d = Math.floor(d/16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r)%16 | 0;
                d2 = Math.floor(d2/16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }
    
    function resetShapeList(ctx, canvas) {
      // Obtient la liste avec l'ID "shapeList"
      const shapeList = document.getElementById('shapeList');

      // Supprimez tous les éléments de la liste
      shapeList.innerHTML = "";
      //supprimer les elements du canvas
      ctx.fillStyle = 'F0F0F0';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawing.shapeArray.clear();
    }

};


