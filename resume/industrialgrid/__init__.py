"""Industrial Grid uses RenderCV 2.8's design schema and Markdown pipeline."""
from typing import Literal
from rendercv.schema.models.design.classic_theme import ClassicTheme

class IndustrialgridTheme(ClassicTheme):
    theme: Literal["industrialgrid"] = "industrialgrid"
