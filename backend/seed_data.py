"""
Seed script to populate the database with initial data
"""
import sys
from sqlalchemy.orm import Session
from app.database import SessionLocal, engine, Base
from app.models import User, Category, Product

def create_tables():
    """Create all tables"""
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("✅ Tables created successfully!")

def seed_categories(db: Session):
    """Seed categories"""
    print("\nSeeding categories...")
    categories = [
        Category(name="Sweatshirts & Hoodies", slug="sweatshirts-hoodies", description="Modern Tunisian streetwear tops"),
        Category(name="Bottoms", slug="bottoms", description="Pants, joggers and traditional-modern fusion wear"),
        Category(name="T-Shirts", slug="t-shirts", description="Contemporary Tunisian identity shirts"),
        Category(name="Collections", slug="collections", description="Signature collections blending tradition and modernity"),
        Category(name="Accessories", slug="accessories", description="Complementary streetwear accessories"),
    ]

    for category in categories:
        existing = db.query(Category).filter(Category.slug == category.slug).first()
        if not existing:
            db.add(category)

    db.commit()
    print("✅ Categories seeded!")

def seed_products(db: Session):
    """Seed products"""
    print("\nSeeding products...")

    # Get categories
    sweatshirts = db.query(Category).filter(Category.slug == "sweatshirts-hoodies").first()
    bottoms = db.query(Category).filter(Category.slug == "bottoms").first()
    tshirts = db.query(Category).filter(Category.slug == "t-shirts").first()
    collections = db.query(Category).filter(Category.slug == "collections").first()

    products = [
        # DRIBA Collection
        Product(
            name="DRIBA - Ensemble Complet",
            slug="driba-ensemble-complet",
            description="Collection DRIBA complète inspirée de l'architecture tunisienne traditionnelle. Une fusion parfaite entre l'identité moderne et l'âme nord-africaine. Motifs de portes bleues traditionnelles et carreaux de Sidi Bou Said. 100% coton premium, coupe moderne streetwear.",
            price=120.00,
            stock=25,
            category_id=collections.id,
            images=[
                "/images/products/driba-collection-1.jpg",
                "/images/products/driba-collection-2.jpg",
                "/images/products/driba-architecture.jpg"
            ],
            is_active=True
        ),

        # Touf Street Sweatshirts Collection
        Product(
            name="Sweatshirt Touf Street - Gris",
            slug="sweatshirt-touf-street-gris",
            description="Sweatshirt premium 'شارع توف' (Touf Street) en gris chiné. Design streetwear tunisien moderne avec logo brodé. Coton épais de qualité supérieure, coupe oversize confortable. Disponible en plusieurs tailles.",
            price=75.00,
            stock=30,
            category_id=sweatshirts.id,
            images=[
                "/images/products/touf-street-grey-1.jpg",
                "/images/products/touf-street-grey-2.jpg"
            ],
            is_active=True
        ),
        Product(
            name="Sweatshirt Touf Street - Bleu Ciel",
            slug="sweatshirt-touf-street-bleu",
            description="Sweatshirt 'شارع توف' (Touf Street) bleu ciel avec bandes latérales. Inspiré des couleurs de Sidi Bou Said. Design moderne avec touches traditionnelles. Tissu doux et résistant, parfait pour toutes les saisons.",
            price=75.00,
            stock=30,
            category_id=sweatshirts.id,
            images=[
                "/images/products/touf-street-blue-1.jpg",
                "/images/products/touf-street-blue-2.jpg",
                "/images/products/touf-street-blue-sidi-bou-said.jpg"
            ],
            is_active=True
        ),
        Product(
            name="Sweatshirt Touf Street - Monument",
            slug="sweatshirt-touf-street-monument",
            description="Sweatshirt Touf Street édition spéciale avec monument tunisien en arrière-plan. Représente le patrimoine architectural de la Tunisie. Motifs traditionnels sur les côtés. Coupe moderne streetwear.",
            price=80.00,
            stock=20,
            category_id=sweatshirts.id,
            images=[
                "/images/products/touf-street-monument-1.jpg",
                "/images/products/touf-street-monument-2.jpg",
                "/images/products/touf-street-monument-3.jpg"
            ],
            is_active=True
        ),

        # Joggers/Bottoms with Traditional Patterns
        Product(
            name="Jogger Noir - Motifs Berbères",
            slug="jogger-noir-motifs-berberes",
            description="Jogger noir premium avec bandes latérales ornées de motifs géométriques berbères traditionnels. Couleurs rouge, orange et symboles ancestraux. Coupe moderne streetwear, taille élastique, poches zippées. Fusion parfaite tradition-modernité.",
            price=85.00,
            stock=25,
            category_id=bottoms.id,
            images=[
                "/images/products/jogger-berber-patterns-1.jpg",
                "/images/products/jogger-berber-patterns-2.jpg",
                "/images/products/jogger-berber-patterns-3.jpg",
                "/images/products/jogger-berber-patterns-detail.jpg"
            ],
            is_active=True
        ),

        # T-Shirts
        Product(
            name="T-Shirt DRIBA - Beige",
            slug="tshirt-driba-beige",
            description="T-shirt DRIBA en coton beige avec logo brodé. Design minimaliste et élégant inspiré de l'architecture tunisienne. Coupe moderne décontractée. Idéal pour un style streetwear subtil.",
            price=45.00,
            stock=40,
            category_id=tshirts.id,
            images=[
                "/images/products/driba-tshirt-beige.jpg",
                "/images/products/driba-tshirt-beige-2.jpg"
            ],
            is_active=True
        ),
        Product(
            name="T-Shirt Tunisien - Blanc Cassé",
            slug="tshirt-tunisien-blanc",
            description="T-shirt blanc cassé avec inscriptions arabes et design moderne. Représente l'identité tunisienne contemporaine. 100% coton de qualité, coupe regular fit.",
            price=42.00,
            stock=35,
            category_id=tshirts.id,
            images=[
                "/images/products/tunisia-tshirt-white.jpg"
            ],
            is_active=True
        ),

        # Coming Soon / Brand Items
        Product(
            name="Collection Exclusive - Pré-commande",
            slug="collection-exclusive-precommande",
            description="Nouvelle collection exclusive Gamza Tounsia à venir. Identité moderne, âme nord-africaine. Logo Main de Fatma avec œil protecteur. Inscription pour être notifié du lancement.",
            price=0.00,
            stock=0,
            category_id=collections.id,
            images=[
                "/images/products/coming-soon-1.jpg",
                "/images/products/coming-soon-2.jpg",
                "/images/products/coming-soon-3.jpg",
                "/images/products/coming-soon-4.jpg",
                "/images/products/coming-soon-5.jpg"
            ],
            is_active=False
        ),
    ]

    for product in products:
        existing = db.query(Product).filter(Product.slug == product.slug).first()
        if not existing:
            db.add(product)

    db.commit()
    print("✅ Products seeded!")

def seed_admin_user(db: Session):
    """Seed admin user"""
    print("\nSeeding admin user...")

    admin = db.query(User).filter(User.email == "admin@ghamza.com").first()
    if not admin:
        admin = User(
            email="admin@ghamza.com",
            hashed_password="admin123",  # TODO: Hash properly
            full_name="Admin User",
            is_admin=True,
            is_active=True
        )
        db.add(admin)
        db.commit()
        print("✅ Admin user created!")
        print("   Email: admin@ghamza.com")
        print("   Password: admin123")
    else:
        print("⚠️  Admin user already exists")

def main():
    """Main seeding function"""
    print("=" * 50)
    print("  Ghamza Shop - Database Seeding")
    print("=" * 50)

    # Create tables
    create_tables()

    # Create database session
    db = SessionLocal()

    try:
        # Seed data
        seed_categories(db)
        seed_products(db)
        seed_admin_user(db)

        print("\n" + "=" * 50)
        print("  ✅ Database seeded successfully!")
        print("=" * 50)

    except Exception as e:
        print(f"\n❌ Error seeding database: {e}")
        db.rollback()
        sys.exit(1)
    finally:
        db.close()

if __name__ == "__main__":
    main()
