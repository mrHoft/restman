### Main route
- We made Main page with information about us, project and the course.
- Sign In and Sign up buttons that opens corresponding pages.
- When user is signed in, the Sign In and Sign Up buttons are replaced with the "Main Page" and "Logout" buttons.
- When the token expires, any protected page request redirects to the Main page automatically.

### Sign In / Sign Up
- This buttons are always accessible for the unauthorized user.
- We implement client-side validation using complex regular expression patterns. Additional validation was implemented at the server side using Zod schema.
- Upon successful login, the user is redirected to the Main page. This was made by user session control.
- If the user is logged in and tries to reach authorization routes, they redirected to the Main page.

### RESTful client
- Changing method leads to switching route in the URL.
- Entered URL is parses to base64-encoded string.
- Header editor with options to change existing and add new headers.
- Request body editor have an option for prettifying entered data. Entered body places to the URL as base64-encoded.
- Read-only response section with status code.
- User can generate a code to make a request in selected language.

### History route
- History page shows message with links to the REST client when there are no requests in the local storage.
- User can navigate to the previously executed HTTP request to the RESTful client with given method, URL, body and headers.

### Variables route
- Variables show all the added variables, that restores them from the local storage on load.
- User can add new, or delete an existing variable.
- Variables are used in the request before the execution.

### General requirements
- Our application supports two languages.
- The header is sticky. Its height becomes smaller and applies blur effect to the background.
- For the code errors we have error boundary and message component for the code execution errors.
