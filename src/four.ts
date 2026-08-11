import { load } from "@loaders.gl/core";
import { PLYLoader } from "@loaders.gl/ply";
import { mat3, mat4, vec3, vec4, vec2 } from "gl-matrix";

export class Camera {
  private _pose: mat4;
  private _intrinsic: mat3;

  // We use distortion coefficients: k1, k2, p1, p2.
  private _dist_coeffs: vec4;

  constructor(pose: mat4);
  constructor(pose: mat4, intrinsic?: mat4, dist_coeffs?: vec4) {
    const pose_copy = mat4.create();
    this._pose = mat4.copy(pose_copy, pose);

    const intrinsic_copy = mat3.create();
    if (intrinsic) {
      mat3.copy(intrinsic_copy, intrinsic);
      this._intrinsic = intrinsic_copy;
    } else {
      mat3.identity(intrinsic_copy);
      this._intrinsic = intrinsic_copy;
    }

    const dist_coeffs_copy = vec4.create();
    if (dist_coeffs) {
      vec4.copy(dist_coeffs_copy, dist_coeffs);
      this._dist_coeffs = dist_coeffs_copy;
    } else {
      this._dist_coeffs = dist_coeffs_copy;
    }
  }

  set position([x, y, z]: vec3) {
    this._pose[12] = x;
    this._pose[13] = y;
    this._pose[14] = z;
  }

  get position() {
    const position = vec3.create();
    return mat4.getTranslation(position, this._pose);
  }

  set focal_point(focal_point: vec3) {
    vec3.subtract(focal_point, focal_point, this.position);
    const k_hat_prime = focal_point;

    // NOTE: we don't actually set focal_length. the user must set it explicitly.
    // const focal_length = vec3.length(k_hat_prime)

    const rotation_angle = vec3.angle(this.position, k_hat_prime);

    // The axis of rotation is a vector that is orthogonal to the original z and the new_z.
    const k_hat = vec3.fromValues(0, 0, 1); // Z axis
    const rotation_axis = vec3.create();
    vec3.cross(rotation_axis, k_hat, k_hat_prime);

    // The 3x3 rotation matrix can be found using a formula given an angle and an axis of rotation.
    // https://en.wikipedia.org/wiki/Rodrigues'_rotation_formula
    const this_position_copy = this.position; // make a copy before we change it...
    mat4.fromRotation(this._pose, rotation_angle, rotation_axis);
    // We must re-set the position since this created a brand new matrix.
    this.position = this_position_copy;
  }

  set focal_length([fx, fy]: vec2) {
    this._intrinsic[0] = fx;
    this._intrinsic[4] = fy;
  }

  set dist_coeffs(dist_coeffs: vec4) {
    const dist_coeffs_copy = vec4.create();
    this._dist_coeffs = vec4.copy(dist_coeffs_copy, dist_coeffs);
  }
}

export class Actor {
  pose: mat4;
  mapper: Mapper;

  constructor(mapper: Mapper) {
    this.pose = mat4.create();
    this.mapper = mapper;
  }
}

export class Renderer {
  gl: WebGLRenderingContext;
  camera: Camera;
  actors: Array<Actor>;

  constructor(gl: WebGLRenderingContext, camera: Camera) {
    this.gl = gl;
    this.camera = camera;
    this.actors = [];
  }

  render() {}
}

export abstract class Mapper {}

export abstract class PolyDataMapper extends Mapper {
  plyPath: string;
  // vertices: Array<number>
  // indices: Array<number>

  constructor(plyPath: string) {
    super();
    this.plyPath = plyPath;
  }

  async loadPlyBuffer(url: string) {
    const data = await load(url, PLYLoader);
    const vertices = data.attributes.POSITION.value as Float32Array;

    let indices = data.indices?.value;

    // Force 16-bit array
    if (indices instanceof Uint32Array) {
      indices = new Uint16Array(indices);
    }

    if (!indices) {
      throw Error(`Failed to load indices from ply.`);
    }

    return { vertices, indices };
  }
}
