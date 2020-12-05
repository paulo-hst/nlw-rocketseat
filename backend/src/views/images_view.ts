import Image from '../models/Image'

export default{
    render(image: Image){ // retornar apenas uma informação
        return {
            id: image.id,
            url: `http://192.168.0.242:3333/uploads/${image.path}`,
        }
    },

    renderMany(images: Image[]){ // retornar vários orfanatos (array)
        return images.map(image => this.render(image)); // percorre o array e retorna o método acima
    }
}