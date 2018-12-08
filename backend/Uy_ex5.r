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
        #Thanks to Kitz Quiachon for teaching me how to paste
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
  
  solset <- list(coefficients=result$solutionSet,f=eval(parse(text=fx)))
  
  return(solset)
}

ModAugCoeffMatrix <- function(equations){
  dnames <- c()
  
  for(i in 1:((length(equations)+1)/3)){
    dnames <- c(dnames,paste("a",i,sep=''),paste("b",i,sep=''),paste("c",i,sep=''))
  }
  dnames <- c(dnames[2:length(dnames)],"RHS")
  print(dnames)
  
  #mat <- matrix(ncol = length(equations)+1, nrow = length(equations) )
  
}