import { RequestHandler } from "express";
import { Usuario } from "../models/usuario";
import { Laboratorio } from "../models/laboratorio";


export const crearUsuario:RequestHandler =async (req,res) => {
    var usuario = await Usuario.create({...req.body});

    return res.status(200).json({message:"Usuario creado", data:usuario});
}

export const listarUsuarios:RequestHandler =async (req,res) => {
    var usuarios = await Usuario.findAll({
        attributes: {exclude:["password"]}
    });
    return res.status(200).json({message:"Usuarios encontrados: "+usuarios.length, data:usuarios});
}

export const actualizarUsuario:RequestHandler =async (req,res) => {
    const {codigo} = req.params
    var usuario = await Usuario.update({...req.body},{where:{codigo:codigo}});
    const usuarioActualizado: Usuario|null = await Usuario.findByPk(codigo);
    return res.status(200).json({message:"Usuario actualizado", data:usuarioActualizado});
}

export const obtenerInfoCompleta:RequestHandler  =async (req,res) => {
    const {codigo} = req.params;
    var usuario = await Usuario.findByPk(codigo,{
        include:Laboratorio
    });

    return res.status(200).json({message:"Usuario encontrado con toda su info",data:usuario});
}

export const eliminarUsuario:RequestHandler =async (req,res) => {
    const {codigo} = req.params;
    const usuarioEliminado : Usuario|null = await Usuario.findByPk(codigo);
    await Usuario.destroy({where:{codigo}});
    return res.status(200).json({message:"Usuario eliminado",data:usuarioEliminado});    
}


export const restaurarUsuario:RequestHandler =async (req,res) => {
    const {codigo} = req.params;
    const usuarioaRestaurar:Usuario|null = await Usuario.findByPk(codigo,{paranoid:false});
    await usuarioaRestaurar?.restore();
    return res.status(200).json({message:"Se restauró un usuario",data:usuarioaRestaurar});
}