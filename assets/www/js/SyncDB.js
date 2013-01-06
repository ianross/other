/**
 * Created with JetBrains WebStorm.
 * User: Ian
 * Date: 11/08/12
 * Time: 1:21 PM
 * To change this template use File | Settings | File Templates.
 */

//AddValueToDB("Fred Pryor", "src/sds.jpg;src/sdsa/jpg", "dis kid such a lil nigger u wldnt believe it bro; ashdasd asdjh asjds a")
//RemoveStudentFromDB("Fred Pryor")
//UpdateStudentInDB("CURRENT NAME", "NEW NAME", "IMAGE;IMAGE;IMAGE", "NOTES;NOTES;NOTES");
//ListDBValues();

//Function Updates Local Array with Database information
function SyncDB() {

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
                        var sContainer = {name:null, images:[], notes:[]};
                        sContainer.name = row.StudentName;
                        sContainer.images = ParseDBString(row.Images,[]);
                        sContainer.notes = ParseDBString(row.Notes,[]);
                        sContainer.TermOne = row.TermOne;
                        sContainer.TermTwo = row.TermTwo;
                        sContainer.TermThree = row.TermThree;
                        sContainer.TermFour = row.TermFour;
                        sContainer.Parent = row.Parent;
                        var success = Students.push(sContainer);
                    }
                }
            },errorHandler);
    },errorHandler,nullHandler);

    return;
}

function ParseDBString(string, arr) {
    if(string != "") {
        var trySplit = string.split(";");
        for(var i=0; i<trySplit.length; i++) {
            arr[i] = trySplit[i];
        }
    }

    return arr;
}

function win(file) {
    var reader = new FileReader();
    reader.onloadend = function(evt) {
        console.log("read success");
        console.log(evt.target.result);
    };
    reader.readAsText(file);
};

//entry.file(win, fail);

SyncDB();

function success() {
    console.log("SUCCESS");
}

function fail() {
    console.log("FAIL");
}
