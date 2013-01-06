function EditChangeName(){

    var NewName = $('#NewNameInput').val();

    if(NewName != "") {
        UpdateStudentInDB(CurrentStudent.name, NewName, PrepDBData(CurrentStudent.images), PrepDBData(CurrentStudent.notes));
        CallbackData = NewName;
    }
}

