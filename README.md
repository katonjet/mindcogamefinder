# MindCo GameFinder

This is an internship project to replicate [RAWG.IO](https://rawg.io).

> **WARNING**: This project is still in alpha so expect stuff to be broken :)

### Requirements

> The required packages will be installed and setup for you if you use dev container

- PHP version 8.4 or higher
- Composer version 2.9.5 or higher
- Node JS version 20.19 or higher
- NPM version 9.2 or higer
- MySQL version 8 or higher
- Docker (Dev container setup only)
- DevPod (Dev container setup only)

### Heads up

This project is built in an x86_64 Linux environment with Dev Container setup via VS Codium, Docker and DevPod. Microsoft's Dev Container extentions and VS Code should also work without issues or you can run this project without dev container if you prefer.

Refer to the **php-custom.ini** file if Laravel does not work as expected when running this project in host system(without containerization or virtualization).

# How to get started

Clone this repo:
```bash
    git clone https://github.com/katonjet/mindcogamefinder.git
```

There are 2 project folders in here:
- Cortex (Laravel based backend)
- Campus (Next.js based frontend)

Both must be running for the project to work. Tip: Use 2 terminal windows.

You will need to setup each project in the given order of the HOW-TO steps.

## HOW-TO setup Cortex (Laravel)

> **IMPORTANT**: (For non-Dev container setup only) MySQL must be run before running Laravel server. Refer to ```@/cortex/.env``` and ```@/docker-compose.yml``` file for credential setup.

Go into the project folder:
```bash
    cd cortex
```

Then install dependencies using composer and npm:
```bash
    composer install && npm install
```

Next, setup the database:
```bash
    php artisan migrate # init DB and schemas
    php artisan db:seed --class=UserSeed # load preset user
```

Next, setup the configs:
```bash
    php artisan config:clear
    php artisan config:cache
```

Next, write [Laravel environment file](#laravel-environment-file) to ```.env``` file. You will also need to **ENTER THE PROVIDED API KEY FROM RAWG.IO** to the same ```.env``` file as this will download game data.

Lastly, run the Laravel server (Use only this step after setup):
```bash
    composer run dev # or php artisan serve
```
> **WARNING**: Stick with either ```compose``` or ```php artisan``` command in dev container setup. Running both commands interchangably can cause port 8000/tcp not being used.

## HOW-TO setup Campus (Next.js)

Go into the project folder:
```bash
    cd campus
```

Then install dependencies using npm:
```bash
    npm install
```

Next, write [Next.js environment file](#nextjs-environment-file) to ```.env``` file.

Lastly, run the Next.js server (Use only this step after setup):
```bash
    npm run dev
```

## HOW-TO test site

Visit [http://localhost:3000](http://localhost:3000) and feel free to explore.

> **IMPORTANT**: Visiting for the first time will take a while to load due to the download process.

### User credentials for testing (from seeding)
```
    Username: applepie@example.com
    Password: password134
```

# Environment files

### Laravel Environment file
```.env
APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:/vHoGXFSXbupqZc6gZ71iZ3kfgITPiaYc/muCjouI5g=
APP_DEBUG=true
APP_URL=http://localhost:8000

APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en_US

RAWG_KEY=`RAWG API KEY` #See API docs of RAWG.IO

APP_MAINTENANCE_DRIVER=file
# APP_MAINTENANCE_STORE=database

# PHP_CLI_SERVER_WORKERS=4

#SANCTUM
SESSION_DOMAIN=localhost
SANCTUM_STATEFUL_DOMAINS=localhost:3000
FRONTEND_URL=http://localhost:3000

BCRYPT_ROUNDS=12

LOG_CHANNEL=stack
LOG_STACK=single
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=cortex
DB_USERNAME=root
DB_PASSWORD=

SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=null

BROADCAST_CONNECTION=log
FILESYSTEM_DISK=local
QUEUE_CONNECTION=database

CACHE_STORE=database
# CACHE_PREFIX=

MEMCACHED_HOST=127.0.0.1

REDIS_CLIENT=phpredis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=log
MAIL_SCHEME=null
MAIL_HOST=127.0.0.1
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

VITE_APP_NAME="${APP_NAME}"
```

### Next.js Environment file
```.env
NEXT_TELEMETRY_DISABLED=1 # Turns off data collection
NEXT_PUBLIC_AXIOS_BASE_URL=http://localhost:8000 # for @/lib/axios.ts file
```