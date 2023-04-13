## About 💻
Utility app for comparing prices on raspberry pi's with an intuitive UI and fast and easy searching with filters

## Installation ⚙
### All you need is docker compose
#### Starts the dev server
```
docker compose up -d
```
#### Starts the dev client
```
make dev
```
## Tests
- Only frontend tests are implemented
- Need to test the backend more
```
make test
```

## Running things manually ⚙
### Starts every scraper
```
make run_scrapers
```
### Starts the erelement scraper 
```
make run_erelement
```
### Starts the robotev scraper 
```
make run_robotev
```
### Starts the mobilestore scraper 
```
make run_mobilestore
```
