function RemoveStudent(e){

    var array_index = e.target.getAttribute("number");
    if(CurrentStudent == Students[array_index]) { CurrentStudent = {name: "No Student Selected", images: [], notes: []}; }

    CallbackData = [Students[array_index], array_index];
    RemoveStudentFromDB(CallbackData[0].name);
}



function RemoveNote(e) {
    //Splice array to copy... then remove then attempt then BAM
}




