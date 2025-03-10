
import { Product } from '@/types';

export const mockProducts: Product[] = [
  {
    id: 'prod_1',
    name: 'Fone de Ouvido Minimalista',
    description: 'Fone de ouvido com design elegante e minimalista, oferecendo qualidade sonora excepcional e máximo conforto. Perfeito para uso diário com estilo.',
    price: 249.99,
    promotionalPrice: 199.99,
    isOnSale: true,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    category: 'Áudio',
    stock: 15,
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15')
  },
  {
    id: 'prod_2',
    name: 'Relógio Inteligente',
    description: 'Relógio inteligente com design premium, monitoramento de saúde e notificações. Combina tecnologia e estética em um dispositivo elegante.',
    price: 599.99,
    promotionalPrice: undefined,
    isOnSale: false,
    imageUrl: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    category: 'Acessórios',
    stock: 8,
    createdAt: new Date('2023-02-20'),
    updatedAt: new Date('2023-02-20')
  },
  {
    id: 'prod_3',
    name: 'Luminária de Mesa Moderna',
    description: 'Luminária de mesa com design contemporâneo, iluminação ajustável e construção de alta qualidade. Adiciona elegância a qualquer ambiente.',
    price: 189.99,
    promotionalPrice: 149.99,
    isOnSale: true,
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    category: 'Casa',
    stock: 12,
    createdAt: new Date('2023-03-10'),
    updatedAt: new Date('2023-03-10')
  },
  {
    id: 'prod_4',
    name: 'Mochila Minimalista',
    description: 'Mochila com design limpo e funcional, compartimentos bem organizados e materiais de alta durabilidade. Estilo e praticidade para o dia a dia.',
    price: 179.99,
    promotionalPrice: undefined,
    isOnSale: false,
    imageUrl: 'https://images.unsplash.com/photo-1622560480605-d83c66147e55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    category: 'Acessórios',
    stock: 20,
    createdAt: new Date('2023-04-05'),
    updatedAt: new Date('2023-04-05')
  },
  {
    id: 'prod_5',
    name: 'Cadeira de Design',
    description: 'Cadeira ergonômica com design escandinavo, conforto excepcional e visual sofisticado. Combina perfeitamente com decorações modernas.',
    price: 799.99,
    promotionalPrice: 649.99,
    isOnSale: true,
    imageUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    category: 'Casa',
    stock: 5,
    createdAt: new Date('2023-05-15'),
    updatedAt: new Date('2023-05-15')
  },
  {
    id: 'prod_6',
    name: 'Garrafa Térmica',
    description: 'Garrafa térmica com design elegante, isolamento de alta eficiência e construção durável. Mantém bebidas na temperatura ideal por horas.',
    price: 129.99,
    promotionalPrice: undefined,
    isOnSale: false,
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    category: 'Acessórios',
    stock: 25,
    createdAt: new Date('2023-06-10'),
    updatedAt: new Date('2023-06-10')
  },
  {
    id: 'prod_7',
    name: 'Organizador de Mesa',
    description: 'Organizador de mesa com compartimentos inteligentes, design minimalista e materiais de qualidade. Mantém seu espaço de trabalho elegante e funcional.',
    price: 89.99,
    promotionalPrice: 69.99,
    isOnSale: true,
    imageUrl: 'https://images.unsplash.com/photo-1513116476489-7635e79feb27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    category: 'Escritório',
    stock: 18,
    createdAt: new Date('2023-07-05'),
    updatedAt: new Date('2023-07-05')
  },
  {
    id: 'prod_8',
    name: 'Carteira Slim',
    description: 'Carteira com perfil fino, couro de alta qualidade e design elegante. Combina estilo e praticidade para o dia a dia.',
    price: 119.99,
    promotionalPrice: undefined,
    isOnSale: false,
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    category: 'Acessórios',
    stock: 0,
    createdAt: new Date('2023-08-15'),
    updatedAt: new Date('2023-08-15')
  }
];
