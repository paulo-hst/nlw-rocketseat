import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // permite utilizar o google maps no iOS
import mapMarker from '../images/map-marker.png';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';

export default function OrphanagesMap(){

    interface Orphanage {
        id: number;
        name: string;
        latitude: number;
        longitude: number;
    }

    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
    const navigation = useNavigation();
    
    // Dois parâmetros: função e array de dependencias
    useFocusEffect(() => {
        api.get('/orphanages').then(response => {
            setOrphanages(response.data);
        })
    },);

    // Direciona para página de detalhes do orfanato
    function handleNavigateToOrphanageDetails (id: number){
        navigation.navigate('OrphanageDetails', { id }); // name da screen
    }

    // Direciona para página de criação de orfanato
    function handleNavigateToCreateOrphanage(){
        navigation.navigate('SelectMapPosition'); // name da screen
    }

    

    return(
        <View style={styles.container}>
            <MapView 
                provider = {PROVIDER_GOOGLE} // permite utilizar o google maps no iOS
                style={styles.map} // Estilos
                initialRegion={{ 
                latitude: -22.8747216,
                longitude: -43.2957222,
                latitudeDelta: 0.008, // Zoom
                longitudeDelta: 0.008, // Zoom
                }}
            >
                
                {orphanages.map(orphanage => {
                    return(
                        <Marker 
                            key={orphanage.id}
                            calloutAnchor = {{
                            // posiciona callout
                                x: 3.7, 
                                y: 1.1,
                            }}

                            icon={mapMarker}
                            coordinate={{
                                latitude: orphanage.latitude,
                                longitude: orphanage.longitude,
                            }}
                        >
                            {/* Callout: Mensagem ao clicar no marker */}
                            {/* tooltip: remove estilização padrão do callout */}
                            {/* onPress recebe apenas função*/}
                            <Callout tooltip onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}> 
                                <View style={styles.calloutContainer}>
                                    <Text style={styles.calloutText}>{orphanage.name}</Text>
                                </View>
                            </Callout>
                        </Marker>
                    );
                })}

            </MapView>

            <View style={ styles.footer }>
                <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados </Text>
                {/* Estilo / OnClick */}
                <RectButton style={styles.createOrphanageButton} onPress={ handleNavigateToCreateOrphanage }>
                    <Feather name="plus" size={20} color="#FFFFFF" />
                </RectButton>
            </View>
        </View>
    );        
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    
    calloutContainer: {
        width: 160,
        height: 46,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 16,
        justifyContent: 'center',
    },
    
    calloutText: {
        color: '#0089a5',
        fontSize: 14,
        fontFamily: 'Nunito_600SemiBold', 
    },
    
    footer: {
        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 32,
    
        backgroundColor: '#FFF',
        borderRadius: 20,
        height: 56,
        paddingLeft: 24,
    
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    
        // Sombras
        shadowColor: '#000',
        shadowRadius: 3,
        shadowOpacity: 0.3,
        // Posição da sombra
        shadowOffset: { 
        width: 3,
        height: 3,
        },
        elevation: 1,
    },
    
    footerText: {
        color: '#0089a5',
        fontFamily: 'Nunito_700Bold', 
    },
    
    createOrphanageButton: {
        width: 56,
        height: 56,
        backgroundColor: '#15c3d6',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center', 
    },
    
    });


