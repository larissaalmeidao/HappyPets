# HappyPets


🐾 Sistema Web para Petshop – Descrição do Projeto
Este projeto é um sistema web para agendamento de serviços em petshops, desenvolvido com tecnologias modernas para facilitar o atendimento aos tutores de pets e a organização dos agendamentos pela equipe do petshop.

💡 Objetivo
O objetivo principal do sistema é permitir que os usuários (clientes) façam o cadastro de agendamentos de serviços para seus pets, como banho, tosa e consultas, de forma prática, diretamente pelo navegador.

⚙️ Como o sistema funciona
1. Cadastro e Login de Usuários
Os clientes se cadastram com nome de usuário, CPF, telefone e senha.

O login é feito por meio de verificação com bcrypt para proteger as senhas.

2. Agendamento de Serviços
Após o login, o usuário acessa um formulário onde pode:

Preencher os dados do pet (nome, raça);

Escolher o tipo de serviço (banho, tosa, consulta);

Selecionar data e horário;

Enviar uma imagem do pet;

Escrever observações adicionais.

3. Armazenamento de Dados
Os dados dos usuários e agendamentos são salvos em um banco de dados MySQL.

As imagens são armazenadas localmente na pasta uploads/.

4. Listagem de Agendamentos
O usuário pode ver todos os seus agendamentos em uma página com:

Nome do pet, tipo de serviço, data, horário e observações.

O estilo da página é feito com HTML + CSS personalizado.

5. Sessões
O sistema usa sessões para manter o usuário logado e garantir que ele veja apenas seus próprios agendamentos.
