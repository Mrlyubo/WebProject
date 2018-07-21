RESTFUL routers:

name    url       verb     desc.
=========================================================
INDEX  /dogs      GET      Display a list of all dog
NEW    /dogs/new  GET      Displays form to make a new dog
CREATE /dogs      POST     Add new dog to DB
SHOW   /dogs/:id  GET      Shows info about one dog

##Auth Pt. 1 - Add User Model
 * Install all packages needed for auth
   (npm i passport passport-local passport-local-mongoose express-session --save)
 * Define User model
##Auth Pt. 2 - Register
 * Configure Passport
 * Add register routes
 * Add register template
##Auth Pt. 3 - Login 
 * Add login routes
 * Add login template
##Auth Pt. 4 - Logout/Navbar
 * Add logout route
 * Prevent user from adding a comment if not signed in
 * Add links to navbar
 * Show/hide auth links correctly
 
##Auth Pt. 5 - Show/Hide links
 * Show/Hide auth links in navbar correctly.  
 
 
   