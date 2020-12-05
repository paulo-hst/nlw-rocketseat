import { Request, Response } from 'express'
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';
import orphanageView from '../views/orphanages_view'; // importar views
import * as Yup from 'yup'; // biblioteca de validação de dados

export default{
    
    // listar todos os orfanatos
    async index( request: Request, response: Response ){

        const orphanagesRepository = getRepository(Orphanage);
        const orphanages =  await orphanagesRepository.find({
            relations: ['images'],
        });

        return response.json(orphanageView.renderMany(orphanages)); // sempre retornar um response.json
    },

    // listar apenas um orfanato
    async show( request: Request, response: Response ){
        const { id } = request.params;

        const orphanagesRepository = getRepository(Orphanage); // permite acessar os métodos de listar, criar ...
        const orphanage =  await orphanagesRepository.findOneOrFail(id, {
            relations: ['images'],
        }); // lista um ou retorna erro
        
        return response.json(orphanageView.render(orphanage)); // sempre retornar um response.json
    },

    // criar ornanato
    async create( request: Request, response: Response ){
            
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
        } = request.body;

        const orphanagesRepository = getRepository(Orphanage);

        const requestImages = request.files as Express.Multer.File[]; // permite salvar imagens no método create

        const images = requestImages.map(image =>{ // percorrer cada imagem
            return { path : image.filename } // retornar o caminho da imagem pela coluna no BD path
        })

        const data = { // variável para validação de dados
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true',
            images // imagens com o caminho
        }

        const schema = Yup.object().shape({ // formato da validação
            name: Yup.string().required(), // Yup. tipo de dado (string), obrigatório (required)
            latitude: Yup.number().required('Latitude obrigatória'), // é possível traduzir erro
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300), // número máximo de caracteres Max
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array( // no caso de imagem deve ser tipo array e criar uma nova estrutura com .shape
                Yup.object().shape({
                    path: Yup.string().required()
                })
            )
        });


        await schema.validate(data, { // validar os dados
            abortEarly: false, // não retorna erros de forma antecipada e sim quando encontrar todos os erros
        })

        const orphanage = orphanagesRepository.create(data); // estrutura alterada para validação de dados
        
        // salvar orfanato. await: salvar primeiro antes de carregar todo o conteúdo da página
        await orphanagesRepository.save(orphanage);

        return response.status(201).json(orphanage); // sempre retornar um response.json
    }
}
