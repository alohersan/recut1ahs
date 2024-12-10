import React, {useState} from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShareIcon from '@mui/icons-material/Share'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import Card from '@mui/material/Card'
import {
    Avatar, Button,
    CardContent,
    CardHeader,
    CardMedia,
    Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle,
    Grid,
    IconButton,
    Typography,
} from "@mui/material";


const Noticia = ({avatar, titulo, fecha, imageurl, noticia, numlike, desavatar, desimage}) => {
    //Estado del like(desactivado al comenzar)
    const [like, setlike] = useState(false)

    //Contador de likes, usa como estado inicial el numero de likes que se declararon en App.jsx
    const [likecount, setlikecount] = useState(numlike)

    //Estado del dialogo modal(desactivado al comenzar)
    const [open, setopen] = useState(false)

    //Al dar like sumar 1 y restar 1 al quitarlo
    const handleClickLike = () => {
        if (like) {
            setlikecount(likecount - 1)
        } else {
            setlikecount(likecount + 1)
        }
        setlike(!like)//Actualizar el like(activar o desactivar
    }

    //Abrir el dialogo
    const handleClickOpen = () => {
        setopen(true)
    }

    //Cerrar el dialogo
    const handleClickClose = () => {
        setopen(false)
    }

    //Mostrar por consola al comparti
    const handleShare = (platform) => {
        console.log(`Enviado por ${platform}...`)
        handleClickClose()
    }
    return (
        <>
            <Card style={{maxWidth: 400, margin: '1em auto'}}>
                {/*Encabezado*/}
                <CardHeader
                    avatar={<Avatar alt={desavatar} src={avatar}/>}
                    title={titulo}
                    subheader={fecha}
                    action={<IconButton aria-label="settings"><MoreVertIcon/></IconButton>
                    }
                />
                {/*Imagen*/}
                <CardMedia
                    component={'img'}
                    height="194"
                    image={imageurl}
                    alt={desimage}
                    style={{objectFit: 'cover'}}
                />
                {/*Informacion*/}
                <CardContent style={{textAlign: 'center'}}>
                    <Typography variant="body2" color="textSecondary" style={{marginTop: '1em'}}>
                        {noticia}
                    </Typography>

                    {/*Likes y Share*/}
                    <Grid container justifyContent="flex-start" alignItems="center" style={{marginTop: '1em'}}>
                        <Typography>{likecount}</Typography>
                        <IconButton onClick={handleClickLike} aria-label="me gusta">
                            {like ? <FavoriteIcon color="info"/> : <FavoriteBorderIcon/>}
                        </IconButton>
                        <IconButton
                            onClick={handleClickOpen}
                            aria-label="compartir"
                            disabled={!like}
                        ><ShareIcon/></IconButton>
                    </Grid>
                </CardContent>

                {/* Dialogo modal */}
                <Dialog
                    open={open}
                    onClose={handleClickClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Compartir"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            ¿A qué plataforma quieres enviar el enlace?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleShare('Instagram')} color="primary">
                            <InstagramIcon/>
                        </Button>
                        <Button onClick={() => handleShare('Facebook')} color="primary">
                            <FacebookIcon/>
                        </Button>
                    </DialogActions>
                </Dialog>
            </Card>
        </>
    );
};
export default Noticia;