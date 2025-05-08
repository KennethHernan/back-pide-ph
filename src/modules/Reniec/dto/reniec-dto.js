export const dniDto = (dniResponse) => {
    const { consultarResponse } = dniResponse;
    const result = consultarResponse.return;
    const { datosPersona, coResultado, deResultado } = result;

    if(coResultado != "0000"){
        return {
            statusCode: 400,
            coResultado,
            deResultado
        }
    }

    return {
        prenombres: datosPersona.prenombres,
        apPrimer: datosPersona.apPrimer,
        apSegundo: datosPersona.apSegundo,
        domicilio: datosPersona.direccion,
        estadoCivil: datosPersona.estadoCivil,
        restriccion: datosPersona.restriccion,
        ubigeo: datosPersona.ubigeo,
        foto: datosPersona.foto
    }
}