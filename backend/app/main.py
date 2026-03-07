from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .routers import products, users, orders, categories, cart
from .database import SessionLocal
from .models import Category, Product
import sys
import os

app = FastAPI(
    title="Ghamza Shop API",
    description="API for Ghamza Tunisian Handcrafted Products Shop",
    version="1.0.0",
    debug=settings.DEBUG
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(products.router, prefix="/api/products", tags=["products"])
app.include_router(categories.router, prefix="/api/categories", tags=["categories"])
app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(orders.router, prefix="/api/orders", tags=["orders"])
app.include_router(cart.router, prefix="/api/cart", tags=["cart"])


@app.get("/")
async def root():
    return {
        "message": "Welcome to Ghamza Shop API",
        "version": "1.0.0",
        "docs": "/docs"
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy"}


@app.post("/api/seed-database")
async def seed_database():
    """
    Seed the database with initial categories and products.
    This endpoint should only be called once or when resetting data.
    """
    db = SessionLocal()
    try:
        # Check if categories already exist
        existing_categories = db.query(Category).count()
        if existing_categories > 0:
            return {
                "message": "Database already seeded",
                "categories": existing_categories,
                "products": db.query(Product).count()
            }

        # Seed categories
        categories_data = [
            {"name": "Sweatshirts & Hoodies", "slug": "sweatshirts-hoodies", "description": "Modern Tunisian streetwear tops"},
            {"name": "Bottoms", "slug": "bottoms", "description": "Pants, joggers and traditional-modern fusion wear"},
            {"name": "T-Shirts", "slug": "t-shirts", "description": "Contemporary Tunisian identity shirts"},
            {"name": "Collections", "slug": "collections", "description": "Signature collections blending tradition and modernity"},
            {"name": "Accessories", "slug": "accessories", "description": "Complementary streetwear accessories"},
        ]

        categories_map = {}
        for cat_data in categories_data:
            category = Category(**cat_data)
            db.add(category)
            db.flush()
            categories_map[cat_data["slug"]] = category.id

        # Seed products
        products_data = [
            {
                "name": "DRIBA - Ensemble Complet",
                "slug": "driba-ensemble-complet",
                "description": "Collection DRIBA complète inspirée de l'architecture tunisienne traditionnelle. Une fusion parfaite entre l'identité moderne et l'âme nord-africaine. Motifs de portes bleues traditionnelles et carreaux de Sidi Bou Said. 100% coton premium, coupe moderne streetwear.",
                "price": 120.00,
                "stock": 25,
                "category_id": categories_map["collections"],
                "images": ["/images/products/driba-collection-1.jpg", "/images/products/driba-collection-2.jpg", "/images/products/driba-architecture.jpg"],
                "is_active": True
            },
            {
                "name": "Sweatshirt Touf Street - Gris",
                "slug": "sweatshirt-touf-street-gris",
                "description": "Sweatshirt premium 'شارع توف' (Touf Street) en gris chiné. Design streetwear tunisien moderne avec logo brodé. Coton épais de qualité supérieure, coupe oversize confortable. Disponible en plusieurs tailles.",
                "price": 75.00,
                "stock": 30,
                "category_id": categories_map["sweatshirts-hoodies"],
                "images": ["/images/products/touf-street-grey-1.jpg", "/images/products/touf-street-grey-2.jpg"],
                "is_active": True
            },
            {
                "name": "Sweatshirt Touf Street - Bleu Ciel",
                "slug": "sweatshirt-touf-street-bleu",
                "description": "Sweatshirt 'شارع توف' (Touf Street) bleu ciel avec bandes latérales. Inspiré des couleurs de Sidi Bou Said. Design moderne avec touches traditionnelles. Tissu doux et résistant, parfait pour toutes les saisons.",
                "price": 75.00,
                "stock": 30,
                "category_id": categories_map["sweatshirts-hoodies"],
                "images": ["/images/products/touf-street-blue-1.jpg", "/images/products/touf-street-blue-2.jpg", "/images/products/touf-street-blue-sidi-bou-said.jpg"],
                "is_active": True
            },
            {
                "name": "Sweatshirt Touf Street - Monument",
                "slug": "sweatshirt-touf-street-monument",
                "description": "Sweatshirt Touf Street édition spéciale avec monument tunisien en arrière-plan. Représente le patrimoine architectural de la Tunisie. Motifs traditionnels sur les côtés. Coupe moderne streetwear.",
                "price": 80.00,
                "stock": 20,
                "category_id": categories_map["sweatshirts-hoodies"],
                "images": ["/images/products/touf-street-monument-1.jpg", "/images/products/touf-street-monument-2.jpg", "/images/products/touf-street-monument-3.jpg"],
                "is_active": True
            },
            {
                "name": "Jogger Noir - Motifs Berbères",
                "slug": "jogger-noir-motifs-berberes",
                "description": "Jogger noir premium avec bandes latérales ornées de motifs géométriques berbères traditionnels. Couleurs rouge, orange et symboles ancestraux. Coupe moderne streetwear, taille élastique, poches zippées. Fusion parfaite tradition-modernité.",
                "price": 85.00,
                "stock": 25,
                "category_id": categories_map["bottoms"],
                "images": ["/images/products/jogger-berber-patterns-1.jpg", "/images/products/jogger-berber-patterns-2.jpg", "/images/products/jogger-berber-patterns-3.jpg", "/images/products/jogger-berber-patterns-detail.jpg"],
                "is_active": True
            },
            {
                "name": "T-Shirt DRIBA - Beige",
                "slug": "tshirt-driba-beige",
                "description": "T-shirt DRIBA en coton beige avec logo brodé. Design minimaliste et élégant inspiré de l'architecture tunisienne. Coupe moderne décontractée. Idéal pour un style streetwear subtil.",
                "price": 45.00,
                "stock": 40,
                "category_id": categories_map["t-shirts"],
                "images": ["/images/products/driba-tshirt-beige.jpg", "/images/products/driba-tshirt-beige-2.jpg"],
                "is_active": True
            },
            {
                "name": "T-Shirt Tunisien - Blanc Cassé",
                "slug": "tshirt-tunisien-blanc",
                "description": "T-shirt blanc cassé avec inscriptions arabes et design moderne. Représente l'identité tunisienne contemporaine. 100% coton de qualité, coupe regular fit.",
                "price": 42.00,
                "stock": 35,
                "category_id": categories_map["t-shirts"],
                "images": ["/images/products/tunisia-tshirt-white.jpg"],
                "is_active": True
            },
            {
                "name": "Collection Exclusive - Pré-commande",
                "slug": "collection-exclusive-precommande",
                "description": "Nouvelle collection exclusive Gamza Tounsia à venir. Identité moderne, âme nord-africaine. Logo Main de Fatma avec œil protecteur. Inscription pour être notifié du lancement.",
                "price": 0.00,
                "stock": 0,
                "category_id": categories_map["collections"],
                "images": ["/images/products/coming-soon-1.jpg", "/images/products/coming-soon-2.jpg", "/images/products/coming-soon-3.jpg", "/images/products/coming-soon-4.jpg", "/images/products/coming-soon-5.jpg"],
                "is_active": False
            },
        ]

        for prod_data in products_data:
            product = Product(**prod_data)
            db.add(product)

        db.commit()

        return {
            "message": "Database seeded successfully",
            "categories": len(categories_data),
            "products": len(products_data)
        }

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error seeding database: {str(e)}")
    finally:
        db.close()
