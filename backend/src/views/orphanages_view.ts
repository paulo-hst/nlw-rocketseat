import Orphanage from '../models/Orphanage'
import imagesView from '../views/images_view'

export default{
    render(orphanage: Orphanage){ // retornar apenas uma informação
        return {
            id: orphanage.id,
            name: orphanage.name,
            latitude : orphanage.latitude,
            longitude : orphanage.longitude,
            about: orphanage.about,
            instructions : orphanage.instructions,
            opening_hours : orphanage.opening_hours,
            open_on_weekends : orphanage.open_on_weekends,
            images : imagesView.renderMany(orphanage.images) // para retornar uma view de imagens
        }
    },

    renderMany(orphanages: Orphanage[]){ // retornar vários orfanatos (array)
        return orphanages.map(orphanage => this.render(orphanage)); // percorre o array e retorna o método acima
    }
}