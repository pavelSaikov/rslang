# rslang

Before coding be sure that you've installed following plugins for your IDE:

1. [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
2. [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
3. [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
4. [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)

## Git

All branches have to be created from **dev** branch. You have to create pull request in order to merge your changes. Pushing in **master** and **dev** branch is forbidden.

Branch prefixes and commit messages:

1. **fix** - for bug fixes. Branch: **fix/responsive-layout**, commit: **fix: adapt header view for mobiles**
2. **feat** - for features. Branch: **feat/puzzle-game**, commit: **feat: implement puzzle game**
3. **chore** - for some random work e.g. modules update, change webpack configuration and so on. Branch: **chore/add-ci**, commit: **chore: add continuous integration config**

## Development

1. Run **npm ci** command in order to install dependencies (**NOTE**: not npm install).
2. Create **.env** file in the root directory. Copy all content from **.env.example** and paste it inside **.env**. Replace some fields if it required.
3. Run **npm start** command to start dev-server.
