export interface Producto {
    keyItem: String;
    idCatalogoProducto: number;
    precioCatalogo: number;
    titulo: string;
    nombre: string;
    imagenOportunidad: string;
    precioPuntos: number;
    formatPrecioCatalogo: number;
    formatPrecioPuntos: number;
    formatPrecioCompra: number;
    esOferta: false;
    verPrecioRegular: boolean;
    porcentajeDescuento: number;
    precioPuntosRegular: number;
    stockDisponible: number;
    descripcionMarca: string;
    idProducto: number;
    productosRelacionados: Producto[];
}
