# App

GymPass Style app.

## RFs (Requesitos Funcionais)

- [x] Deve ser possível  se cadastrar;
- [x] Deve ser posssível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas;
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in  em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia; 

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não deve pode fazer checkin se nõa estiver perto (100m) da academia;
- [x] O check-in só pode ser validado até 20min após criado;
- [ ] O check-in só pode ser cadastrado por administradores;

## RNF (Requesitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisa estar persistidos em um banco PostgresL;
- [x] Todas as listas de dados precisam estar paginadas com 20 items por página;
- [ ] O usuário deve ser indentificado por um JWT (JSON Web Token);