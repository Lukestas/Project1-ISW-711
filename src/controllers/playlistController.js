import Playlist from '../models/PlayListModel.js'
import Video from '../models/VideoModel.js';
import Child from '../models/ChildModel.js';

export const createPlaylist = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json(["Se requiere un nombre para la playlist"]);
        }
        const newPlaylist = new Playlist({
            name
        })
        const playlistSaved = await newPlaylist.save();
        res.status(201).json(playlistSaved)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al crear la playlist', error });
    }
}

export const assignPlaylistToChild = async (req, res) => {
    try {
        const childFound=await Child.findById(req.body.childId)
        
        const playlistFound=await Playlist.findById(req.body.playlistId)
        console.log(playlistFound)
        if(!childFound){
            return res.status(400).json(["Se requiere un niño para asignar la playlist"]);
        }
        if(!playlistFound){
            return res.status(400).json(["Se requiere una playlist para asignar"]);
        }
        childFound.playlist=req.body.playlistId
        const ChildSaved= childFound.save();
        res.status(200).json({ message: "La playlist se asigno correctametne", ChildSaved });
    } catch (error) {
        res.status(500).json({ message: "Error al asignar la playlist", error: error.message });
    }
}

export const getAllPlaylist = async (req, res) => {
    try {
        const PlaylistsFound = await Playlist.find().populate("videos");
        if (!PlaylistsFound) {
            return res.status(404).json(["No se encontraron Playlist"]);
        }
        res.json(PlaylistsFound);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error al obtener las playlists', error });
    }
}

export const getOnePlaylist = async (req, res) => {
    try {
        const PlaylistFound = await Playlist.findById(req.query.id).populate("videos");
        if (!PlaylistFound) {
            return res.status(404).json(["No se encontro la Playlist"]);
        }
        res.json(PlaylistFound);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error al obtener las playlist', error });
    }
}

export const deletePlaylist = async (req, res) => {
    try {
        const PlaylistFound = await Playlist.findByIdAndDelete(req.body.playlistID);
        if (!PlaylistFound) {
            return res.status(404).json(["No se encontro la Playlist"]);
        }
        res.json({ message: "Playlist eliminada correctamente" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error al obtener las playlist', error });
    }
}


export const addVideoToPlaylist = async (req, res) => {
    try {
        console.log(req.body.videoId)
        const VideoFound = await Video.findById(req.body.videoId)
        console.log(VideoFound)
        const PlaylistFound = await Playlist.findById(req.query.id);
        if (!PlaylistFound) {
            return res.status(404).json(["No hay playlist al cual agregar este video"]);
        }
        if (!VideoFound) {
            return res.status(404).json({ message: "No se encontró el video" });
        }
        if (PlaylistFound.videos.includes(VideoFound.id)) {
            return res.status(400).json({ message: "El video ya está en la playlist" });
        }

        PlaylistFound.videos.push(VideoFound.id);
        const playlistSaved = await PlaylistFound.save();
        res.status(200).json({ message: "Video agregado a la playlist", playlistSaved });
    } catch (error) {
        res.status(500).json({ message: "Error al agregar el video", error: error.message });
    }
}

export const removeVideoFromPlaylist = async (req, res) => {
    try {
        const VideoFound = await Video.findById(req.body.videoId)
        const PlaylistFound = await Playlist.findById(req.query.id)
        console.log(VideoFound.id)
        console.log(PlaylistFound)
        if (!VideoFound) {
            return res.status(404).json({ message: "No se encontró el video" });
        }
        if (!PlaylistFound) {
            return res.status(404).json({ message: "No se encontró la playlist" });
        }
        if (!PlaylistFound.videos.includes(VideoFound.id)) {
            return res.status(400).json({ message: "El video no está en la playlist" });
        }

        PlaylistFound.videos = PlaylistFound.videos.filter(video => video.toString() !== VideoFound.id);

        const playlistSaved = await PlaylistFound.save();
        res.status(200).json({ message: "Video eliminado de la playlist", playlistSaved });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el video", error });
    }
}

export const updatePlaylist = async (req, res) => {
    try {

        const name = req.body.name
        console.log(name)
        const PlaylistFound = await Playlist.findById(req.query.id)
        console.log(PlaylistFound)
        if (!PlaylistFound) {
            return res.status(404).json({ message: "No se encontró la playlist" });
        }
        PlaylistFound.name = name;
        const playlistSaved = await PlaylistFound.save();
        res.status(200).json({ message: "playlist actualizada", playlistSaved });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el playlist", error });
    }
}