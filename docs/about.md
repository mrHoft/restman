### Main route

- [ ] The Main page should contain general information about the developers, project, and course.
> We made Main page with information about us, project and this course.

- [ ] In the upper right corner there are 2 buttons: Sign In and Sign Up.
> Here the Sign In and Sign Up buttons.

- [ ] If the login token is valid and unexpired, the Sign In and Sign Up buttons are replaced with the "Main Page" button.
> When user is signed in, the Sign In and Sign Up buttons are replaced with the "Main Page" and "Logout" buttons.

- [ ] When the token expires - the user should be redirected to the Main page automatically.
> When the token expires, any protected page request redirects to the Main page automatically.

- [ ] Pressing the Sign In / Sign up button redirects a user to the route with the Sign In / Sign up form.
> Here is Sign In and Sign up buttons that opens corresponding pages.

### Sign In / Sign Up

- [ ] Buttons for Sign In / Sign Up / Sign Out are everywhere where they should be.
> // Кто составлял эту дичь?
> This buttons are always accessible for the unauthorized user (показываем на кнопки Sign In, Sign Up).

- [ ] Client-side validation is implemented.
> We implement client-side validation using complex regular expression patterns. Additional validation was implemented at the server side using Zod schema.

- [ ] Upon successful login, the user is redirected to the Main page.
> Upon successful login, the user is redirected to the Main page. This was made by user session control.

- [ ] If the user is already logged in and tries to reach these routes, they should be redirected to the Main page.
> If the user is logged in and tries to reach authorization routes, they redirected to the Main page.

### RESTful client

- [ ] Functional editor enabling query editing and prettifying, request body provided in the URL as base64-encoded on focus out.
> Request body editor have an option for prettifying entered data.
> // "request body provided in the URL as base64-encoded on focus out" << Это что ещё за хрень?

- [ ] Functional read-only response section, with information about HTTP status and the code.
> Here is response section, with status code.

- [ ] Method selector, shows all the valid HTTP verbs, value is provided in the URL on change.
> Changing method leads to switching route in the URL.

- [ ] Input for the URL, entered value is provided in base64-encoded way on change.
> Entered URL is parses to base64-encoded string (кликаем на кнопку Send и показываем на строку адреса)
> // И... я хз что значит "on change" потому что это не реализуемо. Разве что onBlur, но всё равно дичь.

- [ ] Headers section, value is provided in the URL on header add/change.
> Here is the header editor with options to change existing and add new headers.

- [ ] Code generation section.
> In this section user can generate a code to make a request in selected language.

### History route

- [ ] History shows informational message with links to the clients when there are no requests in the local storage.
> History page shows message with links to the REST client when there are no requests in the local storage.

- [ ] User can navigate to the previously executed HTTP request to the RESTful client, HTTP method, URL, body, headers are restored.
> User can navigate to the previously executed HTTP request to the RESTful client with given method, URL, body and headers.

### Variables route

- [ ] Variables show all the added variables, restores them from the local storage on load.
> Variables show all the added variables, restores them from the local storage on load.

- [ ] User can add new, or delete an existing variable, variables in the local storage are updated on change.
> User can add new, or delete an existing variable.

- [ ] Variables are used in the request before the request execution.
> Variables are used in the request before the request execution.

### General requirements

- [ ] Multiple (at lest 2) languages support / i18n.
> Our application supports two languages.

- [ ] Sticky header.
> The header is sticky. Its height can become smaller and applies blur effect to the background. (уменьшаем размер окна чтобы продемонстрировать)

- [ ] Errors are displayed in the user friendly format.
> For the code errors we have error boundary and message component for code execution errors.
