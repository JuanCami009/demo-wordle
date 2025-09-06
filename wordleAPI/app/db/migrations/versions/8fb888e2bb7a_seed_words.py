"""seed words

Revision ID: 8fb888e2bb7a
Revises: 9b511966bc26
Create Date: 2025-09-06 09:11:33.641270

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '8fb888e2bb7a'
down_revision: Union[str, Sequence[str], None] = '9b511966bc26'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


WORDS = (
    'PERRO','GATOS','CASAS','ARBOL','RATON','LIMON','NIEVE','PLAZA','SALSA','QUESO',
    'PANES','LECHE','AGUAS','PLAYA','MONTE','CERRO','CAMPO','CIELO','MARCO','ARENA',
    'VERDE','NEGRO','ROJAS','AMIGO','AMIGA','NOVIO','NOVIA','PADRE','MADRE','HIJOS',
    'PRIMO','PRIMA','NINOS','LLAVE','VENTA','CALLE','CARRO','AVION','NUBES','RUIDO',
    'SILLA','PERLA','RADIO','TEXTO','CLAVE','DATOS','RELOJ','PAPEL','PLUMA','LAPIZ',
    'FRUTA','FLORA','FAUNA','SOLAR','LUNAR','LUCES','BOMBA','COMER','VIVIR','CORRE'
)

def upgrade():
    if not WORDS:
        return
    values = ",".join(f"('{w}')" for w in WORDS)
    op.execute(f"""
        INSERT INTO words (text)
        VALUES {values}
        ON CONFLICT (text) DO NOTHING;
    """)

def downgrade():

    op.execute("""
        TRUNCATE TABLE
            guesses,
            games,
            words
        RESTART IDENTITY;
    """)


