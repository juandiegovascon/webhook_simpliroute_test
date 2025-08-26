# SimpliRoute Webhook Endpoint

Endpoint webhook para recibir notificaciones en tiempo real de SimpliRoute y automatizar la gestión de visitas para Liverpulpi.

## �� Características

- ✅ Endpoint webhook para SimpliRoute
- ✅ Procesamiento de eventos en tiempo real
- ✅ Logging completo de todas las operaciones
- ✅ Endpoints de health check y testing
- ✅ Middleware de seguridad con Helmet
- ✅ CORS habilitado para integraciones
- ✅ Manejo robusto de errores

## �� Requisitos

- Node.js >= 16.0.0
- npm o yarn

## 🛠️ Instalación

1. **Clonar el repositorio:**
```bash
git clone https://github.com/tu-usuario/simpliroute-webhook.git
cd simpliroute-webhook
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Configurar variables de entorno:**
```bash
cp .env.example .env
# Editar .env con tus configuraciones
```

4. **Ejecutar en desarrollo:**
```bash
npm run dev
```

5. **Ejecutar en producción:**
```bash
npm start
```

## 🌐 Endpoints Disponibles

### **POST /api/webhooks/simpliroute**
Recibe webhooks de SimpliRoute con actualizaciones de visitas.

**Eventos soportados:**
- `visit.created` - Nueva visita creada
- `visit.updated` - Visita actualizada
- `visit.checkout` - Visita en checkout
- `route.started` - Ruta iniciada
- `route.finished` - Ruta finalizada

### **GET /health**
Health check del servicio.

### **POST /test-webhook**
Endpoint de prueba para verificar funcionamiento.

### **GET /**
Información del servicio y endpoints disponibles.

## �� Configuración

### Variables de Entorno

| Variable | Descripción | Valor por Defecto |
|----------|-------------|-------------------|
| `PORT` | Puerto del servidor | `3000` |
| `NODE_ENV` | Entorno de ejecución | `development` |

## 📱 Uso con SimpliRoute

1. **Configurar webhook en SimpliRoute:**
```json
{
  "url": "https://tu-dominio.railway.app/api/webhooks/simpliroute",
  "events": [
    "visit.created",
    "visit.updated",
    "visit.checkout",
    "route.started",
    "route.finished"
  ]
}
```

2. **Probar el endpoint:**
```bash
curl -X POST https://tu-dominio.railway.app/test-webhook \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```

## 🚀 Despliegue en Railway

1. **Conectar repositorio de GitHub**
2. **Railway detectará automáticamente el proyecto Node.js**
3. **Configurar variables de entorno si es necesario**
4. **El servicio se desplegará automáticamente**

## �� Monitoreo

- **Logs en tiempo real** en Railway
- **Health check endpoint** para monitoreo
- **Métricas automáticas** de Railway

## 🔒 Seguridad

- Helmet para headers de seguridad
- CORS configurado
- Validación de entrada
- Logging de todas las operaciones

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 📞 Soporte

Para soporte técnico, contacta al equipo de Liverpulpi o abre un issue en este repositorio.

## �� Changelog

### v1.0.0
- ✅ Endpoint webhook básico
- ✅ Procesamiento de eventos SimpliRoute
- ✅ Health check y testing
- ✅ Despliegue en Railway