import struct
import base64
from io import BytesIO

def calculate_volume(stl_binary):
    try:
        # Decodifica o STL de base64
        stl_data = base64.b64decode(stl_binary)
        f = BytesIO(stl_data)
        
        # Pula o header do arquivo STL
        f.seek(80)
        
        # Lê o número de triângulos
        face_count = struct.unpack('<I', f.read(4))[0]
        
        # Calcula o volume
        volume = 0
        for i in range(face_count):
            # Pula a normal
            f.seek(12, 1)
            
            # Lê os 3 vértices do triângulo
            v1 = struct.unpack('<3f', f.read(12))
            v2 = struct.unpack('<3f', f.read(12))
            v3 = struct.unpack('<3f', f.read(12))
            
            # Pula os bytes extras
            f.seek(2, 1)
            
            # Calcula o volume do tetraedro
            volume += (
                -v3[0]*v2[1]*v1[2] + v2[0]*v3[1]*v1[2] + v3[0]*v1[1]*v2[2] 
                - v1[0]*v3[1]*v2[2] - v2[0]*v1[1]*v3[2] + v1[0]*v2[1]*v3[2]
            ) / 6
            
        return abs(volume)
        
    except Exception as e:
        raise Exception(f"Error processing STL file: {str(e)}")

def lambda_handler(event, context):
    try:
        volume = calculate_volume(event['stl_file'])
        
        return {
            'statusCode': 200,
            'body': {
                'volume': volume,
                'unit': 'mm³'
            }
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': {'error': str(e)}
        }
