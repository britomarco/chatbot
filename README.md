# Chat Bot React

Um componente de chat interativo desenvolvido com React.js que simula uma conversa com um bot.

## Funcionalidades

- Interface de chat responsiva
- Tema claro/escuro
- Persistência de mensagens no LocalStorage
- Rolagem automática
- Animações suaves
- Respostas aleatórias do bot
- Suporte a dispositivos móveis

## Tecnologias Utilizadas

- React.js
- TypeScript
- Zustand (gerenciamento de estado)
- CSS puro (sem frameworks de estilo)

## Instalação

1. Clone o repositório:
```bash
git clone [url-do-repositorio]
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## Uso

- Digite uma mensagem no campo de texto e pressione Enter ou clique no botão "Enviar"
- O bot responderá automaticamente com uma mensagem aleatória
- Clique no ícone de sol/lua no canto superior direito para alternar entre os temas claro e escuro
- As mensagens são salvas automaticamente e persistem entre recarregamentos da página

## Estrutura do Projeto

```
src/
  ├── components/
  │   └── Chat.tsx        # Componente principal do chat
  │   └── Chat.css        # Estilos do chat
  ├── App.tsx             # Componente raiz
  ├── App.css             # Estilos globais
  └── main.tsx            # Ponto de entrada da aplicação
```

## Personalização

O componente pode ser personalizado modificando:
- As cores no arquivo `Chat.css`
- As respostas do bot no array `botResponses` em `Chat.tsx`
- O layout e estilos conforme necessário

## Contribuição

