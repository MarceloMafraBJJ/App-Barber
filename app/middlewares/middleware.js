import jsonwebtoken from 'jsonwebtoken';

const {verify} = jsonwebtoken;

export const garanteAutenticadoMiddleware = (req, _, next) => {

    const autorizacaoHeader = req.headers.authorization;

    if (!autorizacaoHeader) {

        throw new Error('Não existe token');

    }

    const [,token] = autorizacaoHeader.split(" ");


    try {
        verify(token, "asdfasdfasdfasdfa");
        next();
    } catch {
        throw new Error('Token divergente');
    }
   
}