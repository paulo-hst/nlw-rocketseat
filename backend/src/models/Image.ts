import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Orphanage from './Orphanage';

@Entity('images')
export default class Image{
    @PrimaryGeneratedColumn('increment')
    id: number; // tipos primitivos

    @Column()
    path: string;

    @ManyToOne(() => Orphanage, orphanage => orphanage.images) // retorno > Orphanage.ts > campo de referência
    @JoinColumn( { name: 'orphanage_id' } )
    orphanage: Orphanage; // não é array porque só um orfanato relaciona com várias imagens
}