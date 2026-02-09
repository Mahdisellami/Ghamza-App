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

    products = [
        Product(
            name="Traditional Tunisian Plate",
            slug="traditional-tunisian-plate",
            description="Beautifully handcrafted ceramic plate with traditional Tunisian patterns",
            price=45.00,
            stock=20,
            category_id=pottery.id,
            images=["https://via.placeholder.com/400x400?text=Tunisian+Plate"],
            is_active=True
        ),
        Product(
            name="Handwoven Table Runner",
            slug="handwoven-table-runner",
            description="Traditional Tunisian table runner made with authentic weaving techniques",
            price=65.00,
            stock=15,
            category_id=textiles.id,
            images=["https://via.placeholder.com/400x400?text=Table+Runner"],
            is_active=True
        ),
        Product(
            name="Ceramic Tagine Pot",
            slug="ceramic-tagine-pot",
            description="Authentic Tunisian tagine pot for traditional cooking",
            price=85.00,
            stock=10,
            category_id=pottery.id,
            images=["https://via.placeholder.com/400x400?text=Tagine+Pot"],
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
