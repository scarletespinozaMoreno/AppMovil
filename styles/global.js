import {StyleSheet } from 'react-native'
//JS donde tengo estilos globales el cual usare en todo el proyecto!

const globalStyles= StyleSheet.create({
    contenedor:{
        flex:1
    },
    contenido:{
        marginHorizontal:'2.5%',
        flex:1,
       
    },
    boton:{
        backgroundColor:'#1a6199'
    },
    botonTexto:{
        textTransform:'uppercase',
        fontFamily:'JosefinSans-Bold',
        color:'#FFFFFF'
    },
    titulo:{
        textAlign:'center',
        marginTop: 40,
        marginBottom:20,
        fontSize:25,
        fontFamily:'JosefinSans-Bold'
    },
    imagen:{
        height:300,
        width:'100%'
    },
    cantidad:{
        marginVertical:20,
        textAlign:'center',
        fontSize:24,
        fontFamily:'JosefinSans-Bold'

    },
    textp:{
        textAlign:'center',
        marginTop: 10,
        marginBottom:10,
        fontSize:15,
        fontFamily:'JosefinSans-Bold'
    },


})

export default globalStyles;