# Insertar La Biblioteca en Canvas

En una página del curso, abre **Editar** y la vista HTML del editor de contenido. Pega este código, guarda la página y comprueba **Student View**:

```html
<iframe
  src="https://profedanielvr-lgtm.github.io/biblioteca-A1_B2/"
  title="La Biblioteca: gramática y didáctica de ELE"
  width="100%"
  height="1100"
  loading="lazy"
  style="border:0;">
</iframe>
```

El código inserta el sitio publicado. No pega los scripts de la aplicación en el HTML de una página Canvas. Subir el HTML interactivo a Archivos puede producir una previsualización con JavaScript desactivado, como ocurrió en este proyecto. Los documentos de teoría alojados en Canvas pueden enlazarse como materiales desde el panel editorial.

Las políticas de Fontys pueden limitar dominios incrustados o almacenamiento dentro de iframes. Comprueba navegación, una práctica con audio y un intento guardado en Student View. El historial local puede estar particionado entre Canvas y la visita directa al sitio; la API compartida permite consultarlo por código cuando está conectada y se ha sincronizado. La aplicación no escribe calificaciones automáticamente en el Gradebook de Canvas.

Fuentes verificadas: [vista HTML del Rich Content Editor](https://community.instructure.com/en/kb/articles/662912-how-do-i-use-the-html-view-in-the-rich-content-editor), [elementos HTML admitidos por Canvas](https://community.instructure.com/en/kb/articles/387066-canvas-html-editor-allowlist?trk=article-ssr-frontend-pulse_little-text-block), [incrustación de fuentes externas](https://community.instructure.com/en/kb/articles/662934-unknown). Consultadas el 15-10-2026.
