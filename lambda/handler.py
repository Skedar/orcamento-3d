import struct
import base64
from io import BytesIO, StringIO

def calculate_volume_binary(stl_data):
    f = BytesIO(stl_data)
    f.seek(80)  # Skip header
    face_count = struct.unpack("<I", f.read(4))[0]
    
    volume = 0
    for i in range(face_count):
        f.seek(12, 1)  # Skip normal
        v1 = struct.unpack("<3f", f.read(12))
        v2 = struct.unpack("<3f", f.read(12))
        v3 = struct.unpack("<3f", f.read(12))
        f.seek(2, 1)  # Skip attribute
        
        volume += (
            -v3[0]*v2[1]*v1[2] + v2[0]*v3[1]*v1[2] + v3[0]*v1[1]*v2[2]
            - v1[0]*v3[1]*v2[2] - v2[0]*v1[1]*v3[2] + v1[0]*v2[1]*v3[2]
        ) / 6
    return abs(volume)

def calculate_volume_ascii(stl_string):
    vertices = []
    volume = 0
    
    for line in stl_string.split("\n"):
        if "vertex" in line:
            coords = [float(x) for x in line.split()[1:]]
            vertices.append(coords)
            if len(vertices) == 3:
                v1, v2, v3 = vertices
                volume += (
                    -v3[0]*v2[1]*v1[2] + v2[0]*v3[1]*v1[2] + v3[0]*v1[1]*v2[2]
                    - v1[0]*v3[1]*v2[2] - v2[0]*v1[1]*v3[2] + v1[0]*v2[1]*v3[2]
                ) / 6
                vertices = []
    
    return abs(volume)

def lambda_handler(event, context):
    try:
        stl_data = base64.b64decode(event["stl_file"])
        try:
            # Tenta primeiro como binário
            volume = calculate_volume_binary(stl_data)
        except:
            # Se falhar, tenta como ASCII
            stl_string = stl_data.decode("utf-8")
            volume = calculate_volume_ascii(stl_string)
        
        return {
            "statusCode": 200,
            "body": {
                "volume": volume,
                "unit": "mm³"
            }
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": {"error": str(e)}
        }
