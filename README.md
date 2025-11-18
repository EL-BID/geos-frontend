# Guia Edutec Repository - Open Source

## Front-end project

- [Technical Documentation](https://github.com/EL-BID/geos-frontend/blob/master/Documentaci%C3%B3n_T%C3%A9cnica_Guia_Edutec.pdf)

Access to other projects

- [Back-end](https://github.com/EL-BID/geos-backend)
- [Database](https://github.com/EL-BID/geos-database)

---

## Troubleshooting

Make sure `docker-compose.yml` has network `geos-network` created.

```
networks:
  geos-network:
```

## Dev environment

Requires NodeJS 13.14.0

```
npm i
node run start
```

---

_The Guia Edutec was originally developed by CIEB. The process of opening the code has made possible by financial support of Fundación ProFuturo._
