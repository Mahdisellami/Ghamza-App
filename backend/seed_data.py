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
        # Pottery items
        Product(
            name="Traditional Tunisian Plate",
            slug="traditional-tunisian-plate",
            description="Beautifully handcrafted ceramic plate with traditional Tunisian patterns. Each plate is unique with vibrant colors and geometric designs.",
            price=45.00,
            stock=20,
            category_id=pottery.id,
            images=["https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&h=800&fit=crop"],
            is_active=True
        ),
        Product(
            name="Ceramic Tagine Pot",
            slug="ceramic-tagine-pot",
            description="Authentic Tunisian tagine pot for traditional cooking. Hand-painted with traditional motifs, perfect for slow-cooking stews.",
            price=85.00,
            stock=10,
            category_id=pottery.id,
            images=["https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&h=800&fit=crop"],
            is_active=True
        ),
        Product(
            name="Ceramic Bowl Set",
            slug="ceramic-bowl-set",
            description="Set of 4 handcrafted ceramic bowls with vibrant Tunisian patterns. Perfect for serving traditional dishes.",
            price=120.00,
            stock=8,
            category_id=pottery.id,
            images=["https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=800&h=800&fit=crop"],
            is_active=True
        ),
        Product(
            name="Decorative Ceramic Vase",
            slug="decorative-ceramic-vase",
            description="Large decorative vase with intricate hand-painted designs. A stunning centerpiece for any room.",
            price=95.00,
            stock=6,
            category_id=pottery.id,
            images=["https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&h=800&fit=crop"],
            is_active=True
        ),

        # Textiles
        Product(
            name="Handwoven Table Runner",
            slug="handwoven-table-runner",
            description="Traditional Tunisian table runner made with authentic weaving techniques. Features geometric patterns in warm earth tones.",
            price=65.00,
            stock=15,
            category_id=textiles.id,
            images=["https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=800&fit=crop"],
            is_active=True
        ),
        Product(
            name="Woven Throw Blanket",
            slug="woven-throw-blanket",
            description="Soft handwoven blanket with traditional patterns. Perfect for adding warmth and texture to your living space.",
            price=135.00,
            stock=12,
            category_id=textiles.id,
            images=["https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&h=800&fit=crop"],
            is_active=True
        ),
        Product(
            name="Embroidered Cushion Cover",
            slug="embroidered-cushion-cover",
            description="Hand-embroidered cushion cover with traditional Tunisian motifs. Adds a touch of authenticity to any decor.",
            price=35.00,
            stock=25,
            category_id=textiles.id,
            images=["https://images.unsplash.com/photo-1584528315471-e4621c3d4d8e?w=800&h=800&fit=crop"],
            is_active=True
        ),

        # Jewelry
        Product(
            name="Silver Filigree Necklace",
            slug="silver-filigree-necklace",
            description="Delicate handcrafted silver necklace with traditional filigree work. A timeless piece of Tunisian artistry.",
            price=155.00,
            stock=7,
            category_id=jewelry.id,
            images=["https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&h=800&fit=crop"],
            is_active=True
        ),
        Product(
            name="Berber Hand Bracelet",
            slug="berber-hand-bracelet",
            description="Traditional Berber-style bracelet with intricate metalwork. Features symbolic geometric patterns.",
            price=75.00,
            stock=10,
            category_id=jewelry.id,
            images=["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop"],
            is_active=True
        ),

        # Baskets
        Product(
            name="Palm Leaf Market Basket",
            slug="palm-leaf-market-basket",
            description="Traditional woven basket made from palm leaves. Perfect for shopping or storage with authentic Tunisian charm.",
            price=48.00,
            stock=18,
            category_id=baskets.id,
            images=["https://images.unsplash.com/photo-1544139252-dc49826c8db7?w=800&h=800&fit=crop"],
            is_active=True
        ),
        Product(
            name="Seagrass Storage Basket",
            slug="seagrass-storage-basket",
            description="Handwoven seagrass basket with handles. Eco-friendly and perfect for organizing your home.",
            price=42.00,
            stock=20,
            category_id=baskets.id,
            images=["https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&h=800&fit=crop"],
            is_active=True
        ),

        # Home Decor
        Product(
            name="Mosaic Wall Mirror",
            slug="mosaic-wall-mirror",
            description="Stunning wall mirror with handcrafted mosaic frame featuring traditional Tunisian patterns.",
            price=185.00,
            stock=5,
            category_id=home_decor.id,
            images=["https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&h=800&fit=crop"],
            is_active=True
        ),
        Product(
            name="Lantern Candle Holder",
            slug="lantern-candle-holder",
            description="Decorative metal lantern with intricate cutout patterns. Creates beautiful ambient lighting.",
            price=58.00,
            stock=14,
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
