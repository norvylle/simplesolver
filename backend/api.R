source("test.R")

#' @filter cors
cors <- function(req, res) {
  
  res$setHeader("Access-Control-Allow-Origin", "*")
  
  if (req$REQUEST_METHOD == "OPTIONS") {
    res$setHeader("Access-Control-Allow-Methods","*")
    res$setHeader("Access-Control-Allow-Headers", req$HTTP_ACCESS_CONTROL_REQUEST_HEADERS)
    res$status <- 200 
    return(list())
  } else {
    plumber::forward()
  }
  
}


#' Echo the parameter that was sent in
#' @param msg The message to echo back.
#' @get /
#' @html
function(){
  "<html><h1>API is working...</h1></html>"
}

#' @param degree
#' @post /polyreg
#' @json
function(req,degree){
  file <- list(formContents = Rook::Multipart$parse(req))
  fx <- uploadHandler(file$formContents$upload$tempfile,REGRESSION,as.numeric(degree))
  list(fx)
}

#' @post /qsi
#' @json
function(req){
  file <- list(formContents = Rook::Multipart$parse(req))
  fx <- uploadHandler(file$formContents$upload$tempfile,QSI,NULL)
  list(fx)
}