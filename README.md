# Welcome to Viage CLI
This is a companion project to [Viage](https://github.com/schlotg/viage) that allows you to quickly start Viage projects and create components and services. See the [Viage](https://github.com/schlotg/viage) project fro more details.

## Installation
npm install -g viage-cli

## API

### app
This scaffolds out a new Viage Project in the current directory. To be up and running quickly.
``` viage-cli app <name>```

Where /<name/> is name of the project. To alunch the newly created application:
``` cd <name> && npm run start ```

### component
This creates a new component in current project.
``` viage-cli component <name>```

Where /<name/> is the name of the component.

### service
This creates a new service in current project.
``` viage-cli service <name>```

Where /<name/> is the name of the service.
