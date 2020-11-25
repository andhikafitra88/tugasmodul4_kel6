import React, {useEffect, useState, useContext, useReducer, useMemo} from "react";
import "./tugas.css";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    '@global': {
      ul: {
        margin: 0,
        padding: 0,
        listStyle: 'none',
      },
    },
    appBar: {
      flexGrow: 1,
      borderBottom: `1px solid ${theme.palette.divider}`,
      
    },
  
    toolbarTitle: {
      flexGrow: 1,
    },
    link: {
      margin: theme.spacing(1, 1.5),
    },
  
  }));
  

//penggunaan useReducer
const initialTroli = 0

const reducer = (troli, tambahTroli) => {
    switch (tambahTroli) {
        case 'tambah': return troli + 1
        default : return troli
    }
}

//penggunaan useContext
const CartContext = React.createContext();

const Produk = () => {
    const [stock, setStock] = useState(10);
    const [disabled, setDisabled] = useState(false);
    const [status, setStatus] = useState("Beli Sekarang");
    const [keranjang, setKeranjang] = useState(0);
    const [showGambar, setShowGambar] = useState(true);
    const [count, dispatch] = useReducer(reducer, initialTroli)
    
    //Penggunaan dengan useMemo
    const hideGambar = useMemo (() => {
        return {
            display : showGambar ? 'flex' : 'none'
        }
    }, [showGambar])


    //penggunaan useEffect
    useEffect(() => {
        if (stock > -1 && stock < 10) {
            alert(`Peringatan dengan useEffect! Pembelian berhasil`);
        }
    }, [stock]);

    //pengubahan state dengan useState
    const tombolBeli = () => {
        setStock(stock - 1);
        if (stock === 1) {
            setDisabled(true);
            setStatus("Habis");
        }
        
    }

    const classes = useStyles();


    return (
        <CartContext.Provider value={{ keranjang, setKeranjang}}> 
            <div className="Main">
                <br></br>
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Playstation 5
                </Typography>

                {/* Render useMemo */}
                <Typography variant="h5" align="center" color="textSecondary" component="p">
                Tampilkan dan sembunyikan gambar menggunakan UseMemo dengan tombol di bawah ini
                </Typography>
                <Button variant="outlined" color="primary" className={classes.link} onClick={() => setShowGambar(prevShowGambar => !prevShowGambar)}> SHOW/HIDE
                </Button>
                <br></br>
                <img className="ViewImage"
                style={hideGambar}
                src="https://assets.newatlas.com/dims4/default/02b9b1e/2147483647/strip/true/crop/2048x1365+0+0/resize/1200x800!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2Fef%2F29%2F1b22ffbd4bf9be7549a8f2217d30%2Fps5-hardware-3.jpg"
                alt=""/>

                <div className="UseCase">
                    
                        {/* Render useState yang mempengaruhi useEffect */}
                        <Button className={classes.link} variant="contained" color="primary" onClick={tombolBeli} disabled={disabled}>{status}</Button>
                        <Typography variant="h5" align="center" color="textSecondary" component="p">
                        Pembelian dengan UseState
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" component="p">
                        Jumlah Stock :
                        </Typography>
                        <Typography variant="h2" align="center" color="textSecondary" component="p">
                        {stock}
                        </Typography>
                        <br></br>
                    
                        {/* Render useContext */}
                        <TambahKeranjang />
                        <Typography variant="h5" align="center" color="textSecondary" component="p">
                        Ditambahkan dengan UseContext
                        </Typography>
                        <Typography variant="h2" align="center" color="textSecondary" component="p">
                        {keranjang}
                        </Typography>
                        <br></br>
                    
                        {/* Render useReducer */}
                        <Button className={classes.link} variant="contained" color="secondary" onClick={()=>dispatch('tambah')}>Tambah Keranjang <i className="fa fa-shopping-cart"></i></Button>
                        <Typography variant="h5" align="center" color="textSecondary" component="p">
                        Ditambahkan dengan UseReducer
                        </Typography>
                        <Typography variant="h2" align="center" color="textSecondary" component="p">
                        {count}
                        </Typography>
                    
                </div>
            </div>
        </CartContext.Provider>
    )
}

//fungsi untuk menjalankan useContext
function TambahKeranjang() {
    const {keranjang, setKeranjang } = useContext(CartContext);
    const tombolKeranjang = () => {
        setKeranjang(keranjang + 1);
    }
    return (
        <Button
        className="Button" variant="contained" color="textprimary" onClick={tombolKeranjang}
        >Tambah Keranjang
        <i className="fa fa-shopping-cart"></i></Button>
    );
}

export default Produk
