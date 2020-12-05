import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import Image from './Image';

@Entity('orphanages')
export default class Orphanage{
    @PrimaryGeneratedColumn('increment')
    id: number; // tipos primitivos

    @Column()
    name: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    about: string;

    @Column()
    instructions: string;

    @Column()
    opening_hours: string;

    @Column()
    open_on_weekends: boolean;

    @OneToMany(() => Image, image => image.orphanage, {
        cascade: ['insert', 'update'], // atualiza de forma automática as inserções ou atualizações
    }) // retorno > imagem e qual o campo deve ser referenciado
    
    @JoinColumn({ name: 'orphanage_id' }) // nome da coluna que armazena o relacionament
    images: Image[]; // array de imagens, do Image.ts do Model. Array > contém várias imagens

}