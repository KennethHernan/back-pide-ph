export const listOficinas = (oficineResponse) => {
    return oficineResponse.map(oficina => {
        return {
            codZona: oficina.codZona,
            codOficina: oficina.codOficina,
            descripcion: oficina.descripcion
        }
    })
}


export const titularResponseDto = (titularResponse) => {
    const { buscarTitularidadSIRSARPResponse } = titularResponse;
    const { respuestaTitularidad } = buscarTitularidadSIRSARPResponse;
    if(respuestaTitularidad == null) return []
    if(!Array.isArray(respuestaTitularidad.respuestaTitularidad)){
        return [respuestaTitularidad.respuestaTitularidad]
    }
    return respuestaTitularidad.respuestaTitularidad
}