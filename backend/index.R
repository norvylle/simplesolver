setwd("~/Documents/CMSC150/project/backend")
pr <- plumber::plumb("api.R")
pr$run(port = 8080)