import React, { Component } from 'react';
import '../css/newpost.css';
import Moment from 'moment';
import 'moment/locale/es';
import Loader2 from '../utils/loader2';

class NewPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            titulo: '',
            texto: '',
            categoria: 'Vinos',
            imagen: ''
        }
        this.imageFile = React.createRef()
    }

    handlePost() {
        this.setState({invalidData: false})
        if (this.state.imagen && this.state.titulo.length > 1 && this.state.texto.length > 1) {
            this.setState({pendingPost: true})
            let formData = new FormData();
            formData.append("imagen", this.imageFile.current.files[0]);
            formData.append("username", this.props.username)
            formData.append("password", this.props.password)
            formData.append("titulo", this.state.titulo)
            formData.append("categoria", this.state.categoria)
            formData.append("texto", this.state.texto)
            formData.append("fecha", Moment().locale('es').format('LL'))
            fetch('https://lnhbackend.herokuapp.com/notas', {
                method: 'POST',
                body: formData
            })
                .then(d => d.json())
                .then(res => {
                    this.setState({pendingPost: false})
                    if (res.message === 'Nota agregada con exito') {
                        this.setState({ successNota: true, titulo: '', texto: '', imagen: '' })
                        setTimeout(() => {
                            this.setState({ successNota: false })
                        }, 5000)
                    } else {
                        this.setState({ failedNota: true })
                        setTimeout(() => {
                            this.setState({ failedNota: false })
                        }, 5000)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
        else if (this.state.titulo.length > 1 && this.state.texto.length > 1) {
            this.setState({pendingPost: true})
            fetch('https://lnhbackend.herokuapp.com/notas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.props.username,
                    password: this.props.password,
                    titulo: this.state.titulo,
                    texto: this.state.texto,
                    categoria: this.state.categoria,
                    fecha: Moment().locale('es').format('LL')
                })
            })
                .then(d => d.json())
                .then(res => {
                    this.setState({pendingPost: false})
                    if (res.message === 'Nota agregada con exito') {
                        this.setState({ successNota: true, titulo: '', texto: '' })
                        setTimeout(() => {
                            this.setState({ successNota: false })
                        }, 5000)
                    } else {
                        this.setState({ failedNota: true })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            this.setState({invalidData: true})
        }
    }

    handleChange(e) {
        console.log(this.imageFile.current.files[0])
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <div className="new-post-container" >
                <h1>Agregar una nueva nota</h1>
                <div className="new-post-flex" >
                    <h3>Titulo:</h3>
                    <input onChange={(e) => this.handleChange(e)} name="titulo" value={this.state.titulo} placeholder="Titulo" type="text" />
                </div>
                <div className="new-post-flex" >
                    <h3>Texto:</h3>
                    <textarea onChange={(e) => this.handleChange(e)} name="texto" value={this.state.texto} placeholder="Texto" ></textarea>
                </div>
                <div className="new-post-flex" >
                    <h3>Imagen:</h3>
                    <input accept="image/*" ref={this.imageFile} value={this.state.imagen} name="imagen" onChange={(e) => this.handleChange(e)} type="file" />
                </div>
                <div className="new-post-flex" >
                    <h3>Categoria:</h3>
                    <select name="categoria" onChange={(e) => this.handleChange(e)} value={this.state.categoria} >
                        <option>Vinos</option>
                        <option>Gastronomia</option>
                        <option>Cultura</option>
                        <option>Otro</option>
                    </select>
                </div>
                {this.state.pendingPost ? <Loader2 /> : <Loader2 hide={true} />}
                <button onClick={() => this.handlePost()} className="new-post-btn" >Postear</button>
                {this.state.invalidData ? <p>Porfavor completa los campos</p> : null}
                {this.state.successNota ? <h1 className="new-post-success" >Nota posteada con exito!</h1> : null}
                {this.state.failedNota ? <h1 className="new-post-failure" >Ups! Error al postear</h1> : null}
            </div>
        )
    }
}

export default NewPost;