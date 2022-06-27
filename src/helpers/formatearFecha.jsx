export const formatearFecha = fecha=>{
    const nuevaFecha = new Date(fecha.split('T')[0].split('-'));
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
    };
    return nuevaFecha.toLocaleDateString('es-ES', options);
}