| Command      | Runs                                                  | Description                                                                       |
| :----------- | :---------------------------------------------------- | --------------------------------------------------------------------------------- |
| `start`      | `yarn workspace cms start & yarn workspace web start` | Starts the Sanity Studio and Astro web server for local development.              |
| `start:web`  | `yarn workspace web start`                            | Starts the Astro web server for local development.                                |
| `start:cms`  | `yarn workspace cms start`                            | Starts the Sanity studio for local development.                                   |
| `build`      | `yarn workspace cms build & yarn workspace web build` | Builds the Sanity studio and Astro site for deployment.                           |
| `build:web`  | `yarn workspace web build`                            | Builds the Sanity studio for deployment.                                          |
| `build:cms`  | `yarn workspace cms build`                            | Builds the Astro site for deployment.                                             |
| `web:serve`  | `yarn workspace web preview`                          | Serves the locally built Astro site from `web/dist`                               |
| `cms:deploy` | `yarn workspace cms deploy`                           | Deploys all local changes to the remote Sanity studio. Will affect the live site! |
