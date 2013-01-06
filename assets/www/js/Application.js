var Application = (function(){ 
	function Application(){
	
		this.MainWindow = document.getElementById("MainWindow");
		this.MainMenu = document.getElementById("StartMenu");
		
		this.AddStudentWindow = null;
	
		this.Buttons = {add: document.getElementById("Add"),edit: document.getElementById("Edit"), remove: document.getElementById("Remove"), images: document.getElementById("Image"), notes: document.getElementById("Notes"), finalReport: document.getElementById("FReport"), editReport: document.getElementById("EReport")}
		//this.Presses = [this.AddPress, this.EditPress, this.RemovePress, this.ImagePress, this.NotesPress, this.FRPress, this.ERPress];
		this.Students = [{name: "Tom Brady", images: [], notes: []},{name: "Hubert Farnsworth", images: [], notes: []}];
		
		this.CurrentPage = "";
		this.PageManager = [];

        this.UpdateContent = [];
        this.UpdateContent.push($('#list')[0]);
        this.UpdateContent.push($('#editlist')[0]);
        this.UpdateContent.push($('#deletelist')[0]);
        this.UpdateContent.push($('#choosetermlist')[0]);
        this.UpdateContent.push($('#captureimagelist')[0]);
        this.UpdateContent.push($('#capturenotelist')[0]);

        this.UpdateImages = [];
        this.UpdateImages.push($('#StudentImages'));
        this.UpdateImages.push($('#ReportImages'));

        this.UpdateNotes = [];
        this.UpdateNotes.push($('#noteslist'));
        this.UpdateNotes.push($('#ReportNotes'))
	
	}

Application.prototype.UpdateAllContent = function() {

        for(var i =0; i<this.UpdateContent.length; i++) {
            $(this.UpdateContent[i]).empty();
        }

        for(var i =0; i<this.UpdateContent.length; i++) {
            $(this.UpdateContent[i]).append('<li data-theme="e" style="text-align:center" class="ui-li ui-li-static ui-body-e"> My Children </li>');
        }

        GenerateList();
        GenerateEditList();
        GenerateDeleteList();
        GenerateChooseTermList();
        GenerateCaptureImageList();
        GenerateCaptureNoteList();

}

Application.prototype.UpdateStudentsImages = function() {

    for(var i =0; i<this.UpdateImages.length; i++) {
        $(this.UpdateImages[i]).empty();
    }

    GenerateImageGrid();
    GenerateReportImageGrid();
}

Application.prototype.UpdateStudentNotes = function() {

    for(var i =0; i<this.UpdateNotes.length; i++) {
        $(this.UpdateNotes[i]).empty();
    }

    GenerateNotes();
    GenerateReportNotes();
}

Application.prototype.AddPress = function() {
	this.MainWindow.removeChild(this.MainMenu);
}

Application.prototype.EditPress = function() {
	this.MainWindow.removeChild(this.MainMenu);
}
Application.prototype.RemovePress = function() {
	this.MainWindow.removeChild(this.MainMenu);
}
Application.prototype.ImagePress = function() {
	this.MainWindow.removeChild(this.MainMenu);
}
Application.prototype.NotesPress = function() {
	this.MainWindow.removeChild(this.MainMenu);
}
Application.prototype.FRPress = function() {
	this.MainWindow.removeChild(this.MainMenu);
}

Application.prototype.ERPress = function() {
	this.MainWindow.removeChild(this.MainMenu);
}



Application.prototype.create = function(obj, func){
    var f = function(){
        var target = arguments.callee.target;
        var func = arguments.callee.func;
        return func.apply(target, arguments);
    };
    
    f.target = obj;
    f.func = func;
    return f;
}

return new Application();
})(); 