"""first migration

Revision ID: c7c5314e5349
Revises: 
Create Date: 2024-04-16 18:29:27.520697

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'c7c5314e5349'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'users',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('name', sa.String(length=50), nullable=False),
        sa.Column('bornIn', sa.Date(), nullable=False),
        sa.Column('email', sa.String(length=50), nullable=False),
        sa.Column('password', sa.String(length=50), nullable=False),
        sa.Column('receiveEmail', sa.Boolean(), nullable=False),
        sa.Column('receiveSMS', sa.Boolean(), nullable=False),
    )
    
def downgrade() -> None:
    op.drop_table(
        'users'
    )
