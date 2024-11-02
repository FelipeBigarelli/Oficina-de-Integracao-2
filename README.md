# Oficinas de Integração 2
### Registro de presença em aulas pelos alunos que frequentam as oficinas de ensino do projeto
***
## Requisitos Funcionais
- **RF01:** O sistema deve permitir que os alunos se cadastrem no site de projetos da instituição, fornecendo seus RAs e senha da instituição;
- **RF02:** O sistema deve exigir que os alunos realizem login para acessar o sistema de projetos da instituição;
- **RF03:** O sistema deve permitir que os alunos, autenticados no sistema, se inscrevam no projeto de extensão ELLP, de acordo com seus RAs e senha da instituição;
- **RF04:** O sistema deve permitir que os alunos registrem suas presenças em aulas quando estes estiverem presentes;
- **RF05:** O sistema possuirá um usuário administrador que poderá criar projetos de extensões.
***

## Arquitetura em Camadas
Para melhor organização do projeto, será utilizada a arquitetura em camadas, pois esta irá prover uma melhor compreensão de cada parte do sistema que será desenvolvido, com suas seguintes vantagens:
- Escalabilidade;
- Fácil manutenção, caso necessária a troca de ferramentas e bibliotecas;
- Separação de pastas e arquivos de acordo com suas funcionalidades. 

Abaixo mostra como o projeto terá sua arquitetura inicial:
  - **Backend:**
  ![Backend](/Images/Arquitetura%20Backend.png)
    - **src:** pasta que irá conter todo o código principal do projeto
    - **config:** pasta que terão arquivos de configuração como por exemplo autenticação ou upload de arquivos
    - **modules:** pasta que irá conter todas as entidades da aplicação, juntamente com seus repositórios, funcionalidades, casos de uso e configuração destas para o banco de dados
    - **shared:** pasta que irá armazenar os arquivos principais da aplicação que irão de alguma forma ser compartilhada com o resto do sistema, como configuração principal do banco de dados, arquivo principal de execução do sistema, entre outros
  ***

  ## Frontend

  ***
  ## Tecnologias
  #### Backend:
  Para o Backend, o sistema irá ser desenvolvido com as seguintes tecnologias:
  - NodeJs
  - Express
  - PostgreSQL
  - Docker
  - Jest

  #### Frontend:
  Para o Frontend, o sistema irá ser desenvolvido com as seguintes tecnologias:
  - ReactJs
  - Styled-components
  - Jest