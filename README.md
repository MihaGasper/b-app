###### DEMO VERSION ONLY for BETTER HIRE TEST APP

This is a object storage app. App provides a way to list, add and remove buckets as well as add, list and remove objects from a bucket. It also renders object and bucket details.

For working app (and pass the tests), correct API URLs must be inserted. For demo purposes I added mock www.better.si API URL, which doesn't return anything.

Main features are lazy loading modules, stateless/stateful components, unit tests. Implementing extra RxJS for cross component communication would be an overkill for this kind of app.

Demo can be done on tech hire meeting. Wireframes in pdf are included.

###### Docker (works only with correct API URL)

Run `docker-compose up -d  --build` Navigate to _http://localhost:4200_.

###### Run locally (works only with correct API URL)

Run `npm i && ng serve`

###### Run tests (works only with correct API URL)

Run `npm i && ng test`
