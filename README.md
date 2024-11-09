# Oficinas de Integração 2
## UTFPR - Universidade Tecnológica Federal do Paraná
## Bacharel em Engenharia de Software

 ### ALUNOS
 Rafael Gonçalves Martins - Felipe Bigarelli Dantas da Costa
 
 ### TEMÁTICA
 Registro de voluntarios e workshops das oficinas de ensino do projeto ELLP (Ensino Lúdico de Lógica, Programação e Robótica).

 ### ORGANIZAÇÃO E PLANEJAMENTO
 https://www.notion.so/135961c60bf780dfa52ee78aebdab0f3?v=135961c60bf781b4873e000c478595b4&pvs=4

## VISÃO GERAL

O projeto visa implementar uma plataforma capaz de gerenciar workshops e voluntarios para o projeto ELLP (Ensino Lúdico de Lógica, Programação e Robótica)

## REQUISITOS FUNCIONAIS

RF01: O sistema deve permitir que cada ator (voluntário, docente) realize o login com permissões específicas.

RF02: O sistema deve permitir que docentes cadastrem novos workshops.

RF03: O sistema deve permitir que docentes cadastrem novos voluntarios.

RF04: O sistema deve permitir que voluntarios emitam certificados dos workshops ministrados.

RF05: O sistema deve permitir que docentes gerenciem voluntários, incluindo o acompanhamento e registro de horas complementares computadas para esses alunos.

***

## ARQUITETURA EM CAMADAS
Para melhor organização do projeto, será utilizada a arquitetura em camadas, pois esta irá prover uma melhor compreensão de cada parte do sistema que será desenvolvido, com suas seguintes vantagens:
- Escalabilidade;
- Fácil manutenção, caso necessária a troca de ferramentas e bibliotecas;
- Separação de pastas e arquivos de acordo com suas funcionalidades. 

Abaixo mostra como o projeto terá sua arquitetura inicial:
  - **Backend:**
    - ![Backend](/Images/Arquitetura%20Backend.png)
    - **src:** pasta que irá conter todo o código principal do projeto
    - **config:** pasta que terão arquivos de configuração como por exemplo autenticação ou upload de arquivos
    - **modules:** pasta que irá conter todas as entidades da aplicação, juntamente com seus repositórios, funcionalidades, casos de uso e configuração destas para o banco de dados
    - **shared:** pasta que irá armazenar os arquivos principais da aplicação que irão de alguma forma ser compartilhada com o resto do sistema, como configuração principal do banco de dados, arquivo principal de execução do sistema, entre outros
  ***

  ## Frontend

  ***
  ## TECNOLOGIAS
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
