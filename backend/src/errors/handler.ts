import { ErrorRequestHandler } from 'express'; // tipagem padrão do express para lidar com erros
import { ValidationError } from 'yup'; // permite informar caso o erro seja de validação

// modelo de mensagem para informar ao front-end, no formado de objeto
interface ValidationErrors {
    [key: string]: string[]
}

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {

    if (error instanceof ValidationError){// se o erro for de validação
        let errors: ValidationErrors = {};

        error.inner.forEach(err => { // percorre cada erro dentro da variável error
            errors[err.path] = err.errors;
        })

        return response.status(400).json({ message: 'Validation fails', errors });
    }

    console.error(error); // erro padrão será exibido no console, para desenvolvedores

    return response.status(500).json({ message: 'Internal server error' });// o que será exibido no front end
    // 500: código padrão de erro 
}

export default errorHandler; 