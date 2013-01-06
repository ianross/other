/**
 * Created with JetBrains WebStorm.
 * User: Ian
 * Date: 11/08/12
 * Time: 11:01 AM
 * To change this template use File | Settings | File Templates.
 */
var db;
var shortName = 'WebSqlDB';
var version = '1.0';
var displayName = 'WebSqlDB';
var maxSize = 65535;

var Students = [];
var CurrentStudent = {name: "No Student Selected", images: [], notes: []};
var Globals = {teacher : ""};
var CurrentEdit = null;
var CallbackData = null;

//Report Generation
var ReportType = null;
var ReportTerm = null;
var Template = null;

var ReportTitle = null;
var ReportDate = null;
var ReportNotes = null;
var ReportImages = null;

var ReportCheckBoxesNotes = null;
var ReportCheckBoxesImages = null;
var ReportCheckBoxesCaption = [];

var SelectedBackground = "E";
var SelectedFont = "A";
var SelectedFontColour = "A";

var CurrentCaptionElement = null;

var TemplateOne = {images : 2};
var TemplateTwo = {images : 2};
var TemplateThree = {images : 1};
var TemplateFour = {images : 0};

var ReportType = "";
var ReportOutcomes = [];
var SendData = {};

function errorHandler(transaction, error) {
    alert('Error: ' + error.message + ' code: ' + error.code);

}

//Used for debugging...
function successCallBack() {

    db.transaction(function(transaction) {
        transaction.executeSql('SELECT * FROM Teacher;', [],
            function(transaction, result) {
                if (result != null && result.rows != null) {
                    if(result.rows.length > 0) {
                        Globals.teacher = result.rows.item(0).Email;
                    }else {
                        transaction.executeSql('INSERT INTO Teacher(PrimaryKey, Email) VALUES (?,?)',['1',''], function() {},errorHandler);
                    }

                }
            },errorHandler);
    },errorHandler,nullHandler);
   // alert("DEBUGGING: success");
}

function nullHandler(){

    Application.UpdateAllContent();
    Application.UpdateStudentsImages();

};

function addSuccess(){
    alert("Child Successfully Added to Class");
    Students.push({name: CallbackData[0], images: [], notes: [], TermOne: 0, TermTwo: 0, TermThree: 0, TermFour: 0, Parent: CallbackData[1]});
    $('#list').append('<li style="text-align:center" data-theme="c" class="ui-li ui-li-static ui-body-c">' + CallbackData + '</li>');
    Application.UpdateAllContent();
    CallbackData = null;
};

function updateEmailSuccess(){

    alert("Email Address Successfully Updated");

    Globals.teacher = CallbackData;
    Application.UpdateAllContent();

    $("#Tinput").val(Globals.teacher);

    CallbackData = null;

};

function addTeacherSuccess(){

    alert("Teacher's Email Address Successfully Updated");
    Application.UpdateAllContent();
    CallbackData = null;

};



function updateSuccess(){
    alert("Child Information Successfully Updated")
    CurrentStudent.name = CallbackData;
    Application.UpdateAllContent();
    CallbackData = null;

};

function updateImagesSuccess() {

    CurrentStudent.images.push(CallbackData);
    Application.UpdateStudentsImages();
    CallbackData = null;
}

function updateImageDeleteSuccess() {
    console.log(CallbackData);
    CurrentStudent.images = CallbackData;
    Application.UpdateStudentsImages();
    CallbackData = null;
}

function updateNotesSuccess() {
    alert("Child Notes Successfully Updated");
    CurrentStudent.notes.push(CallbackData);
    Application.UpdateStudentNotes();
    CallbackData = null;
    var Note = $('#textarea-a').val("");
    location.href="#capturenotes";
}

function updateTermSuccess() {
    CurrentStudent[ReportTerm] = CallbackData;
    CallbackData = null;
    //Some update for list of 'submitted'
    Application.UpdateAllContent();
    location.href="#ChooseStudentTerm";

    SendData = null;
}

function TermClearSuccess() {
    CallbackData = null;
    for(var i=0; i<Students.length; i++) {
        Students[i][ReportTerm] = 0;
    }
    Application.UpdateAllContent();
    location.href="#ChooseStudentTerm";
}

function editNoteSuccess() {
    CurrentStudent.notes[CurrentEdit.index] = CurrentEdit.note;
    Application.UpdateStudentNotes();
    CallbackData = null;
    CurrentEdit = null;
    location.href="#four";
}

function deleteNoteSuccess() {
    CurrentStudent.notes.splice(CurrentEdit.index,1);
    Application.UpdateStudentNotes();
    CallbackData = null;
    CurrentEdit = null;
    location.href="#four";
}

function editImageSuccess() {
    CurrentStudent.images[CurrentEdit.index] = CurrentEdit.image;
    Application.UpdateStudentsImages();
    CallbackData = null;
    CurrentEdit = null;
    location.href="#four";
}

function deleteSuccess(){

    Students.splice(CallbackData[1],1);
    Application.UpdateAllContent();
    CallbackData = null;

};

// delete table from db
function dropTables() {
    db.transaction(function(tx) {
        tx.executeSql("DROP TABLE Students", [],
            nullHandler,
            errorHandler);
    });
    db.transaction(function(tx) {
        tx.executeSql("DROP TABLE Teacher", [],
            nullHandler,
            errorHandler);
    });
}

function StartDB() {

    if (!window.openDatabase) {
        // not all mobile devices support databases  if it does not, the following alert will display
        // indicating the device will not be albe to run this application
        alert('Databases are not supported in this browser.');
        return;
    }

    // if it does not exist, it will create it and return a database object stored in variable db
    db = openDatabase(shortName, version, displayName,maxSize);
    //Create the table Students in the DB - Primary Key (StudentName) others -> Images and Notes
    db.transaction(function(tx){
        tx.executeSql( 'CREATE TABLE IF NOT EXISTS Teacher(PrimaryKey TEXT NOT NULL PRIMARY KEY, Email TEXT NOT NULL)',[],nullHandler,errorHandler);
        tx.executeSql( 'CREATE TABLE IF NOT EXISTS Students(StudentName TEXT NOT NULL PRIMARY KEY, Images TEXT NOT NULL, Notes TEXT NOT NULL, TermOne INTEGER NOT NULL, TermTwo INTEGER NOT NULL, TermThree INTEGER NOT NULL, TermFour INTEGER NOT NULL, Parent TEXT NOT NULL)',[],nullHandler,errorHandler);
    },errorHandler,successCallBack);
}

//Function lists all database values...
function ListDBValues() {

    if(!window.openDatabase) {
        alert('Databasesa re not supported in this browser');
        return;
    }

    db.transaction(function(transaction) {
        transaction.executeSql('SELECT * FROM Students;', [],
            function(transaction, result) {
                if (result != null && result.rows != null) {
                    for (var i = 0; i < result.rows.length; i++) {
                        var row = result.rows.item(i);
                        //console.log(row.StudentName + '__ ' + row.Images+ '__ ' + row.Parent + '___' + row.Notes + '__ ' + row.TermOne + '__ ' + row.TermTwo + '__ ' + row.TermThree + '__ ' + row.TermFour);
                    }
                }
            },errorHandler);
    },errorHandler,nullHandler);

    db.transaction(function(transaction) {
        transaction.executeSql('SELECT * FROM Teacher;', [],
            function(transaction, result) {
                if (result != null && result.rows != null) {
                    for (var i = 0; i < result.rows.length; i++) {
                        var row = result.rows.item(i);
                        console.log(row);
                    }
                }
            },errorHandler);
    },errorHandler,nullHandler);

    return;
}

//Add Teacher's Email to DB
function AddTeacherEmail(email) {

    var updateStatement = "UPDATE Teacher SET Email = ? WHERE PrimaryKey = 1";

    if (!window.openDatabase) {
        alert('Databases are not supported in this browser.');
        return;
    }

    db.transaction(function(transaction) {
        transaction.executeSql(updateStatement,[email], addTeacherSuccess,errorHandler);
    });

    return false;
}


//Add values/entries to DB
function AddValueToDB(name, images, notes,email) {

    if (!window.openDatabase) {
        alert('Databases are not supported in this browser.');
        return;
    }

    db.transaction(function(transaction) {
        transaction.executeSql('INSERT INTO Students(StudentName, Images, Notes, TermOne, TermTwo, TermThree, TermFour, Parent) VALUES (?,?,?,?,?,?,?,?)',[name, images,notes,0,0,0,0,email], addSuccess,errorHandler);
    });

    //ListDBValues();

    return false;
}

function RemoveStudentFromDB(name) {

    if (!window.openDatabase) {
        alert('Databases are not supported in this browser.');
        return;
    }

    db.transaction(function(transaction) {
        transaction.executeSql('DELETE FROM Students WHERE StudentName=?',[name], deleteSuccess,errorHandler);
    });

   // ListDBValues();

    return false;
}

function UpdateStudentInDB(cName,nName, images, notes) {

    var updateStatement = "UPDATE Students SET StudentName = ?, Images = ?, Notes = ? WHERE StudentName = ?";

    if (!window.openDatabase) {
        alert('Databases are not supported in this browser.');
        return;
    }

    db.transaction(function(transaction) {
        transaction.executeSql(updateStatement,[nName, images, notes, cName], updateSuccess,errorHandler);
    });

   // ListDBValues();

    return false;

}

function UpdateStudentImagesInDB(cName, images, notes) {

    var updateStatement = "UPDATE Students SET StudentName = ?, Images = ?, Notes = ? WHERE StudentName = ?";

    if (!window.openDatabase) {
        alert('Databases are not supported in this browser.');
        return;
    }

    db.transaction(function(transaction) {
        transaction.executeSql(updateStatement,[cName, images, notes, cName], updateImagesSuccess,errorHandler);
    });

    // ListDBValues();

    return false;

}

function UpdateStudentNotesInDB(cName, images, notes) {

    var updateStatement = "UPDATE Students SET StudentName = ?, Images = ?, Notes = ? WHERE StudentName = ?";

    if (!window.openDatabase) {
        alert('Databases are not supported in this browser.');
        return;
    }

    db.transaction(function(transaction) {
        transaction.executeSql(updateStatement,[cName, images, notes, cName], updateNotesSuccess,errorHandler);
    });

    // ListDBValues();

    return false;
}

function UpdateStudentImagesCustomCallbackInDB(cName, images, callback) {

    var updateStatement = "UPDATE Students SET Images = ? WHERE StudentName = ?";

    if (!window.openDatabase) {
        alert('Databases are not supported in this browser.');
        return;
    }

    db.transaction(function(transaction) {
        transaction.executeSql(updateStatement,[images, cName], callback,errorHandler);
    });

    // ListDBValues();

    return false;
}

function UpdateStudentCustomCallbackInDB(cName, images, notes, callback) {

    var updateStatement = "UPDATE Students SET StudentName = ?, Images = ?, Notes = ? WHERE StudentName = ?";

    if (!window.openDatabase) {
        alert('Databases are not supported in this browser.');
        return;
    }

    db.transaction(function(transaction) {
        transaction.executeSql(updateStatement,[cName, images, notes, cName], callback,errorHandler);
    });

    // ListDBValues();

    return false;
}

function UpdateStudentTermCB(cName) {
    var updateStatement = "UPDATE Students SET " + ReportTerm + "= ? WHERE StudentName = ?";

    if (!window.openDatabase) {
        alert('Databases are not supported in this browser.');
        return;
    }

    db.transaction(function(transaction) {
        transaction.executeSql(updateStatement,[1,cName], updateTermSuccess,errorHandler);
    });

    return false;
}

function ClearTerms() {
    var updateStatement = "UPDATE Students SET " + ReportTerm + "= ?";

    if (!window.openDatabase) {
        alert('Databases are not supported in this browser.');
        return;
    }

    db.transaction(function(transaction) {
        transaction.executeSql(updateStatement,[0], TermClearSuccess,errorHandler);
    });

    return false;
}

function UpdateStudentParentEmail(email, cName) {

    var updateStatement = "UPDATE Students SET Parent = ? WHERE StudentName = ?";

    if (!window.openDatabase) {
        alert('Databases are not supported in this browser.');
        return;
    }

    db.transaction(function(transaction) {
        transaction.executeSql(updateStatement,[email,cName], updateEmailSuccess,errorHandler);
    });

    // ListDBValues();

    return false;
}

function PrepDBData(arr) {
    var outputString = "";

    for(var i=0; i<arr.length;i++) {
        if(i == arr.length-1) { outputString+= arr[i] }
        else {
            outputString+= arr[i] + ";";
        }
    }

    return outputString;

}

StartDB();
//AddValueToDB("Fred Pryor", "src/sds.jpg;src/sdsa/jpg", "dis kid such a lil nigger u wldnt believe it bro; ashdasd asdjh asjds a")
//RemoveStudentFromDB("Fred Pryor")
//UpdateStudentInDB("CURRENT NAME", "NEW NAME", "IMAGE;IMAGE;IMAGE", "NOTES;NOTES;NOTES");
//ListDBValues();