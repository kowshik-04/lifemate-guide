import React from 'react';
import { LCAAssistant } from '@/components/LCAAssistant';
import { ProductShowcase } from '@/components/ProductShowcase';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Smartphone, Shield, Zap, Users } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-gradient-primary">
              Powered by AI • Personalized Shopping
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Your Smart Shopping Experience
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Meet LCA - your AI-powered Life Contextual Advisor. Get personalized device recommendations, 
              compare plans, and shop with voice or text assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-gradient-primary hover:shadow-glow text-lg px-8">
                Start Shopping
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                Browse Devices
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-chat-bounce">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Smartphone className="w-8 h-8 text-primary" />
          </div>
        </div>
        <div className="absolute top-32 right-16 animate-chat-bounce" style={{ animationDelay: '1s' }}>
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Zap className="w-6 h-6 text-primary" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose LCA Assistant?</h2>
            <p className="text-muted-foreground">Advanced AI technology meets personalized shopping</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Voice & Text Support</h3>
              <p className="text-muted-foreground">
                Chat naturally with voice or text. LCA understands context and provides instant help.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Recommendations</h3>
              <p className="text-muted-foreground">
                Personalized product suggestions based on your behavior, preferences, and history.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Complete Automation</h3>
              <p className="text-muted-foreground">
                Add to cart, compare devices, and complete purchases - all through natural conversation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <ProductShowcase />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Smart Shopping?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of satisfied customers who use LCA for personalized device recommendations and seamless shopping.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Try Demo Mode
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-primary">
              Sign Up Free
            </Button>
          </div>
        </div>
      </section>

      {/* LCA Assistant Widget */}
      <LCAAssistant />
    </div>
  );
};

export default Index;
