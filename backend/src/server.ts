import express from 'express'; // Framework que trabalha requisições (frontend) e respostas (backend)
import path from 'path';
import 'express-async-errors'; // tratamento de erros 
import cors from 'cors'; // resolve o problema de acesso da aplicação à vários domínios

import errorHandler from './errors/handler';

import './database/connection';
import routes from './routes';

const app = express(); // Cria a aplicação

app.use(cors())// resolve o problema de acesso da aplicação à vários domínios
app.use(express.json()); // Permite a utilização do JSON no EXPRESS
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads'))) // permite o acesso às imagens pelo link
app.use(errorHandler) // ativar tratamento de erros

app.listen(3333); // Ouve a porta 33333 (pode ser outra porta)
