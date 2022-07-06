import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import { useState } from 'react';

const Drawer = createDrawerNavigator();

function Inicio(){
  return (
    <View style={styles.container1}>
      <Text style={styles.textoBienvenida}>¡Bienvenid@ a Spotiffy!</Text>
      <Image
          style={{ width: 200, height: 200, marginBottom: 15 }}
          source={require("./assets/SpotiffyLogo.png")}
        />
    </View>
  );
}


function Spotiffy() 
{
  const [query, setQuery] = useState(null);
  const [previus, setPvQuery] = useState(null);

  const [lyrics, setLyrics] = useState(null);
  const [artist, setArtist] = useState(null);
  const [song, setSong] = useState(null);
  const [albumArt, setAlbumArt] = useState(null);

  const [Blyrics, setBLyrics] = useState(false);
  const [Bartist, setBArtist] = useState(false);
  const [Bsong, setBSong] = useState(false);
  const [BalbumArt, setBAlbumArt] = useState(false);

  console.log("Iniciado");

  const getAll = (songName) => {
    if(query!=previus)
    {
      const url = `http://159.65.245.35/api/lyrics/?from=DiscordRawon&song=${songName}`;
      fetch(url).then((res) => res.json()).then((res) => 
      {
        setLyrics(res.lyrics);
        setArtist(res.artist);
        setSong(res.song);
        setAlbumArt(res.album_art);
      })  
      setPvQuery(query); //no hacer dos el mismo llamado y mostrar los datos por defecto
    }
    
  }

  const Fgenerico = (songName, consulta) => //reemplaza Flyrics, funcion de carga para que muestre las cosas
  {

    if(songName!= null && songName != false)
    {
      getAll(songName);

      switch (consulta)
      {
        case "lyrics":
          setBLyrics(!Blyrics);
        break;

        case "albumArt":
          setBAlbumArt(!BalbumArt);
        break;
      }
    }


  }

  const Reset = () =>
  {
    setBAlbumArt(false); //si quiero mostrar o no
    setBLyrics(false);
    setBArtist(false);
    setBSong(false);
        
    setLyrics(""); //contenido de la variable
    setArtist("");
    setSong("");
    setAlbumArt("");

    setPvQuery("");
    setQuery("");
  }

  const Carga = (str, img=false) => 
  {
    if(str=="" || str==null)
    {
      return <Text>Cargando contenido...</Text>;
    }
    else
    {
      if(!img)
      {
        return <Text style={styles.lyrics}>{str}</Text>;
      }
      else
      {
        return <Image style={styles.tinyLogo} source={{uri: str}}/>;
      }
      
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textoDescubrir}>¡Consiga la letra de las canciones que desee con sus respectivos albumes de manera gratuita, libre y segura!</Text>
      <TextInput style={styles.input} onChangeText={setQuery} value={query} />
      
      <Button color="#32cd32" title="Borrar" onPress={() => Reset()}/>

      <Button color={Blyrics ? "#ff0000" : "#32cd32"} title="Conseguir letra" onPress={() => Fgenerico(query, "lyrics")}/>


      <Button color="#32cd32" title="Conseguir album" onPress={() => Fgenerico(query, "albumArt")}/>
      {BalbumArt ? Carga(albumArt, true): null}
      {Blyrics ? Carga(lyrics) : null} 
      <StatusBar style="auto" />
    </View>
  );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name='Inicio' component={Inicio}/>
        <Drawer.Screen name='Spotiffy' component={Spotiffy}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

  container1: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tinyLogo: {
    width: 100,
    height: 100,
  },
  input: {
    height: 45,
    margin: 15,
    borderColor: "#32cd32",
    borderWidth: 5,
    padding: 10,
  },
  lyrics:
  {
    maxHeight: '50vh',
    overflow: 'auto'
  },
  textoDescubrir: {
    fontSize: 30,
    lineHeight: 40,
    fontWeight: "bold",
    textAlign: 'center'
  },
  textoBienvenida: {
    fontSize: 42,
    lineHeight: 84,
    fontFamily: 'monospace',
    fontWeight: "bold",
    textAlign: "center",
    color: "#daa520",
  },
});
