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
        Category(name="Pottery", slug="pottery", description="Traditional Tunisian pottery"),
        Category(name="Textiles", slug="textiles", description="Handwoven textiles and fabrics"),
        Category(name="Jewelry", slug="jewelry", description="Handcrafted jewelry"),
        Category(name="Baskets", slug="baskets", description="Woven baskets and containers"),
        Category(name="Home Decor", slug="home-decor", description="Decorative items for your home"),
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
    pottery = db.query(Category).filter(Category.slug == "pottery").first()
    textiles = db.query(Category).filter(Category.slug == "textiles").first()
    jewelry = db.query(Category).filter(Category.slug == "jewelry").first()
    baskets = db.query(Category).filter(Category.slug == "baskets").first()
    home_decor = db.query(Category).filter(Category.slug == "home-decor").first()

    products = [
        # Pottery items - Nabeul ceramics
        Product(
            name="Assiette Dune - Grès Émaillé Craquelé",
            slug="assiette-dune-gres-emaille",
            description="Assiette artisanale en grès émaillé avec finition craquelée. Fabriquée à Nabeul, cette pièce unique présente les motifs traditionnels tunisiens. Parfaite pour sublimer vos tables.",
            price=38.00,
            stock=15,
            category_id=pottery.id,
            images=["https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&h=800&fit=crop"],
            is_active=True
        ),
        Product(
            name="Plat Lila - Service Céramique",
            slug="plat-lila-service-ceramique",
            description="Grand plat de service en grès émaillé craquelé. Idéal pour présenter vos plats traditionnels tunisiens. Artisanat de Nabeul.",
            price=85.00,
            stock=8,
            category_id=pottery.id,
            images=["https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=800&h=800&fit=crop"],
            is_active=True
        ),
        Product(
            name="Bol Artisanal Nabeul - Set de 4",
            slug="bol-artisanal-nabeul-set",
            description="Ensemble de 4 bols en céramique peinte à la main. Motifs géométriques traditionnels bleu et blanc de Nabeul. Parfaits pour servir soupes et salades.",
            price=95.00,
            stock=10,
            category_id=pottery.id,
            images=["https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&h=800&fit=crop"],
            is_active=True
        ),
        Product(
            name="Planche à Découper en Olivier",
            slug="planche-olivier-artisanale",
            description="Planche à découper artisanale en bois d'olivier massif. Chaque pièce est unique avec ses veinures naturelles. Produit durable et écologique.",
            price=45.00,
            stock=12,
            category_id=pottery.id,
            images=["https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&h=800&fit=crop"],
            is_active=True
        ),

        # Textiles - Foutas and Margoum
        Product(
            name="Fouta Traditionnelle Tissée Main",
            slug="fouta-traditionnelle-tissee",
            description="Fouta 100% coton tissée à la main selon la tradition tunisienne. Polyvalente: serviette de plage, paréo, jeté de canapé. Motifs rayés authentiques.",
            price=42.00,
            stock=20,
            category_id=textiles.id,
            images=["https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=800&fit=crop"],
            is_active=True
        ),
        Product(
            name="Jeté de Lit Shems - Coton",
            slug="jete-lit-shems-coton",
            description="Jeté de lit en coton épais avec motifs géométriques traditionnels. Fabriqué par des artisanes tunisiennes. Apporte chaleur et authenticité à votre chambre.",
            price=125.00,
            stock=8,
            category_id=textiles.id,
            images=["https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&h=800&fit=crop"],
            is_active=True
        ),
        Product(
            name="Tapis Margoum Laine - Motifs Regma",
            slug="tapis-margoum-laine-regma",
            description="Tapis margoum authentique 100% laine tissé à la main par des artisanes tunisiennes. Motifs géométriques regma (losanges) symbolisant la fertilité. Fabriqué à Kairouan selon la tradition berbère. Tons rouge, beige et bleu.",
            price=380.00,
            stock=5,
            category_id=textiles.id,
            images=["https://images.unsplash.com/photo-1584528315471-e4621c3d4d8e?w=800&h=800&fit=crop"],
            is_active=True
        ),
        Product(
            name="Housse de Coussin Brodée",
            slug="housse-coussin-brodee",
            description="Housse de coussin avec broderie traditionnelle tunisienne. Motifs floraux et géométriques faits main. Ajoute une touche d'élégance orientale.",
            price=35.00,
            stock=25,
            category_id=textiles.id,
            images=["https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=800&fit=crop"],
            is_active=True
        ),

        # Jewelry - Khomsa and traditional
        Product(
            name="Collier Filigrane en Argent",
            slug="collier-filigrane-argent",
            description="Collier artisanal en argent avec travail de filigrane traditionnel. Technique ancestrale tunisienne. Pièce élégante et intemporelle.",
            price=165.00,
            stock=6,
            category_id=jewelry.id,
            images=["https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&h=800&fit=crop"],
            is_active=True
        ),
        Product(
            name="Bracelet Main de Fatma",
            slug="bracelet-main-fatma",
            description="Bracelet traditionnel avec symbole de la Main de Fatma (Khomsa). Protection et chance selon la tradition tunisienne. Travail artisanal du métal.",
            price=58.00,
            stock=15,
            category_id=jewelry.id,
            images=["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop"],
            is_active=True
        ),

        # Copper and metal work
        Product(
            name="Bonbonnière Cuivre Martelé",
            slug="bonbonniere-cuivre-martele",
            description="Bonbonnière avec couvercle en cuivre martelé à la main. Artisanat traditionnel tunisien. Parfaite pour présenter vos douceurs orientales.",
            price=95.00,
            stock=7,
            category_id=home_decor.id,
            images=["https://images.unsplash.com/photo-1544139252-dc49826c8db7?w=800&h=800&fit=crop"],
            is_active=True
        ),
        Product(
            name="Mortier en Bois d'Olivier",
            slug="mortier-olivier-artisanal",
            description="Mortier et pilon en bois d'olivier massif. Outil traditionnel pour épices et condiments. Pièce fonctionnelle et décorative.",
            price=52.00,
            stock=10,
            category_id=baskets.id,
            images=["https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&h=800&fit=crop"],
            is_active=True
        ),

        # Baskets
        Product(
            name="Couffin en Palme Tressée",
            slug="couffin-palme-tressee",
            description="Panier traditionnel tunisien (couffin) tressé en feuilles de palmier. Idéal pour le marché ou comme élément décoratif. Artisanat authentique.",
            price=48.00,
            stock=18,
            category_id=baskets.id,
            images=["https://images.unsplash.com/photo-1544139252-dc49826c8db7?w=800&h=800&fit=crop"],
            is_active=True
        ),

        # Lighting
        Product(
            name="Lanterne Orientale Ajourée",
            slug="lanterne-orientale-ajouree",
            description="Lanterne décorative en métal ajouré avec motifs orientaux. Crée une ambiance chaleureuse avec ses jeux de lumière. Artisanat tunisien.",
            price=75.00,
            stock=12,
            category_id=home_decor.id,
            images=["https://images.unsplash.com/photo-1535396788786-6b6d4c7a9cac?w=800&h=800&fit=crop"],
            is_active=True
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
