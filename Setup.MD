## Setup

### webapp

From the root of the `webapp` directory install the node dependencies using the command bellow

```Bash
npm ci
```

and build the docker image for the webapp container using the command bellow from the root of the `webapp` directory

```Bash
docker build -t webapp:latest .
```

### api.orders

To build the docker image for api.orders run the command bellow from the root of the `api/orders` directory

```Bash
docker build -t api.orders:latest .
```

### api.products

To build the docker image for api.products run the command bellow from the root of the `api/products` directory

```Bash
docker build -t api/products:latest .
```


### Starting the application

To start application run the following command from the root directory

```Bash
docker compose up -d
```

To connect to the app go to [http://localhost:80](http://localhost:80)


## Testing

Both webapp and api.orders have tests written, webapp uses jest and api.orders uses pytest.

### Testing webapp

To run the jest tests run the following command at the root of the `webapp` directory

```Bash
npm run test
```

### Testing api/orders

To run the pytests from the root directory run the following commands

```Bash
docker compose exec -it api-orders bash
python -m pytest tests/ # from within the container
```

### Testing api/products

To run the pytests from the root directory run the following commands

```Bash
docker compose exec -it api-products bash
python -m pytest tests/ # from within the container
```