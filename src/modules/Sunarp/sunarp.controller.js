import { env } from "../../config/environment.js";
import { listOficinas, titularResponseDto } from "./dto/sunarp-dto.js";

import { writeFile } from "fs/promises";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(__dirname);
// Ruta completa al archivo
const imagePath = join(__dirname + "\\img\\", "imagen_descargada.jpg");


let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json; charset=UTF-8"); // AÑADIDO

export const consultTitularNatural = async (req, res) => {
  try {
    const { apellidoPaterno, apellidoMaterno, nombres } = req.body;

    const PIDE = {
      usuario: env.USER_SUNARP,
      clave: env.PASS_SUNARP,
      tipoParticipante: "N",
      apellidoPaterno: apellidoPaterno,
      apellidoMaterno: apellidoMaterno,
      nombres: nombres,
    };

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ PIDE }),
      redirect: "follow",
    };
    const response = await fetch(env.PREDIO_SUNARP_URL, requestOptions);

    if (!response.ok) {
      return res.status(response.status).json({
        message: "Error en la consulta con el servicios de SUNARP",
      });
    }

    const data = await response.json();
    const titularidadDto = titularResponseDto(data);

    res._json = titularidadDto;

    return res.json(titularidadDto);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

export const consultTitularJuridica = async (req, res) => {
  try {
    const { razonSocial } = req.body;
    console.log("Sunarp: " + razonSocial);

    const PIDE = {
      usuario: env.USER_SUNARP,
      clave: env.PASS_SUNARP,
      tipoParticipante: "J",
      razonSocial: razonSocial,
    };

    const raw = JSON.stringify({ PIDE });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(env.PREDIO_SUNARP_URL, requestOptions);

    if (!response.ok) {
      return res.status(response.status).json({
        message: "Error en la consulta con el servicios de SUNARP",
      });
    }

    const data = await response.json();

    const titularidadDto = titularResponseDto(data);

    res._json = titularidadDto;

    return res.json(titularidadDto);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

export const getOficinas = async (req, res) => {
  try {
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    const response = await fetch(env.OFICINAS_SUNARP_URL, requestOptions);

    if (!response.ok) {
      return res.status(response.status).json({
        message: "Error en la consulta con el servicios de SUNARP",
      });
    }

    const { oficina } = await response.json();
    const oficinasDto = listOficinas(oficina.oficina);

    res._json = oficinasDto;

    return res.json(oficinasDto);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

export const getPlacaVehicular = async (req, res) => {
  try {
    const { zona, oficina, placa } = req.body;
    const PIDE = {
      usuario: env.USER_SUNARP,
      clave: env.PASS_SUNARP,
      zona: zona,
      oficina: oficina,
      placa: placa,
    };
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ PIDE }),
    };

    const response = await fetch(env.PLACA_SUNARP_URL, requestOptions);

    if (!response.ok) {
      return res.status(response.status).json({
        message: "Error en la consulta con el servicios de SUNARP",
      });
    }

    const { verDetalleRPVExtraResponse } = await response.json();

    console.log("Resultado", verDetalleRPVExtraResponse);

    res._body = verDetalleRPVExtraResponse.vehiculo;

    return res.json(verDetalleRPVExtraResponse.vehiculo);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

export const getAsientos = async (req, res) => {
  try {
    const { zona, oficina, partida, registro } = req.body;

    const PIDE = {
      usuario: env.USER_SUNARP,
      clave: env.PASS_SUNARP,
      zona: zona,
      oficina: oficina,
      partida: partida,
      registro: "21000",
    };
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ PIDE }),
    };

    const response = await fetch(env.ASIENTOS_SUNARP_URL, requestOptions);

    if (!response.ok) {
      return res.status(response.status).json({
        message: "Error en la consulta con el servicios de SUNARP",
      });
    }

    const data = await response.json();
    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.json({
      message: error.message,
    });
  }
};

export const downloadAsientos = async (req, res) => {
    console.log(JSON.stringify( req.body, null, 20));
    
  try {
    const { transaccion, idImg, tipo, nroTotalPag, nroPagRef, pagina } = req.body;

    const PIDE = {
      usuario: env.USER_SUNARP,
      clave: env.PASS_SUNARP,
      transaccion: transaccion,
      idImg: idImg,
      tipo: tipo,
      nroTotalPag: nroTotalPag,
      nroPagRef: nroPagRef,
      pagina: pagina,
    };

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ PIDE }),
    };

    const response = await fetch(env.DOCUMENT_SUNARP_URL, requestOptions);

    if (!response.ok) {
      return res.status(response.status).json({
        message: "Error en la consulta con el servicios de SUNARP",
      });
    }

    const { verAsientoSIRSARPResponse } = await response.json();
    const binaryData = Buffer.from(verAsientoSIRSARPResponse.img, "base64");
    
    //await writeFile(imagePath, binaryData, 'binary');
    await writeFile(imagePath, binaryData).catch((err) => {
      console.error("Error al guardar imagen:", err);
      return res.status(500).json({ message: "Error al guardar la imagen" });
    });

    // Establece las cabeceras de la respuesta para indicar que es una imagen JPEG
    res.setHeader("Content-Type", "image/jpeg");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=imagen_descargado.jpg"
    );

    res.sendFile(imagePath, (err) => {
      if (err) {
        console.error("Error al enviar la imagen:", err);
        return res.status(500).json({ message: "Error al enviar la imagen" });
      }
    });
  } catch (error) {
    console.log("error img");
    console.log(error);
    return res.json({
      message: error.message,
    });
  }
};
