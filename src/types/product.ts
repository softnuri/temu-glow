export interface ProductSpecifications {
    battery?: string;
    connectivity?: string;
    waterproof?: string;
    warranty?: string;
    display?: string;
    sensors?: string;
    resolution?: string;
    hdr?: string;
    refresh?: string;
    audio?: string;
    material?: string;
    care?: string;
    fit?: string;
    sizes?: string;
    dimensions?: string;
    strap?: string;
    closure?: string;
    power?: string;
    settings?: string;
    technology?: string;
    cord?: string;
    coverage?: string;
    filter?: string;
    modes?: string;
    noise?: string;
    capacity?: string;
}

export interface Product {
    id: number;
    title: string;
    price: number;
    originalPrice?: number;
    image: string;
    rating: number;
    sales?: number;
    description?: string;
    specifications?: ProductSpecifications;
    features?: string[];
}