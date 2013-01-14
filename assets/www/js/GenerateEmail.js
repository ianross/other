function Email(title,date,images,captions,notes,followupexperience,evaluation,type,background,font,template, outcomes, colour, principles, practices) {

    this.title = title;
    this.date = date;
    this.images = images;

    this.captions = captions;

    this.notes = notes;
    this.fnotes = "";

    this.follow = followupexperience;
    this.evaluation = evaluation;

    this.background = background;
    if(this.background == "A") { this.background = "#90EE90" }
    if(this.background == "B") { this.background = "#778899" }
    if(this.background == "C") { this.background = "#008080" }
    if(this.background == "D") { this.background = "#ADD8E6" }
    if(this.background == "E") { this.background = "#FFFFFF" }

    this.font = font;
    if(this.font == "A") { this.font = "cursive" }
    if(this.font == "B") { this.font = "fantasy" }
    if(this.font == "C") { this.font = "helvetica" }
    if(this.font == "D") { this.font = "palatino" }

    this.fontcolour = colour;
    if(this.fontcolour == "A") { this.fontcolour = "#000000" }
    if(this.fontcolour == "B") { this.fontcolour = "#FFFFFF" }
    if(this.fontcolour == "C") { this.fontcolour = "SkyBlue" }

    this.template = template;

    this.outcomes = outcomes;
    this.foutcomes = [];

    //Format Notes
    for(var i=0; i<notes.length;i++) {
        this.fnotes+= '<li style="margin-bottom: 1em;">' + notes[i] + '</li>';
    }

    //Format practices & principles
    this.practices = [];
    this.principles = [];
    this.blurb = null;

    for(var i=0; i<principles.length;i++) {
        this.principles+= '<li style="margin-bottom: 1em;">' + principles[i] + '</li>';
    }

    for(var i=0; i<practices.length;i++) {
        this.practices+= '<li style="margin-bottom: 1em;">' + practices[i] + '</li>';
    }

    if(this.practices.length > 0 || this.principles.length > 0) {
        this.blurb = "Educators have carefully considered the following pedagogical principles and practices to promote learning and assist the child to make progress in relation to the Learning Outcomes.";
    }

    //Format Outcomes
    this.fstrings = [];
    this.fstring = "";

    for(var outcome in outcomes) {

        var fstring = outcomes[outcome].Title;

        for(var x in outcomes[outcome]) {

            if(x != "Title") {

                if(outcomes[outcome][x].Descriptor) {
                    fstring+= ' ' + outcomes[outcome][x].Descriptor + ' -';
                }
                else {
                    fstring+= ' ' + 'The child -';
                }

                for(var i=0;i<outcomes[outcome][x].Selections.length; i++) {
                    if(i == outcomes[outcome][x].Selections.length-1) {
                        fstring+= ' ' + outcomes[outcome][x].Selections[i] + '. ';
                    }
                    else {
                        fstring+= ' ' + outcomes[outcome][x].Selections[i] + ', ';
                    }
                }

                fstring+= '</br></br>'

            }
        }
        this.fstrings.push(fstring);
    }

    for(var i=0; i<this.fstrings.length;i++) {
        this.fstring+='<li style="margin-bottom: 1em;">' + this.fstrings[i] + '</li>';
    }

    //EC etc etc
    this.type = type;

    this.EmailString = "";
}

Email.prototype.IframeForm = function(emailbody) {

    var iframe = document.createElement("iframe");
    $(iframe).html('<form action="https://sendgrid.com/api/mail.send.json" method="post" enctype="multipart/form-data">'+
        '<input type="text" name="to" value="iancalligeros@gmail.com">'+
        '<input type="text" name="toname" value="test">'+
        '<input type="text" name="subject" value="Childs Learning Story">'+
        '<input type="text" name="from" value="test@yourdomain.com">'+
        '<input type="text" name="api_user" value="iancalligeros">'+
        '<input type="text" name="api_key" value="tenaciousd">'+
        '<input type="text" name="html" value=' + emailbody + '>'+
        '<input type="file" name="files[a.jpg]" src="@a.jpg">'+
        '<input name="content[a.jpg]" value="a.jpg">'+
        '<input name="files[b.jpg]" value="@a.jpg">'+
        '<input type="submit">'+
        '</form>');

    document.body.appendChild(ifrm);

}

Email.prototype.GenerateEmail = function(template) {

    this.EmailString+= '<!DOCTYPE html> ' +
        '<html xmlns="http://www.w3.org/1999/html"> ' +
            '<head> ' +
                '<meta charset="utf-8"> ' +
                    '<title>Learning Story</title> ' +
                '</head> ' +
                '<body>' +
                    '<div style="width:600px;font-family:'+ this.font +';color:'+ this.fontcolour +';background-color:'+ this.background +';border-radius: 5px;-moz-border-radius: 5px;-webkit-border-radius: 5px;border: 2px solid #E8EDFF;display:table"> ' +
                        '<!-- Title Banner --> ' +
                        '<div style="width:600px;height:60px;float:left;color:black;text-align:center;">'+

                        '    <span style="font-size:28px;width:600px;float:left;">'+ this.title +'</span> ' +
                        '    <span style="width:600px;font-style:italic;float:left;">'+ this.date +'</span> ' +
                        '</div>';

    if(this.captions) {
        this.captions[0]=(this.captions[0])?this.captions[0]:"";
        this.captions[1]=(this.captions[1])?this.captions[1]:"";
        this.captions[2]=(this.captions[2])?this.captions[2]:"";
    }

    if(this.images == 0) {
    }

    if(this.images == 1) {
        this.EmailString+='<div style="width:600px;height:200px;float:left;margin-top:10px">' +
            '<img src="cid:1.jpg" width="193" height="200" style="border:none;margin:0px 0px 0px 200px;float:left;">' +
            '</div>';

        this.EmailString+='<div style="width:600px;height:20px;float:left;">'+
            '<div style="width:193px;margin-left:200px;float:left;text-align:center;font-style:italic;font-size:10px">'+ this.captions[0] + '</div>'+
        '</div>';
    }

    if(this.images == 2) {
        this.EmailString+='<div style="width:600px;height:200px;float:left;margin-top:10px">' +
            '<img src="cid:1.jpg" width="193" height="200" style="border:none;margin:0px 10px 0px 105px;float:left;">' +
            '<img src="cid:2.jpg" width="193" height="200" style="border:none;margin:0px 0px 0px 0px;float:left;">' +
            '</div>';

        this.EmailString+='<div style="width:600px;height:20px;float:left;">'+
            '<div style="width:193px;margin-left:105px;float:left;text-align:center;font-style:italic;font-size:10px">'+ this.captions[0] +'</div>'+
            '<div style="width:193px;float:left;text-align:center;font-style:italic;font-size:10px">'+ this.captions[1] +'</div>'+
            '</div>';
    }

    if(this.images == 3) {
        this.EmailString+='<div style="width:600px;height:200px;float:left;margin-top:10px">' +
            '<img src="cid:1.jpg" width="193" height="200" style="border:none;margin:0px 10px 0px 0px;float:left;">'+
            '<img src="cid:2.jpg" width="193" height="200" style="border:none;margin:0px 10px 0px 0px;float:left;">'+
            '<img src="cid:3.jpg" width="193" height="200" style="border:none;margin:0px 0px 0px 0px;float:left;">'+
        '</div>';

        this.EmailString+='<div style="width:600px;height:20px;float:left;">'+
            '<div style="width:193px;margin:0px 10px 0px 0px;float:left;text-align:center;font-style:italic;font-size:10px">'+ this.captions[0] +'</div>'+
            '<div style="width:193px;float:left;text-align:center;font-style:italic;font-size:10px;margin:0px 10px 0px 0px;">'+ this.captions[1] +'</div>'+
            '<div style="width:193px;float:left;text-align:center;font-style:italic;font-size:10px">'+ this.captions[2] +'</div>'+
            '</div>';
    }

    this.EmailString+= '<!-- Text Container --><div style="width:600px;float:left;margin-top:10px">';

    if(template == "A") {

        var width = 193;
        if(this.fnotes != "") {
            this.EmailString+='<div style="width:193px;float:left;margin:0px 10px 0px 0px;">'+
                '<p style="text-align:center;font-weight:bold">Observations</p>'+
                '<ul style="font-size:12px">'+ this.fnotes +'</ul></div>';
        }
        else {
            width= 295;
        }
        this.EmailString+='<div style="width:'+ width +'px;float:left;margin:0px 0px 0px 5px;">'+
            '<p style="text-align:center;font-weight:bold">Evaluation</p>'+
            '<p style="font-size:12px">'+ this.evaluation +'</p>'+
            '<p style="text-align:center;font-weight:bold">Follow-Up Experience</p>'+
            '<p style="font-size:12px">'+ this.follow +'</p>' +
            '</div>';

        this.EmailString+='<div style="width:'+ width +'px;float:left;margin:0px 0px 0px 0px;">'+
            '<p style="text-align:center;font-weight:bold">Learning Outcomes</p>'+
            '<ul style="font-size:12px">'+ this.fstring +'</ul></div>';
    }

    else {
        if(this.fnotes != "") {
            this.EmailString+='<div style="width:600px;float:left;margin:0px 0px 0px 0px;">'+
                '<p style="text-align:center;font-weight:bold">Observations</p>'+
                '<ul style="font-size:12px">'+ this.fnotes +'</ul></div>';
        }
        this.EmailString+='<div style="width:600px;float:left;margin:10px 0px 0px 0px;">'+
            '<p style="text-align:center;font-weight:bold">Evaluation</p>'+
            '<p style="font-size:12px">'+ this.evaluation +'</p>'+
            '</div>';

        this.EmailString+='<div style="width:600px;float:left;margin:10px 0px 0px 0px;">'+
            '<p style="text-align:center;font-weight:bold">Follow-Up Experience</p>'+
            '<p style="font-size:12px">'+ this.follow +'</p>'
        '</div>';

        this.EmailString+='<div style="width:600px;float:left;margin:10px 0px 0px 0px;">'+
            '<p style="text-align:center;font-weight:bold">Learning Outcomes</p>'+
            '<ul style="font-size:12px">'+ this.fstring +'</ul></div>';
    }

    this.EmailString+='</div>';

    if(this.principles.length > 0 || this.practices.length > 0) {

        this.EmailString+= '<!-- Principles & Practices --><div style="width:600px;float:left;margin:10px 0px 0px 0px;">';

        //Add Blurb
        this.EmailString+='<p style="text-align:left;font-style:italic">'+this.blurb+'</p>'

        //Add principles if any...
        if(this.principles.length >0) {
            this.EmailString+='<p style="text-align:center;font-weight:bold">Principles:</p>';
            this.EmailString+='<ul style="font-size:12px">'+ this.principles +'</ul>';
        }

        //Add practices if any...
        if(this.principles.length >0) {
            this.EmailString+='<p style="text-align:center;font-weight:bold">Practices:</p>';
            this.EmailString+='<ul style="font-size:12px">'+ this.principles +'</ul>';
        }

        this.EmailString+='</div>';

    }

    this.EmailString+='</div></body></html>';

    return this.EmailString;
}