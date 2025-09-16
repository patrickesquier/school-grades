# School Grades

**School Grades** é um sistema web intuitivo e eficiente, projetado para agilizar a adição e gestão de notas escolares.

O projeto resolve o problema da inserção manual e ineficiente de notas, permitindo que professores lancem notas a partir de qualquer lugar, sem a necessidade de livros físicos. O programa centraliza e organiza a informação, otimizando o fluxo de trabalho e oferecendo uma solução ágil para a gestão académica.

---

## Tabela de Conteúdos
- [Instalação](#instalação)
- [Uso](#uso)
- [Configuração](#configuração)
- [Licença](#licença)
- [Autores / Créditos](#autores--créditos)

---

## Instalação
Para executar o projeto localmente, siga estes passos:

Clone o repositório:
```bash
git clone https://github.com/patrickesquier/school-grades.git
````

Aceda ao diretório do projeto:

```bash
cd school-grades
```

Instale as dependências:

```bash
npm install
```

---

## Uso

Acesso à Aplicação

* Para Professores: Autenticam-se para adicionar novas notas e visualizar apenas os dados relevantes para o seu perfil.
* Para Administradores: Autenticam-se para ter acesso a um dashboard completo e visualizar todas as notas de todos os alunos e matérias, permitindo uma gestão global.

Funcionalidade Principal

O sistema exibe a nota mais recente para cada aluno, em cada matéria, garantindo que o relatório esteja sempre atualizado e evitando dados duplicados ou desatualizados.

---

## Configuração

O projeto requer um ficheiro de configuração para se conectar ao Firebase.

1. Crie um projeto no seu painel do Firebase.

2. Registe uma aplicação web para obter as suas chaves de configuração.

3. Crie um ficheiro na raiz do projeto chamado .env.local e adicione as suas chaves de configuração no seguinte formato:

```bash
VITE_REACT_APP_FIREBASE_API_KEY=sua_api_key
VITE_REACT_APP_FIREBASE_AUTH_DOMAIN=seu_auth_domain
VITE_REACT_APP_FIREBASE_PROJECT_ID=seu_project_id
VITE_REACT_APP_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID=seu_messaging_sender_id
VITE_REACT_APP_FIREBASE_APP_ID=seu_app_id
```
---

## Licença

Este projeto está licenciado sob a Licença MIT.
Para mais detalhes, consulte o ficheiro LICENSE

---

## Autores / Créditos

Patrick Esquier - Criador e Desenvolvedor

Desenvolvido com React e Google Firebase.


