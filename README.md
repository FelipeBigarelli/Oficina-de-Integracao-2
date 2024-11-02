# Oficinas de Integração 2
## UTFPR - Universidade Tecnológica Federal do Paraná
## Bacharel em Engenharia de Software

 ### ALUNOS
 Rafael Gonçalves Martins - Felipe Bigarelli Dantas da Costa
 
 ### TEMÁTICA
 Registro da presença dos alunos que participam das oficinas de ensino do projeto ELLP (Ensino Lúdico de Lógica, Programação e Robótica).

## VISÃO GERAL

O projeto tem como objetivo centralizar e facilitar o acompanhamento das crianças e adolescentes que participam das oficinas de ensino do projeto ELLP (Ensino Lúdico de Lógica, Programação e Robótica). O sistema visa criar um processo automatizado e preciso para o controle de presença, substituindo métodos manuais e potencialmente falhos por uma solução digital eficiente.

O escopo do projeto abrange o desenvolvimento de uma plataforma que permita aos instrutores registrarem a presença dos alunos de forma prática e em tempo real, garantindo a confiabilidade dos dados coletados. Essa solução busca não apenas otimizar o tempo dos educadores, mas também oferecer uma interface intuitiva para o gerenciamento de turmas e eventos.

***

### PRINCIPAIS OBJETIVOS E MÉTRICAS

**Precisão no registro de dados:** Garantir que as presenças sejam registradas com uma margem de erro mínima.

**Acessibilidade e usabilidade:** Criar uma plataforma que possa ser utilizada facilmente por instrutores e administradores.

**Análise de dados de frequência:** Coletar e armazenar as informações de presença para gerar relatórios que ajudem na tomada de decisões pedagógicas e de gestão.

### BENEFÍCIOS

A implementação desse sistema de registro de presença trará uma série de benefícios para o projeto ELLP. O controle de presença permitirá monitorar o engajamento dos alunos, identificar possíveis faltas recorrentes e agir proativamente para resolver questões que possam impactar o aprendizado, como desinteresse ou dificuldades específicas. Além disso, a análise de dados de frequência pode orientar ajustes no planejamento das aulas, garantindo uma maior personalização e eficácia das atividades lúdicas.

Medidas como o envio de lembretes e notificações para os responsáveis, planejamento de estratégias de reengajamento, e o acompanhamento individualizado dos alunos podem ser aplicadas com base nas informações coletadas, fortalecendo o vínculo dos participantes com as oficinas e assegurando que eles tirem o máximo proveito do aprendizado.

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
    - ![Backend](/Images/Arquitetura%20Backend.png)
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
