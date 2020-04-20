# Adelear Web Application

Adelear Webapp requires [Node.js](https://nodejs.org/) v10+ to run.

### How to run the application

All commands are run from the root of the Web/ directory. View the package.json scripts property to see all available commands. Only one command is needed to clean, build, and serve the app in both dev and prod:

###### For development environments
```sh
$ npm run start:dev
```

Visit [localhost:8080](http://localhost:8080/) to see local instance.

####### React devtools
React devtools are included in the application's package.json. They will automatically open when you start the dev server with the command listed above. You can manually open them with ```npm run open:devTools```

###### For production environments
```sh
$ npm start
```

Visit [localhost:3000](http://localhost:3000/) to see prod version.