const { Categoria } = require("../models");
const { populate } = require("../models/categoria");


//obtener categorias - paginado - total -populate
const obtenerCategorias = async (req, res) => {
    
    
  const { limit = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [ total, categorias ] = await Promise.all([
      Categoria.countDocuments(query),
      Categoria.find(query)
          .populate('usuario', 'nombre')
          .skip( Number( desde ) )
          .limit(Number( limit ))
  ]);

  res.json({
      total,
      categorias
  });
}

//obtener categorias -- populate{}
const obtenerCategoria = async(req, res = response ) => {

    const { id } = req.params;
    const categoria = await Categoria.findById( id )
                            .populate('usuario', 'nombre');

    res.json( categoria );

}



const crearCategoria = async (req, res) => {

    console.log(Categoria)
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}, ya existe`
        })
    }
    //generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }
    console.log(data)

    const categoria = new Categoria(data)
    // guardar base de datos
    await categoria.save();
    res.status(201).json(categoria);
}

const actualizarCategoria = async( req, res = response ) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre  = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

    res.json( categoria );

}
const borrarCategoria = async(req, res =response ) => {

    const { id } = req.params;
    const categoriaBorrada = await Categoria.findByIdAndUpdate( id, { estado: false }, {new: true });

    res.json( categoriaBorrada );
}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}