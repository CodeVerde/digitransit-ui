## Digitransit-ui deployment via Kontena
You can run Digitransit-ui docker kontainer using Kontena microservices platform.

## Prerequisites
- Kontena x.x
- Kontena CLI. available for Unix, macOS and Windows

## Kontena deployment
- Deployment descriptor is the kontena.yml
- Used domain(s) must be written manually to FRONT_SERVICE_DOMAIN vault variable
- Let's Encrypt certs are used, it's set to SSL_LOAD_BALANCER_CERT_BUNDLE vault variable, see Kontena docs for more information

### Deployment in testing
- TBA

### Deployment in production
- TBA

## Notes
- See also the [kontena-ui docker documentation](docs/Docker.md)
