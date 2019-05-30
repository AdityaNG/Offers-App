# Offers-App by Aditya N G
- Web App to display offers sorted by Stores and Area Code
- Rest API Implemented at /api/
- Search, Browse and Upload Offers,
- Rich Dummy Data fills the UI

# Getting Started
1. Clone the Repository
2. cd into the directory
3. run `node app.js`

# Files Breakdown
### app.js
Main App file
Handles :
1. Listening to the exposed api endpoints for requests
2. Request Error Handling
3. Serving the Single Page Web App

### db.js
Database wrapper for the App
Handles :
1. Database CRUD requests
2. Generates Dummy Data

### index.html
The Single Page Web App. Handles the UI and all the client-side requests

### stores_databse.json
The database itself. It contains all the entries. It can be deleted. To regenerate it, call `populateDB()` from db.js at the `db.loadDatabase` callback

# Screenshots
![](https://raw.githubusercontent.com/AdityaNG/Offers-App/master/Screenshots/0.png)
![](https://raw.githubusercontent.com/AdityaNG/Offers-App/master/Screenshots/1.png)
![](https://raw.githubusercontent.com/AdityaNG/Offers-App/master/Screenshots/2.png)
![](https://raw.githubusercontent.com/AdityaNG/Offers-App/master/Screenshots/3.png)
![](https://raw.githubusercontent.com/AdityaNG/Offers-App/master/Screenshots/4.png)
![](https://raw.githubusercontent.com/AdityaNG/Offers-App/master/Screenshots/5.png)
![](https://raw.githubusercontent.com/AdityaNG/Offers-App/master/Screenshots/6.png)
![](https://raw.githubusercontent.com/AdityaNG/Offers-App/master/Screenshots/7.png)
![](https://raw.githubusercontent.com/AdityaNG/Offers-App/master/Screenshots/8.png)