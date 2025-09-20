# API de Datos del Mercado de Valores

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

Una **API de Datos del Mercado de Valores** construida con **NestJS** y principios de **Arquitectura Limpia**. Esta aplicación obtiene datos del mercado de valores desde la API de AlphaVantage con un diseño modular y extensible.

## 🚀 Características

- Obtención de datos de acciones (intradiario, diario, semanal, mensual)
- Implementación de Arquitectura Limpia
- Diseño modular y extensible
- TypeScript para seguridad de tipos
- Endpoints de API RESTful

## 🏗️ Arquitectura Limpia

Este proyecto implementa **Arquitectura Limpia** con clara separación de capas:

### Estructura de Capas
```
┌─────────────────────────────────────────┐
│         Controllers (HTTP)              │  ← Infraestructura
├─────────────────────────────────────────┤
│         Ports (Interfaces)              │  ← Aplicación  
├─────────────────────────────────────────┤
│         Entities (Domain)               │  ← Dominio
├─────────────────────────────────────────┤
│         Adapters (External APIs)        │  ← Infraestructura
└─────────────────────────────────────────┘
```

### Componentes Clave

**Capa de Dominio** (`/domain`): Entidades principales del negocio
```typescript
export interface StockAction {
  id: string;
  symbol: string;
  date: Date;
  open: number;
  high: number;
  low: number;
  close: number;
}
```

**Capa de Aplicación** (`/application`): Ports (contratos)
```typescript
export abstract class StockActionsFetcherPort {
  abstract fetchDailyActions(symbol: string): Promise<StockAction[]>;
  // ... otros métodos
}
```

**Capa de Infraestructura** (`/infrastructure`): Adaptadores y controladores
- `AlphaVantageAdapter`: Implementa la obtención de datos
- `StockActionsController`: Endpoints HTTP

## 📁 Estructura del Proyecto

```
src/
├── main.ts                     # Punto de entrada de la aplicación
├── app/                        # Módulo raíz
└── actions/                    # Módulo de Dominio de Acciones
    ├── application/            # Capa de Aplicación
    │   ├── errors/            # Errores personalizados
    │   └── ports/             # Interfaces (contratos)
    ├── domain/                # Capa de Dominio
    │   └── entities/          # Entidades del negocio
    ├── infrastructure/        # Capa de Infraestructura
    │   ├── adapters/          # Implementaciones de servicios externos
    │   └── http/              # Controladores
    └── module/                # Configuración de inyección de dependencias
```

## 🔧 Diseño Modular

### Inyección de Dependencias
```typescript
@Module({
  providers: [
    { useClass: FetchAdapter, provide: HttpPort },
    { useClass: AlphaVantageAdapter, provide: StockActionsFetcherPort },
  ],
  controllers: [StockActionsRestController],
})
export class StockActionsModule {}
```

### Beneficios
- **Bajo acoplamiento**: Los componentes dependen de interfaces
- **Fácil testing**: Implementaciones simuladas (mock)
- **Extensible**: Agregar nuevas fuentes de datos fácilmente

## 📚 Endpoints de la API

| Endpoint | Descripción |
|----------|-------------|
| `GET /actions/{symbol}/intraday` | Obtener datos intradiarios de acciones |
| `GET /actions/{symbol}/daily` | Obtener datos diarios de acciones |
| `GET /actions/{symbol}/weekly` | Obtener datos semanales de acciones |
| `GET /actions/{symbol}/monthly` | Obtener datos mensuales de acciones |

### Ejemplo
```bash
GET /actions/AAPL/daily
```

## 🚀 Comenzando

### Instalación
```bash
npm install
```

### Ejecución
```bash
# Desarrollo
npm run start:dev

# Producción
npm run start:prod
```

### Configuración
- Actualizar la clave API en `alphavantage.adapter.ts`
- Reemplazar `'demo'` con tu clave API de AlphaVantage

## 🛠️ Stack Tecnológico

- **NestJS**: Framework de Node.js
- **TypeScript**: Seguridad de tipos
- **Biome**: Formateo de código y linting
- **API AlphaVantage**: Fuente de datos del mercado de valores
- **Arquitectura Limpia**: Patrón de diseño

## 🔌 Extensibilidad

### Agregando Nuevas Fuentes de Datos
1. Crear nuevo adaptador implementando `StockActionsFetcherPort`
2. Registrar en el módulo:
```typescript
@Module({
  providers: [
    { useClass: YahooFinanceAdapter, provide: StockActionsFetcherPort },
  ],
})
```

### ¿Por qué Esta Arquitectura?
- **Testeable**: Fácil de simular dependencias
- **Mantenible**: Clara separación de responsabilidades  
- **Extensible**: Agregar características sin romper el código existente
- **Flexible**: Intercambiar implementaciones fácilmente

