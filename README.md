# Web Scraping - Universidad de las Artes

Scraper web especializado para extraer información sobre programas académicos de la [Universidad de las Artes (UArtes)](https://www.uartes.edu.ec/) de Ecuador.

## Descripcion

Este proyecto extrae información detallada de los programas de pregrado y posgrado de la UArtes, incluyendo:

- Nombre del programa
- Descripcion
- Imagen de referencia
- Enlace a la pagina del programa
- Informacion adicional (tipo de programa, modalidad, perfil, etc.)

## Tecnologias

- **TypeScript** - Lenguaje principal
- **Axios** - Cliente HTTP para realizar solicitudes web
- **Cheerio** - Parser de HTML para manipulacion del DOM

## Instalacion

```bash
# Clonar el repositorio
git clone <url-del-repositorio>

# Instalar dependencias
npm install
```

## Uso

```bash
npm start
```

El scraper generara un archivo JSON con los datos extraidos en `src/docs/degree-response.json`.

## Estructura del Proyecto

```
web-scraping/
├── src/
│   ├── index.ts                    # Punto de entrada principal
│   ├── interfaces/
│   │   ├── degree-program.ts       # Interfaz para programas academicos
│   │   ├── degree-program-response.ts  # Interfaz de respuesta
│   │   └── scrap-options.ts        # Opciones de configuracion
│   ├── plugins/
│   │   └── cheerio.ts              # Implementacion del scraper
│   └── docs/
│       └── degree-response.json    # Archivo de salida
├── package.json
└── tsconfig.json
```

## Interfaces

### DegreeProgram

```typescript
interface DegreeProgram {
  title: string;              // Nombre del programa
  description: string;        // Descripcion del programa
  degreeLink: string;         // Enlace a la pagina
  refImg: string;             // URL de la imagen
  aditionalInfo?: AditionalInfo[];  // Informacion adicional
}
```

### DegreeProgramResponse

```typescript
interface DegreeProgramResponse {
  records: number;            // Cantidad de programas encontrados
  careers: DegreeProgram[];   // Lista de programas
}
```

### scrapOptions

```typescript
interface scrapOptions {
  serviceUrl: string;              // URL a scrapear
  generalContainer: string;        // Selector CSS del contenedor principal
  aditionalInfoContainer: string;  // Selector CSS para info adicional
  elementToSearch: string;         // Selector CSS de elementos a extraer
}
```

## Estructura de Salida

El archivo `degree-response.json` tiene el siguiente formato:

```json
{
  "posgrado": {
    "records": 5,
    "careers": [
      {
        "title": "Maestria en Cine Documental",
        "description": "Descripcion del programa...",
        "refImg": "https://...",
        "degreeLink": "https://...",
        "aditionalInfo": [
          {
            "title": "Tipo de Programa",
            "content": "Maestria Profesional"
          }
        ]
      }
    ]
  },
  "pregrado": {
    "records": 10,
    "careers": [...]
  }
}
```

## Configuracion

Para modificar las URLs o selectores CSS, edita las opciones en `src/index.ts`:

```typescript
const pregradoOptions: scrapOptions = {
  serviceUrl: "https://www.uartes.edu.ec/sitio/la-universidad/pregrado/",
  generalContainer: ".elementor-element-0396226 .elementor-widget-container",
  aditionalInfoContainer: ".elementor-widget-wrap .elementor-element-populated .elementor-widget-container",
  elementToSearch: ".wp-block-heading"
};
```

## Licencia

ISC