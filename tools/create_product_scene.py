"""Create a lightweight geometric NEXUS·01 demo and export it as GLB.

Run with:
    blender --background --python tools/create_product_scene.py
"""

from pathlib import Path
import math
import bpy


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "premium" / "public" / "models" / "nexus-01-demo.glb"


def material(name, base_color, metallic=0.0, roughness=0.45, emission=None):
    mat = bpy.data.materials.new(name)
    mat.diffuse_color = (*base_color, 1.0)
    mat.use_nodes = True
    node = mat.node_tree.nodes.get("Principled BSDF")
    node.inputs["Base Color"].default_value = (*base_color, 1.0)
    node.inputs["Metallic"].default_value = metallic
    node.inputs["Roughness"].default_value = roughness
    if emission:
        node.inputs["Emission Color"].default_value = (*emission, 1.0)
        node.inputs["Emission Strength"].default_value = 3.0
    return mat


def add_cube(name, location, scale, mat, bevel=0.08):
    bpy.ops.mesh.primitive_cube_add(location=location)
    obj = bpy.context.active_object
    obj.name = name
    obj.scale = scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    modifier = obj.modifiers.new("Soft edges", "BEVEL")
    modifier.width = bevel
    modifier.segments = 3
    obj.data.materials.append(mat)
    return obj


def add_cylinder(name, location, radius, depth, mat, vertices=48):
    bpy.ops.mesh.primitive_cylinder_add(vertices=vertices, radius=radius, depth=depth, location=location)
    obj = bpy.context.active_object
    obj.name = name
    obj.data.materials.append(mat)
    bevel = obj.modifiers.new("Machined edge", "BEVEL")
    bevel.width = 0.035
    bevel.segments = 2
    return obj


def build_scene():
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)

    graphite = material("Graphite", (0.055, 0.06, 0.055), metallic=0.9, roughness=0.25)
    metal = material("Brushed metal", (0.24, 0.25, 0.23), metallic=1.0, roughness=0.2)
    glass = material("Smoked core", (0.08, 0.055, 0.035), metallic=0.15, roughness=0.12)
    amber = material("Amber status", (0.8, 0.22, 0.025), metallic=0.1, roughness=0.2, emission=(1.0, 0.18, 0.02))

    add_cube("Base", (0, 0, 0.14), (1.55, 1.25, 0.14), graphite, 0.16)
    add_cube("Base trim", (0, 0, 0.33), (1.37, 1.08, 0.10), metal, 0.12)
    add_cylinder("Glass core", (0, 0, 1.22), 1.20, 1.78, glass)
    add_cylinder("Top ring", (0, 0, 2.15), 1.34, 0.28, metal)
    add_cylinder("Inner core", (0, 0, 1.22), 0.68, 1.46, graphite)

    for x, y in ((-1.16, -0.86), (1.16, -0.86), (-1.16, 0.86), (1.16, 0.86)):
        add_cube("Frame post", (x, y, 1.22), (0.09, 0.09, 1.12), metal, 0.06)

    status = add_cube("Status light", (0, -1.235, 0.88), (0.30, 0.035, 0.065), amber, 0.045)
    status.rotation_euler[0] = math.radians(90)

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    bpy.ops.wm.save_as_mainfile(filepath=str(OUTPUT.with_suffix(".blend")))
    bpy.ops.export_scene.gltf(
        filepath=str(OUTPUT),
        export_format="GLB",
        use_selection=False,
        export_apply=True,
        export_draco_mesh_compression_enable=True,
        export_draco_mesh_compression_level=6,
    )
    print(f"Exported {OUTPUT}")


if __name__ == "__main__":
    build_scene()
