💬 Chat Bot - React Native
Este é um aplicativo de chat simples e interativo, desenvolvido com React Native e Expo. Ele demonstra como criar uma interface de conversa e se conectar a uma API REST para gerenciamento de mensagens, simulando a comunicação com um assistente virtual.

✨ Funcionalidades
Interface de Chat: Layout de chat moderno com balões de mensagem distintos para o usuário e o assistente.

Comunicação com API: O aplicativo consome um endpoint de API REST para enviar e buscar mensagens, utilizando o MockAPI como backend.

Mensagens do Usuário: Envia novas mensagens para a API via POST.

Mensagens do Assistente: Simula uma resposta instantânea do assistente, adicionando uma mensagem à conversa localmente.

Rolagem Automática: A lista de mensagens rola suavemente para o final quando um novo item é adicionado, garantindo uma experiência de uso fluida.

Data e Hora: Exibe a hora exata de envio de cada mensagem, corrigindo o problema de formatação do timestamp.

🚀 Como Executar o Projeto
Siga estes passos para ter o projeto rodando em sua máquina.

Pré-requisitos
Certifique-se de ter o Node.js e o npm instalados. Para rodar a aplicação via Expo, você também precisará do Expo CLI:

Bash

# Instale o Expo CLI globalmente
npm install -g expo-cli
1. Configuração da API
Este projeto depende de um backend simulado no MockAPI. Configure o seu próprio endpoint:

Acesse o MockAPI.io e crie um novo projeto.

Adicione um recurso chamado messages com as seguintes propriedades:

text (Tipo: String)

sender (Tipo: String)

timestamp (Tipo: Date)

Copie a URL do seu endpoint e substitua a API_URL no arquivo App.js.
