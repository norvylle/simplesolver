this.dir <- dirname(parent.frame(2)$ofile)
setwd(this.dir)

REGRESSION <- 1
QSI <- 2

GaussJordanElimination <- function(result){
  a <- result$augcoeffmatrix
  n <- length(a[1,])-1 #rows
  m <- length(a[,1]) #columns
  
  if(m != n) return(NA)
  for(i in 1:n) {
    if(max(abs(a[i:n,i])) == 0){
      return(list(solutionSet=NA,variables=result$variables,matrix=result$augcoeffmatrix))
    }
    else if(a[i,i] != max(abs(a[i:n,i]))){
      for (h in i:n) {
        if(a[h,i] != max(abs(a[i:n,i]))) next
        else{
          #swap
          temp <- a[h,]
          a[h,] <- a[i,]
          a[i,] <- temp
        }
      }
    }
    a[i,] = a[i,] / a[i,i]
    for(j in 1:m) {
      if(i == j){
        next
      }
      NR = a[j,i] * a[i,]
      a[j,] = a[j,] - NR
    }
  }
  vc <- as.vector(a[,n+1])
  temp = list(solutionSet=vc,variables=result$variables,matrix=a)
  return(temp)
}

RegAugCoeffMatrix <- function(x,y,n){
  vec <- c()
  rnames <- c()
  cnames <- c()
  for (i in 0:(n)) { #row
    for(h in 0:(n)){
      vec <- c(vec,sum((x^(i+h))))
      if(i == n){
        cnames <- c(cnames,as.character(h+1))
        if(h < n+1) rnames <- c(rnames,paste("x^",as.character(h),sep=''))
      }
    }
    vec <- c(vec,sum(y*(x^i)))
  }
  rnames <- c(rnames,"RHS")
  mat <- matrix(vec,ncol=n+2,nrow=n+1,byrow=TRUE,dimnames=list(cnames,rnames))
  result <- list(variables=rnames,augcoeffmatrix=mat)
  solset <- GaussJordanElimination(result)
  return(solset)
}


PolynomialRegression <- function(x,y,degree){
  
  if(degree < 1) return(NA)
  result <- RegAugCoeffMatrix(x,y,degree);
  fx <- "function(x)";
  
  
  for(i in 1:length(result$solutionSet)){
    if(i == length(result$solutionSet)){
      fx <- paste(fx," ",result$solutionSet[[i]]," * ",result$variables[[i]],sep='')
    }
    else{
      fx <- paste(fx," ",result$solutionSet[[i]]," * ",result$variables[[i]]," +",sep='')
    }
  }
  
  #solset <- list(coefficients=result$solutionSet,f=eval(parse(text=fx)))
  
  #return(solset)
  return(eval(parse(text=fx)))
}

ModAugCoeffMatrix <- function(equations){
  dnames <- c()
  
  for(i in 1:((length(equations)+1)/3)){
    dnames <- c(dnames,paste("a",i,sep=''),paste("b",i,sep=''),paste("c",i,sep=''))
  }
  dnames <- c(dnames[2:length(dnames)],"RHS")
  mat <- matrix(0,ncol = length(equations)+1, nrow = length(equations), dimnames = list(1:(length(equations)),dnames))
  
  col <- 1
  for(f in equations){
    item <- strsplit(f," ")
    index <- 1
    
    while(index <= length(item[[1]])){
      if(index == length(item[[1]])){
        mat[col,"RHS"] <- as.numeric(item[[1]][index])
        break
      }
      else{
        index <- index+2
        mat[col,item[[1]][index-2]] <- as.numeric(item[[1]][index])
      }
      index <- index + 2
    }
    col <- col + 1
  }
  result <- list(variables=dnames,augcoeffmatrix=mat)
  solset <- GaussJordanElimination(result);
  return(solset)
}

quadraticSpline <- function(data){
  n <- length(data[,1])
  equations <- list()

  for (i in 3:n ) {
    if(i-2 == 1){
      temp <- paste("b",sep = '')
      temp2 <- temp
    }
    else{
      temp <- paste("a",i-2," * ",data[i-1,1]^2," + b",sep = '')
      temp2 <- paste("a",i-2," * ",data[i-1,1]*2," + b",sep = '')
    }
    x1 <- paste(temp,i-2," * ",data[i-1,1]," + c",i-2," * 1 = ",data[i-1,2],sep='')
    x2 <- paste("a",i-1," * ",data[i-1,1]^2," + b",i-1," * ",data[i-1,1]," + c",i-1," * 1 = ",data[i-1,2],sep='')
    x3 <- paste(temp2,i-2," * 1 + a",i-1," * ",-(data[i-1,1]*2)," + b",i-1," * -1 = 0",sep='')
    equations <- c(equations,x1,x2,x3)
  }
  x4 <- paste("b1 * ",data[1,1]," + c1 * 1 = ",data[1,2],sep='')
  x5 <- paste("a",n-1," * ",data[n,1]^2," + b",n-1," * ",data[n,1]," + c",n-1," * 1 = ",data[n,2],sep='')
  equations <- c(equations,x4,x5)

  solset <- ModAugCoeffMatrix(equations)
  vars <- c(0,solset$solutionSet)
  fxs <- c()
  
  i <- 1
  while(i <= length(vars)){
    fx <- "function(x)";
    fx <- paste(fx," x^2 * ",round(vars[i],4)," + x * ",round(vars[i+1],4)," + ",round(vars[i+2],4),sep='')
    fx <- eval(parse(text=fx))
    fxs <- c(fxs,fx)
    i <- i + 3
  }
  return(fxs)
}

fileHandler <- function(data){
  for(i in data){
    for(h in i){
      if(is.na(h)){
        return(FALSE)
      }
    }
  }
  return(TRUE)
}

uploadHandler  <- function(filename, request, degree){
  data <- read.csv(file=filename,header = FALSE , sep =",")
  if(fileHandler(data)){
    if(request == 1){
      #Regression
      fx <- PolynomialRegression(data[,1],data[,2], degree);
      return(fx)
    }
    else if(request == 2){
      #QSI
      fx <- quadraticSpline(data)
      return(fx)
    }
    else{
      return(warning("Invalid Request"))   
    }
  }else{
    return(warning("Error on CSV File")) 
  }
}


#quadraticSpline("data.csv")
#uploadHandler('../uploads/data.csv',REGRESSION,2)