# 💬 Chat Bot - React Native

Um aplicativo de chat simples e interativo desenvolvido com **React Native** e **Expo**.  
Ele demonstra como criar uma interface de conversa e se conectar a uma **API REST** para gerenciamento de mensagens, simulando a comunicação com um assistente virtual.  

---

## ✨ Funcionalidades

- 💬 **Interface de Chat**: Layout moderno com balões de mensagem distintos para usuário e assistente.  
- 🌐 **Comunicação com API**: Consome endpoints REST para enviar e buscar mensagens, utilizando **MockAPI** como backend.  
- 📩 **Mensagens do Usuário**: Envio de mensagens via `POST` para a API.  
- 🤖 **Mensagens do Assistente**: Simulação de resposta automática do assistente.  
- ⏰ **Data e Hora**: Exibição da hora exata de envio de cada mensagem com formatação corrigida.  

---

## ⚙️ Configuração da API (MockAPI)

Este projeto depende de um backend simulado no **MockAPI**. Configure o seu próprio endpoint seguindo os passos abaixo:  

1. Acesse [MockAPI.io](https://mockapi.io/) e crie um novo projeto.  
2. Adicione um recurso chamado **messages** com as seguintes propriedades:  

   | Campo      | Tipo    |
   |------------|---------|
   | `text`     | String  |
   | `sender`   | String  |
   | `timestamp`| Date    |  

3. Copie a URL do seu endpoint e substitua no campo `API_URL` do arquivo **App.js**.  
