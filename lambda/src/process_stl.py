import json
import numpy as np
from stl import mesh
import boto3
import os
import tempfile

def calculate_volume(stl_file):
    mesh_data = mesh.Mesh.from_file(stl_file)
    volume = mesh_data.get_mass_properties()[0]
    
    minx = maxx = miny = maxy = minz = maxz = None
    for p in mesh_data.points:
        for i in range(0, 9, 3):
            x = p[i]
            y = p[i+1]
            z = p[i+2]
            
            if minx is None:
                minx = maxx = x
                miny = maxy = y
                minz = maxz = z
            else:
                maxx = max(x, maxx)
                minx = min(x, minx)
                maxy = max(y, maxy)
                miny = min(y, miny)
                maxz = max(z, maxz)
                minz = min(z, minz)
    
    dimensions = {
        'x': maxx - minx,
        'y': maxy - miny,
        'z': maxz - minz
    }
    
    return volume, dimensions

def lambda_handler(event, context):
    try:
        if 'file' in event:
            with tempfile.NamedTemporaryFile(suffix='.stl', delete=False) as tmp_file:
                tmp_file.write(event['file'])
                tmp_file_path = tmp_file.name
            
            volume, dimensions = calculate_volume(tmp_file_path)
            os.unlink(tmp_file_path)
            
            return {
                'statusCode': 200,
                'body': json.dumps({
                    'volume': volume,
                    'dimensions': dimensions,
                    'unit': 'mm'
                })
            }
            
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({
                'error': str(e)
            })
        }
