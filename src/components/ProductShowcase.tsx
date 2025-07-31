import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Smartphone, Wifi, Zap } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  category: string;
  rating: number;
  features: string[];
  image: string;
  badge?: string;
}

const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    price: '€999',
    originalPrice: '€1,199',
    category: 'Smartphone',
    rating: 4.8,
    features: ['A17 Pro Chip', '48MP Camera', 'Titanium Design'],
    image: '📱',
    badge: 'Best Seller'
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    price: '€1,199',
    category: 'Smartphone',
    rating: 4.7,
    features: ['S Pen', '200MP Camera', '5G Ready'],
    image: '📱',
    badge: 'New'
  },
  {
    id: '3',
    name: 'MagentaMobil L',
    price: '€54.95/month',
    category: 'Mobile Plan',
    rating: 4.9,
    features: ['Unlimited Data', '5G Network', 'EU Roaming'],
    image: '📶',
    badge: 'Most Popular'
  }
];

export const ProductShowcase = () => {
  return (
    <section className="py-16 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Featured Products & Plans
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our latest devices and mobile plans. Chat with LCA for personalized recommendations!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="relative overflow-hidden hover:shadow-soft transition-all duration-300 hover:-translate-y-1">
              {product.badge && (
                <Badge className="absolute top-4 left-4 z-10 bg-gradient-primary">
                  {product.badge}
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="text-6xl mb-4">{product.image}</div>
                <CardTitle className="text-xl">{product.name}</CardTitle>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-1">
                    ({product.rating})
                  </span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-2xl font-bold text-primary">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                  <Badge variant="secondary" className="mt-1">
                    {product.category}
                  </Badge>
                </div>

                <div className="space-y-2">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      {product.category === 'Mobile Plan' ? (
                        <Wifi className="w-4 h-4 text-primary" />
                      ) : (
                        <Zap className="w-4 h-4 text-primary" />
                      )}
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Button className="w-full bg-gradient-primary hover:shadow-glow">
                  {product.category === 'Mobile Plan' ? 'View Plans' : 'Add to Cart'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Need help choosing? Let LCA assist you!
          </p>
          <div className="flex items-center justify-center gap-2">
            <Smartphone className="w-5 h-5 text-primary" />
            <span className="text-sm">Click the chat button to get personalized recommendations</span>
          </div>
        </div>
      </div>
    </section>
  );
};