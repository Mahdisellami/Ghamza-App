from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models import Category
from ..schemas import CategoryCreate, CategoryResponse

router = APIRouter()


@router.get("/", response_model=List[CategoryResponse])
def get_categories(db: Session = Depends(get_db)):
    """Get all categories"""
    categories = db.query(Category).all()
    return categories


@router.get("/{category_identifier}", response_model=CategoryResponse)
def get_category(category_identifier: str, db: Session = Depends(get_db)):
    """Get a specific category by ID or slug"""
    # Try to parse as integer (ID)
    try:
        category_id = int(category_identifier)
        category = db.query(Category).filter(Category.id == category_id).first()
    except ValueError:
        # If not an integer, treat as slug
        category = db.query(Category).filter(Category.slug == category_identifier).first()

    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category


@router.post("/", response_model=CategoryResponse, status_code=status.HTTP_201_CREATED)
def create_category(category: CategoryCreate, db: Session = Depends(get_db)):
    """Create a new category (admin only - TODO: add auth)"""
    db_category = Category(**category.dict())
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category
