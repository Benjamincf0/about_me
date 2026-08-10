import { load } from "@loaders.gl/core";
import { PLYLoader } from "@loaders.gl/ply";
import { mat4, vec3, vec4 } from "gl-matrix";
import { inherits } from "util";

export class Renderer {
  gl: WebGLRenderingContext
  camera: Camera

  constructor(gl: WebGLRenderingContext, camera: Camera) {
    this.gl = gl;
    this.camera = camera;
  }
}

export class Camera {
  pose: mat4
  intrinsic: mat4

  constructor(pose:mat4);
  constructor(pose: mat4, intrinsic?: mat4) {
    this.pose = pose;
    this.intrinsic = intrinsic?intrinsic:mat4.create()
  }
}

export class Actor {
  pose: mat4
  mapper: Mapper

  constructor(mapper: Mapper) {
    this.pose = mat4.create();
    this.mapper = mapper;
  }
}

export abstract class Mapper {

}

export abstract class PolyDataMapper extends Mapper {
  plyPath: string
  // vertices: Array<number>
  // indices: Array<number>

  constructor(plyPath: string) {
    super()
    this.plyPath = plyPath;
  }


  // async function loadPlyBuffer(url: string) {
  //   const data = await load(url, PLYLoader);
  //   const vertices = data.attributes.POSITION.value as Float32Array;
  //
  //   let indices = data.indices?.value;
  //
  //   // Force 16-bit array
  //   if (indices instanceof Uint32Array) {
  //     indices = new Uint16Array(indices);
  //   }
  //
  //   if (!indices) {
  //     throw Error(`Failed to load indices from ply.`);
  //   }
  //
  //   return { vertices, indices };
  // }

}
