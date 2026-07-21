# Boutique Library

## Stack
FE: React 19 + TS + Vite 7 + MUI 7 + React Router 7 + RHF + Yup + Axios
BE: Spring Boot + H2 + JPA + MapStruct (port 8089)
API base: `http://localhost:8080/api`

## Project Layout
```
client-React/src/
  components/  — UI (Header, Footer, Home, BooksDisplay, Login, SignUp, Admin, UsersDisplay, ShowMyLends, AddNewBook, AddNewAdmin, AddComment, Enter, SingleBook)
  server/api.ts — All API wrappers (CRUD: books, users, lends, comments, categories)
  models/      — TS types (Book, User, Lend, Comment, Category)
  contexts/    — UserContext (user state + admin check via user.status)
  theme.ts     — MUI theme config
  config.ts    — API base URL export
  routes.tsx   — Router setup with RouteRoles guard

sever-Java/.../demo/src/.../
  controller/  — REST controllers
  model/       — JPA entities
  DTO/         — Data records
  service/     — Mappers + repositories
```

## Key patterns
- State: UserContext only. user.status=true is admin
- Forms: react-hook-form + yupResolver
- Styling: MUI theme (`primary: #0d7377`, teal) + sx props
- Routing: RouteRoles component wraps protected routes
- All API functions in `server/api.ts` return axios promises

## Run
FE: `cd client-React && npm run dev`
BE: `cd sever-Java/newProject/demo && ./mvnw spring-boot:run`
