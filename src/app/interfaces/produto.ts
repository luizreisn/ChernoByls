export interface Produto {
    id?: string;
    categoria?: string;
    nome?: string;
    descricao?: string;
    img?: string;
    personalizacao?: {
        nome?: string;
        marcado?: boolean;
    }[];
    valor?: number;
    quantidade?: number;
    valorTotal?: number;
}
