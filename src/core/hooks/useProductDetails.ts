import { useEffect, useMemo, useState } from 'react';
import { products } from '../../data/products';

export interface ProductSelectionErrors {
  size?: string;
  colour?: string;
}

export function useProductDetails(slug?: string) {
  const product = products.find((item) => item.slug === slug);
  const [size, setSize] = useState<string>();
  const [colour, setColour] = useState<string>();
  const [quantity, setQuantity] = useState(1);
  const [errors, setErrors] = useState<ProductSelectionErrors>({});

  useEffect(() => {
    setSize(undefined);
    setColour(undefined);
    setQuantity(1);
    setErrors({});
  }, [slug]);

  const related = useMemo(() => {
    if (!product) return [];
    const sameCategory = products.filter((item) => item.id !== product.id && item.category === product.category);
    const sameAudience = products.filter((item) => item.id !== product.id && item.audience === product.audience && !sameCategory.includes(item));
    return [...sameCategory, ...sameAudience].slice(0, 4);
  }, [product]);

  const availability = !product
    ? ''
    : product.stockQuantity === 0
      ? 'No units currently available'
      : product.stockStatus === 'low-stock'
        ? `Only ${product.stockQuantity} left`
        : `${product.stockQuantity} available`;

  const selectSize = (value: string) => {
    setSize(value);
    setErrors((current) => ({ ...current, size: undefined }));
  };
  const selectColour = (value: string) => {
    setColour(value);
    setErrors((current) => ({ ...current, colour: undefined }));
  };

  return {
    product,
    related,
    availability,
    size,
    colour,
    quantity,
    errors,
    setQuantity,
    setErrors,
    selectSize,
    selectColour,
  };
}
