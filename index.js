const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de seguridad
app.use(helmet());
app.use(cors());
app.use(express.json());

// Middleware para logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Endpoint para recibir webhooks de SimpliRoute
app.post('/api/webhooks/simpliroute', (req, res) => {
    try {
        const webhookData = req.body;
        
        // Log del webhook recibido
        console.log('Webhook recibido de SimpliRoute:', {
            timestamp: new Date().toISOString(),
            data: webhookData
        });

        // Procesar diferentes tipos de eventos
        switch (webhookData.event_type) {
            case 'visit.created':
                console.log('Nueva visita creada:', webhookData.visit_id);
                // Aquí procesarías la creación de visita
                break;
                
            case 'visit.updated':
                console.log('Visita actualizada:', webhookData.visit_id);
                // Aquí procesarías la actualización
                break;
                
            case 'visit.checkout':
                console.log('Visita en checkout:', webhookData.visit_id);
                // Aquí procesarías el checkout
                break;
                
            case 'route.started':
                console.log('Ruta iniciada:', webhookData.route_id);
                // Aquí procesarías el inicio de ruta
                break;
                
            case 'route.finished':
                console.log('Ruta finalizada:', webhookData.route_id);
                // Aquí procesarías la finalización
                break;
                
            default:
                console.log('Evento no manejado:', webhookData.event_type);
        }

        // Responder exitosamente
        res.status(200).json({
            success: true,
            message: 'Webhook procesado correctamente',
            timestamp: new Date().toISOString(),
            event_type: webhookData.event_type
        });

    } catch (error) {
        console.error('Error procesando webhook:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
});

// Endpoint de health check
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        service: 'SimpliRoute Webhook Endpoint',
        version: '1.0.0'
    });
});

// Endpoint para probar el webhook
app.post('/test-webhook', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Endpoint de prueba funcionando',
        received_data: req.body,
        timestamp: new Date().toISOString()
    });
});

// Endpoint raíz
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'SimpliRoute Webhook Endpoint',
        version: '1.0.0',
        endpoints: {
            webhook: '/api/webhooks/simpliroute',
            health: '/health',
            test: '/test-webhook'
        },
        documentation: 'https://github.com/tu-usuario/simpliroute-webhook'
    });
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint no encontrado',
        available_endpoints: [
            'GET /',
            'GET /health',
            'POST /api/webhooks/simpliroute',
            'POST /test-webhook'
        ]
    });
});

// Manejo global de errores
app.use((error, req, res, next) => {
    console.error('Error no manejado:', error);
    res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno'
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor webhook ejecutándose en puerto ${PORT}`);
    console.log(`�� Endpoint principal: http://localhost:${PORT}/api/webhooks/simpliroute`);
    console.log(`�� Health check: http://localhost:${PORT}/health`);
    console.log(`🧪 Test endpoint: http://localhost:${PORT}/test-webhook`);
    console.log(`📖 Documentación: http://localhost:${PORT}/`);
});