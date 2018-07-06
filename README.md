# Welcome to Viage CLI
This is a companion project to [Viage](https://github.com/schlotg/viage) that allows you to quickly start Viage projects and create components and services. See the [Viage](https://github.com/schlotg/viage) project for more details.

## Installation
npm install -g viage-cli

## API

### app
This command scaffolds out a new Viage Project in the current directory.
``` viage app <name>```

Where ```name``` is name of the project. To launch the newly created application:
``` cd <name> && npm run start ```

### component
This command creates a new component in the current project.
``` viage component <name>```

Where ```name``` is the name of the component.

### service
This command creates a new service in current project.
``` viage service <name>```

Where ```name``` is the name of the service.

## Troubleshooting
If the installation fails or the cli just isn't working, try moving the package and then re-installing:

```
npm rm -g viage-cli
npm install -g viage-cli
```

## Viage Apps
When a viage app is created there are several npm commands built into the package.json script section. Open a terminal in the newly created Viage app's directory, and then you can type the following commands:

### start
``` npm run start ```
This command kicks off a development build and then launches the development server and a opens a tab in the web browser pointing to your app. Changes made in code will be automatically be served to the browser on every save.

### build
``` npm run build ```
This command compiles a production build. The results of that build will be in the **dist/** folder.

## build-embedded
``` npm run build-embedded ```
This command does a production build but then also embeds the compiled source into the HTML document so only one file is served. This new html file will be called **index-embedded.html**

## How to Viage
For more information on how to Viage, go to the [Viage page](https://github.com/schlotg/viage) or the [Viage Shopping List Tutorial](https://github.com/schlotg/viage-shopping-list)