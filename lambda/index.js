const STLParser = require('stl-parser');

exports.handler = async (event) => {
    try {
        // Configuração de CORS
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        };
        
        // Parse do corpo da requisição
        const body = JSON.parse(event.body);
        const fileContent = Buffer.from(body.fileContent, 'base64');
        
        // Processamento do arquivo STL
        const parser = new STLParser();
        const stlData = parser.parse(fileContent);
        
        // Cálculo das dimensões e volume
        const { dimensions, volume } = calculateMetrics(stlData);
        
        // Estimativa de tempo de impressão
        const printTime = estimatePrintTime(volume);
        
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                dimensions,
                volume,
                printTime
            })
        };
    } catch (error) {
        console.error('Erro:', error);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({
                error: 'Erro ao processar arquivo STL'
            })
        };
    }
};

function calculateMetrics(stlData) {
    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;
    let minZ = Infinity, maxZ = -Infinity;
    let volume = 0;
    
    stlData.facets.forEach(facet => {
        const vertices = facet.vertices;
        
        // Cálculo das dimensões
        vertices.forEach(vertex => {
            minX = Math.min(minX, vertex.x);
            maxX = Math.max(maxX, vertex.x);
            minY = Math.min(minY, vertex.y);
            maxY = Math.max(maxY, vertex.y);
            minZ = Math.min(minZ, vertex.z);
            maxZ = Math.max(maxZ, vertex.z);
        });
        
        // Cálculo do volume
        volume += calculateFacetVolume(vertices);
    });
    
    return {
        dimensions: {
            x: maxX - minX,
            y: maxY - minY,
            z: maxZ - minZ
        },
        volume: Math.abs(volume) / 1000 // Convertendo para cm³
    };
}

function calculateFacetVolume(vertices) {
    const [v1, v2, v3] = vertices;
    return (
        (v1.x * v2.y * v3.z + v2.x * v3.y * v1.z + v3.x * v1.y * v2.z) -
        (v1.x * v3.y * v2.z + v2.x * v1.y * v3.z + v3.x * v2.y * v1.z)
    ) / 6;
}

function estimatePrintTime(volume) {
    // Estimativa básica: 1cm³ = 3 minutos de impressão
    return Math.ceil(volume * 3);
} 