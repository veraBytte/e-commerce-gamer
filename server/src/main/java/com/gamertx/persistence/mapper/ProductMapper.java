package com.gamertx.persistence.mapper;

import com.gamertx.domain.Product;
import com.gamertx.persistence.entity.products_view.Producto;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    @Mappings({
            @Mapping(source = "idProducto", target = "productId"),
            @Mapping(source = "idCategoria", target = "categoryId"),
            @Mapping(source = "idMarca", target = "brandId"),
            @Mapping(source = "idOferta", target = "offerId"),
            @Mapping(source = "nombre", target = "name"),
            @Mapping(source = "stock", target = "stockQuantity"),
            @Mapping(source = "descripcion", target = "description"),
            @Mapping(source = "precio", target = "price"),
            @Mapping(source = "fechaCreacion", target = "creationDate"),
            @Mapping(source = "valoracion", target = "rating"),
    })
    Product toProduct(Producto producto);
    List<Product> toProducts(List<Producto> productos);

    @InheritInverseConfiguration
    @Mapping(target = "categoria", ignore = true)
    @Mapping(target = "marca", ignore = true)
    @Mapping(target = "comentarios", ignore = true)
    Producto toProducto(Product product);
}
