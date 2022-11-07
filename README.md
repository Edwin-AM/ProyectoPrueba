# Time Tracker Frontend

## Table of Contents
1.  [Prerequisites](#prerequisites)
2.  [General](#general)
3.  [Add Routes](#add-routes)
4.  [Protect Routes](#protect-routes)
5.  [Add Items](#add-items)
6.  [Hide Items](#hide-items)
7.  [Common Components](#common-components)
8.  [Refresh Token](#refresh-token)
9.  [Create a Component](#create-component)
10. [Create a Service](#create-service)
11. [Validations Library](#validations)
12. [Toasts Library](#toasts)
13. [Util Folder](#util-folder)
14. [Store File](#store-file)


## Prerequisites

- Requires Node.js version 16.16.0 or above.
   - Link to download: https://nodejs.org/en/download/ 
   - You can manage multiple versions of Node on the same machine with nvm: https://github.com/coreybutler/nvm-windows/releases
- To install Vue, use the following command:
   - npm install -g @vue/cli
- You need to install node_modules with the next command:
   - npm install

- Create environment file to connect the Front End and the Back End.

    1. Add file **.env.development** or **.env.production**  in ./ root, and add this variable.
        * VITE_API_URL = yourAddress/api/

    2. Create this file **.env.development** to start the project with the command. 
        * npm run dev


## General 

- You can clone the repository with GitHub Desktop, Sourcetree, CMD or others. 
If you clone the repository with CMD, you need to use this command:
git clone https://github.com/Nearlinx/TimeTrackerFE.git

- You can see the documentation about the template in the "Doc" option in the menu.



## Add Routes

1. Go to "src/router/index.js" and import the new view. 
2. Add a specific route of the import in the children section (remember add path, meta, component, name and if necessary children).  


## Protect Routes

1. Add the new role in "src/util/Role/constants.js" and export this role. 
2. Go to "src/router/index.js" and search the route that need protection.
3. Add in specific meta the new role.


## Add items to the menu

1. Go to "src/layout/Sidebar.vue" and use the router-link tag.
2. You need to go to "src/assets/iconsmind/iconsmind.css" and search an icon about the new module.
3. Go back to the router-link tag and add the name of the icon in:  
```
<i class= "NAME_ICON ...">
```


## Hide the items on the menu

1. Add the new role in "src/util/Role/constants.js" and export this role (if the role exists you shouldn't add this role). 
2. Go to "src/layout/Sidebar.vue", go to the import sections with the comment "ROLE IMPORTS" and add the new role.
3. Go to the specific router-link and add the next part:
    - v-if="hasAuthorization(SPECIFIC ROLE)"


## Common Components

This folder has general components:

- Breadcrumbs file has code about breadcrumbs (search if neccesary), this code doesn't work because it has not been implemented in the project yet.
    - Link to breadcrumbs: https://medium.com/@fagnersaraujo/automated-breadcrumbs-with-vuejs-7e1051de8028

- ConfirmationModal file has code about one modal when it is neccesary to delete any record in the tables with delete button. Add the next part and change the specific information:

```vue
<confirmation-modal
    v-if="modalIsOpen"
    actionType="delete" titleText="Delete..." bodyText="Are you sure you want to delete..." :itemName="...SelectedToDelete.property"
    @confirmation="(value) => delete...(value, ...SelectedToDelete.id)">
</confirmation-modal>
```

- RoleList file allows to use in "views/components/users/InfoUser" to watch all roles in a dropdown. This file contains all user's roles and compare the current roles and the new roles if necessary to update a new user. 


## Refresh Token

You can see the refresh token flow in the following image:

![alt text](https://www.bezkoder.com/wp-content/uploads/2021/07/vue-refresh-token-axios-jwt-example-flow.png)

- User login
    1. In the "src/services/auth.service.js" file, you can see the first step of the image. In the "AuthService" class contains the login method and this method uses axios and makes to post in the backend. 
    2. The backend receives the user data. 
    3. In the "AuthService" class receives the user's information (token, refreshtoken and roles) 
- Access resource with expired token 
    1. The user uses the application and sends request to backend.  
    2. The backend checks if this token is valid. 
    3. If the token is not valid so the backend return 401. 
- Token Refresh
    4. In the "src/services/api.service.js" file, you can see the interceptor.response. If response from the api is 401 so this sends a post with headers (refreshtoken) to backend. 
    5. The backend valids that the refreshtoken. 
    6. The frontend recieves a new token and refreshtoken.    
- Access resource with new token 
    7. The user uses the application and sends request to backend with a new token and refreshtoken.   


## Create a Component

1. Go to "src/views/components", create a folder and add module name. 
2. Create a file depending on functionality.
3. Remember to add this new view in "src/router/index.js". 


## Create a Service

1. Go to "src/services", create a file. 
2. Import the Axios.
3. Create a class and the methods that you need. 
4. Finally, you need to export the class. 


## Validations Library 

1. Import the library in the file. 
2. You can add validator functions in the import. 
    - Example: import { helpers, required, email, minLength, sameAs } from "@vuelidate/validators"; 
3. Add a method called validations. 
    - Example: 
        ``` javascript
        validations(){
            return{
                userName: {
                    required: helpers.withMessage("Username is required", required),
                    minLength: minLength(3)
                },
                email: {
                    required: helpers.withMessage("Email is required", required),
                    email: helpers.withMessage("Email should be in this format: example@domain.com", email)
                }
            }
        }
        ```
4. In the template you must add the next span tag. 
    Example:
```javascript
<span v-if="v$.userName.$error">
        {{ v$.userName.$errors[0].$message }}
</span>
```

Note: Take into consideration that the names you use in the validations must be the same as in the data.

5. Link to vuelidate: https://learnvue.co/tutorials/intro-to-vuelidate#displaying-error-messages-from-vuelidate


## Toasts Library

1. In the "src/main.js" you can see the general configuration about toast. 
2. Usage example. 
    ``` javascript
    this.$toast.success("Some Text")
    this.$toast.error("Some Text")
    ```

3. Link to Toast Notification: https://ankurk91.github.io/vue-toast-notification/


## Util Folder

1. Helpers folder. 
Go to 'src/util/helpers/utilities.js'
    - compareObjects(object1, object2)
        Used to compare two objects.
    - compareArrays(array1, array2)
        Used to compare two arrays. 
    - formatDate(date)
        Used to format date using the es-es format. 

Note: This two (compareObjects and compareArrays) methods can be used in combination to compare arrays of objects.

Remember to export all functions defined in this file.

2. Constants
File to define date format constants. 


## Store File

- In this class we define the mutations that are in charge of handling all the authentication data based on the login and logout actions.
- Mutations have two methods (setToken, setRefreshToken), these help to set the actual token or refresh token.  
