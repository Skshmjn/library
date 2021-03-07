
function SuccessMessage(message, successCode){
    this.message = message
    this.successCode = successCode
}

success = {}
success.Success = new SuccessMessage("Succesful",101);
success.NewBookCreated = new SuccessMessage("Created New Book Record",102);
success.UpdateSuccesful = new SuccessMessage("Updated Book Record",103);
success.DeleteRecord = new SuccessMessage("Deleted Book Record",104);





module.exports = success