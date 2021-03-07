var customException = require('./custom_exception')

function successResponse(success,data) {

    result = {}
    result['success'] = true
    result['message'] = success['message']
    result['success_code'] = success['successCode']
    result['data'] = data
    
    return result
  
}
  
function errorResponse(error,code) {
  
    result = {}
    result['success'] = false
    result['error'] = error['message']
    result['error_code'] = error['errorCode']
    return result
    }
    
  


function checkIfPresent(...args) {
  var result = args.every(isPresent)

  if (result == false) {
    throw new customException(errors.ProvideRequiredParmeters)
  }

}

function isPresent(value) {
    return !(value == null || value == '' || value == undefined)
}
module.exports.successResponse = successResponse;
module.exports.errorResponse  = errorResponse;
module.exports.checkIfPresent = checkIfPresent;
