# App

GymPass Style app.

## RFs (Requesitos Funcionais)

- [ ] Deve ser possível  se cadastrar;
- [ ] Deve ser posssível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [ ] Deve ser possível o usuário obter seu histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [ ] Deve ser possível o usuário realizar check-in  em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia; 

## RNs (Regras de negócio)

- [ ] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia;
- [ ] O usuário não deve pode fazer checkin se nõa estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado até 20min após criado;
- [ ] O check-in só pode ser cadastrado por administradores;

## RNF (Requesitos não-funcionais)

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisa estar persistidos em um banco PostgresL;
- [ ] Todas as listas de dados precisam estar paginadas com 20 items por página;
- [ ] O usuário deve ser indentificado por um JWT (JSON Web Token);