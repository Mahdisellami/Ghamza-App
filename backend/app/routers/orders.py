from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models import Order, OrderItem, Product
from ..schemas import OrderCreate, OrderResponse

router = APIRouter()


@router.get("/", response_model=List[OrderResponse])
def get_orders(db: Session = Depends(get_db)):
    """Get all orders for current user (TODO: add auth)"""
    # TODO: Filter by current user
    orders = db.query(Order).all()
    return orders


@router.get("/{order_id}", response_model=OrderResponse)
def get_order(order_id: int, db: Session = Depends(get_db)):
    """Get a specific order"""
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order


@router.post("/", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
def create_order(order_data: OrderCreate, db: Session = Depends(get_db)):
    """Create a new order"""
    # TODO: Get current user from auth
    user_id = 1  # Placeholder

    # Calculate total
    total = 0.0
    order_items = []

    for item in order_data.items:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        if not product:
            raise HTTPException(
                status_code=404,
                detail=f"Product {item.product_id} not found"
            )
        if product.stock < item.quantity:
            raise HTTPException(
                status_code=400,
                detail=f"Insufficient stock for product {product.name}"
            )

        item_total = product.price * item.quantity
        total += item_total

        order_items.append(OrderItem(
            product_id=item.product_id,
            quantity=item.quantity,
            price=product.price
        ))

        # Update stock
        product.stock -= item.quantity

    # Create order
    db_order = Order(
        user_id=user_id,
        total=total,
        shipping_address=order_data.shipping_address,
        shipping_city=order_data.shipping_city,
        shipping_postal_code=order_data.shipping_postal_code,
        phone=order_data.phone,
        notes=order_data.notes,
        order_items=order_items
    )

    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order
