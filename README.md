# Chat Bot React

Um app de chat interativo desenvolvido com React.js que simula uma conversa com um bot.


## Tecnologias Utilizadas

- React.js
- TypeScript
- Zustand (gerenciamento de estado)
- CSS modules 

## Como rodar o projeto


1. Instale as dependências:
```bash
npm install
```

2. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## Uso

- Digite uma mensagem no campo de texto e pressione Enter ou clique no botão "Enviar" ou grave um audio que a app irá transformar em texto.

- O bot responderá automaticamente com uma mensagem aleatória
- Clique no ícone de sol/lua no canto superior direito para alternar entre os temas claro e escuro
- As mensagens são salvas automaticamente e persistem entre recarregamentos da página


Utilizei css modules pelo conhecimento prévio e também pela necessidade e por uma boa perfomance entre troca dos temas, nao vi sentido em usar o tailwind para esse pequeno projeto. E o Styled components está descontinuado.

Utilizei o zustand pela facilidade e suportaria bem o projeto a escalabidade do projeto.


