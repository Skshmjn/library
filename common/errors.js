
function ErrorMessage(message, errorCode){
    this.message = message
    this.errorCode = errorCode
}

errors = {}
errors.ProvideRequiredParmeters = new ErrorMessage("Please provide all the required Parameters",1);
errors.SomeErrorOccurred = new ErrorMessage("Some error occurred", -1);
errors.NoDataFound = new ErrorMessage("No Data Found", 3);
errors.NoNewRecordCreated = new ErrorMessage("Couldn't Create New Record", 4);
errors.UpdateFailed = new ErrorMessage("Update Failed", 5);
errors.DeleteFailed = new ErrorMessage("Delete Failed", 6);



module.exports = errors