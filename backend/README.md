# Rodando o projeto...
## Instalação
- npm install
- yarn

## Criando/executando container docker
- docker run --name oficina_postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
- docker run oficina_postgres

## Rodando as migrations
- yarn typeorm migration:run

## Rodando o projeto
- yarn dev

# Rodando os testes
- yarn test