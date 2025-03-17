# Cheat Sheet

1. Initialize project 
   1. Initialize node package `npm init -y`
   2. Install nodemon `npm i -D nodemon`
   3. Add start scripts
   4. Add initial folder structure
   5. Change module type
   6. Add debuging
   7. Add env variable file
   8. Install dotenv `npm i dotenv`
2. Setup Express
   1. Install `npm i express`
   2. Add static resources
   3. Configure static middleware
   4. Add body parser
   5. Add moduler routers
3. Setup handlebars
   1. Install handlebars `npm i express-handlebars`
   2. Add view engine
   3. Set view engine
   4. Add home view
   5. Add layout
   6. Add partials dir
   7. Add dynamic title
4. Database
   1. Intall mongoose `npm i mongoose`
   2. Connect to local DB
   3. Add User model
5. Authentication
   1. Fix naviation links
   2. Add auth controller
   3. Add auth service
   4. Register
      1. Render Register Page
      2. Post action
      3. Instal bcrypt `npm i bcrypt`
      4. Hash password
      5. Check for password mismatch
      6. Check if user already exists
   5. Login
      1. Install jsonwebtoken `npm i jsonwebtoken`
      2. Convert jsonwebtoken to promise based lib
      3. Install cookie-parser `npm i cookie-parser`
      4. Add cookie-parser middleware
      5. Add Login Page
      6. Add login post action
      7. Add authService login method
      8. Generate jwt
      9. Return jwt with http only cookie
      10. Auto login on register
   6. Logout
6. Authorization
   1. Add auth middleware
   2. Add route guard
7. Error Handling
   1. Add error notification
   2. Add error message util
   3. Handle register errors
   4. Handle login errors
8. Dynamic navigation