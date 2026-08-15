import { load } from "@loaders.gl/core";
import { PLYLoader } from "@loaders.gl/ply";
import { mat3, mat4, vec3, vec4, vec2 } from "gl-matrix";

abstract class ThreeDObject {
  protected _pose: mat4;

  constructor(pose: mat4) {
    this._pose = mat4.copy(mat4.create(), pose);
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
}

export class Camera extends ThreeDObject {
  private _intrinsic: mat3;

  // We use distortion coefficients: k1, k2, p1, p2.
  private _dist_coeffs: vec4;

  public screen_dimensions: [number, number]

  public near_plane: number
  public far_plane: number

  constructor(pose: mat4, screen_dimensions: [number, number], near_plane: number, far_plane: number, intrinsic?: mat4, dist_coeffs?: vec4) {
    super(pose);

    this._intrinsic = intrinsic?mat3.copy(mat3.create(), intrinsic):mat3.identity(mat3.create());

    this._dist_coeffs = dist_coeffs?vec4.copy(vec4.create(), dist_coeffs):this._dist_coeffs = vec4.create();
      
    this.screen_dimensions = screen_dimensions;

    this.near_plane = near_plane;
    this.far_plane = far_plane;
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
    this._dist_coeffs = vec4.copy(vec4.create(), dist_coeffs);
  }

  get WCDCMatrix(): mat4 {
    // Projection matrix / extrinsic matrix
    const WCVCMatrix = mat4.invert(mat4.create(), this._pose);
    if (WCVCMatrix == null) {
      console.error("WCVCMatrix is null :( => pose not invertible.")
      return mat4.create()
    }

    // Perspective matrix
    const fx = this._intrinsic[0]
    const fy = this._intrinsic[4]
    const cx = this._intrinsic[6]
    const cy = this._intrinsic[7]
    const A = this.near_plane + this.far_plane
    const B = this.near_plane * this.far_plane
    const PerspectiveMatrix = mat4.fromValues(
      fx, 0, -cx, 0,
      0, fy, -cy, 0,
      0,  0,   A, B,
      0,  0,  -1, 0
    )

    // Transform to NDC
    const [W, H] = this.screen_dimensions
    const left = -W/2
    const right = W/2
    const bottom = -H/2
    const top = H/2

    const tx = -(right+left)/(right-left);
    const ty = -(top+bottom)/(top-bottom);
    const tz = -(this.far_plane+this.near_plane)/(this.far_plane-this.near_plane);

    const NDCMatrix = mat4.fromValues(
      2/(right-left), 0, 0, tx,
      0, 2/(top-bottom), 0, ty,
      0, 0, -2/(this.far_plane-this.near_plane), tz,
      0, 0, 0, 1
    )

    // Proj matrix
    const VCDCMatrix = mat4.multiply(mat4.create(), NDCMatrix, PerspectiveMatrix);

    const WCDCMatrix = mat4.multiply(mat4.create(), VCDCMatrix, WCVCMatrix)

    return WCDCMatrix;
  }

  setup(gl: WebGLRenderingContext): boolean {
    // This functions job is to create any uniforms that will be needed to render...
    return true;
  }

  render(gl: WebGLRenderingContext) {
    // Check whether the object's state was changed, and set/update uniforms if needed.
    return true;
  }
}

export class Actor extends ThreeDObject {
  mapper: Mapper;
  shaderProgram: ShaderProgram

  constructor(pose: mat4, mapper: Mapper, shaderProgram: ShaderProgram) {
    super(pose);
    this.mapper = mapper;
    this.shaderProgram = shaderProgram;
  }

  setup(gl: WebGLRenderingContext): boolean {
    // Call shader program setup.
    this.shaderProgram.setup(gl)
    // Call mapper setup.
    this.mapper.setup(gl)
    return true;
  }

  render(gl: WebGLRenderingContext, WCDCMatrix: mat4) {
    // update the uniforms


    // We draw teh triangles to the context.
    return true;
  }
}

export class Renderer {
  gl: WebGLRenderingContext;
  camera: Camera;
  actors: Set<Actor>;

  constructor(gl: WebGLRenderingContext, camera: Camera) {
    this.gl = gl;
    this.camera = camera;
    this.actors = new Set();
  }

  setup() {
    this.gl.getExtension("OES_standard_derivatives");
    this.gl.enable(this.gl.DEPTH_TEST);

    this.camera.setup(this.gl);
    this.actors.forEach(actor => actor.setup(this.gl));
  }

  render() {
    const WCDCMatrix = this.camera.WCDCMatrix;

    this.actors.forEach(actor => actor.render(this.gl, WCDCMatrix));

  }
}

export class PolyDataMapper {
  vertices: Array<number>;
  indices: Array<number>;

  constructor(vertices: Array<number>, indices: Array<number>) {
    this.vertices = vertices;
    this.indices = indices;
  }

  setup(gl: WebGLRenderingContext) {

  }

}

class ShaderProgram {
  fragmentSource: string
  vertexSource: string

  constructor() {
    this.fragmentSource = `

`

    this.vertexSource = `

`
  }

  setup(gl: WebGLRenderingContext) {
    // create shaders
    // create program
    // extract uniforms
  }

}
