# 📷 Admin Check-in QR Code Reader

Interface web simples para **check-in presencial de eventos**, utilizando leitura de **QR Code via câmera do navegador**, integrada a uma **API backend protegida por JWT**.

Este módulo foi desenvolvido como parte do sistema de **gestão de eventos**, com foco em **simplicidade, segurança e validação no backend**.

---

## 🎯 Objetivo

Permitir que um **usuário ADMIN**:

* Realize login no sistema
* Utilize a câmera do dispositivo para ler um QR Code
* Envie o código lido para a API para confirmar o check-in
* Faça logout de forma segura

Todo o processo de validação ocorre **exclusivamente no backend**.

---

## 🔐 Segurança

* Autenticação via **JWT (Bearer Token)**
* Acesso restrito a usuários com perfil **ADMIN**
* O frontend **não contém regras de negócio**
* O backend valida:

  * autenticidade do token
  * status do pagamento
  * estado da inscrição
  * prevenção de check-in duplicado

---

## 🧩 Tecnologias Utilizadas

* HTML5
* CSS3
* JavaScript (Vanilla)
* Biblioteca **html5-qrcode**
* API REST (Spring Boot + JWT)

---

## 🔄 Fluxo de Funcionamento

1. ADMIN realiza login
2. Backend retorna JWT
3. Token é utilizado nas requisições protegidas
4. Câmera do navegador é aberta
5. QR Code é lido (ex: `participacao:123`)
6. Frontend envia o código para a API
7. Backend confirma o check-in
8. ADMIN pode realizar logout

---

## 🖥️ Execução

O projeto é composto apenas por arquivos estáticos:

```
index.html
styles.css
script.js
```

Pode ser executado em:

* navegador local
* Vercel
* qualquer servidor estático

⚠️ A leitura de câmera requer:

* HTTPS **ou**
* execução em `localhost`

---

## 🚀 Considerações

Este leitor foi propositalmente desenvolvido de forma **minimalista**, servindo como:

* MVP funcional
* prova de conceito
* interface de apoio ao backend
* base para evolução futura (PWA, painel admin, app mobile)

---

## 📌 Observação

Este módulo **não confirma pagamentos** e **não executa regras críticas**.
Ele apenas orquestra a leitura do QR Code e delega toda a validação ao backend.

---
