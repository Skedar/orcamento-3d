import json
import numpy as np
from stl import mesh
import base64
import io

def lambda_handler(event, context):
    try:
        # Decodifica o arquivo STL do base64
        stl_base64 = event.get('stl_file')
        stl_binary = base64.b64decode(stl_base64)
        
        # Carrega o STL usando numpy-stl
        stl_file = io.BytesIO(stl_binary)
        mesh_data = mesh.Mesh.from_file(stl_file)
        
        # Calcula volume
        volume = mesh_data.get_mass_properties()[0]
        
        # Calcula dimensões
        minx = mesh_data.x.min()
        maxx = mesh_data.x.max()
        miny = mesh_data.y.min()
        maxy = mesh_data.y.max()
        minz = mesh_data.z.min()
        maxz = mesh_data.z.max()
        
        dimensions = {
            'x': maxx - minx,
            'y': maxy - miny,
            'z': maxz - minz
        }
        
        return {
            'statusCode': 200,
            'body': json.dumps({
                'volume': float(volume),
                'dimensions': dimensions,
                'unit': 'mm³'
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({
                'error': str(e)
            })
        }
