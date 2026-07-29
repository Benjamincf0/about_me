import { useEffect, useRef, useState } from "react";
import "#styles/hero.css";
import { load } from "@loaders.gl/core";
import { PLYLoader } from "@loaders.gl/ply";
const plyData = await loadPlyBuffer("./bunny.ply");

const vertexShaderSource = `
  attribute vec3 a_position;
 
  void main() {
    gl_Position = vec4(a_position*5.0 - vec3(0, 0.3, 0), 1.0);
  }
`;

const fragmentShaderSource = `
  // fragment shaders don't have a default precision so we need
  // to pick one. mediump is a good default
  precision mediump float;

  uniform vec2 u_resolutionF;
 
  void main() {
    // gl_FragColor is a special variable a fragment shader
    // is responsible for setting
    vec2 st = gl_FragCoord.xy/u_resolutionF.xy;

    vec2 diff = st - vec2(0.5);
    float d_squared = dot(diff, diff);
    float r = 0.2;

    vec2 color = (1.-step(r*r, d_squared))*st;
    
    gl_FragColor = vec4(st, 0, 1); // return reddish-purple
  }
`;

type WebGLShaderType =
  | typeof WebGLRenderingContext.FRAGMENT_SHADER
  | typeof WebGLRenderingContext.VERTEX_SHADER;

function createShader(
  gl: WebGLRenderingContext,
  type: WebGLShaderType,
  source: string,
): WebGLShader | undefined {
  var shader = gl.createShader(type);
  if (!shader) {
    throw new Error("Something aint right");
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

function createProgram(
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader,
) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  } else {
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
  }
}

function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement) {
  // Lookup the size the browser is displaying the canvas in CSS pixels.
  const displayWidth = canvas.clientWidth;
  const displayHeight = canvas.clientHeight;

  // Check if the canvas is not the same size.
  const needResize =
    canvas.width !== displayWidth || canvas.height !== displayHeight;

  if (needResize) {
    // Make the canvas the same size
    canvas.width = displayWidth;
    canvas.height = displayHeight;
  }

  return needResize;
}

async function loadPlyBuffer(url: string) {
  const data = await load(url, PLYLoader);
  const vertices = data.attributes.POSITION.value as Float32Array;
  
  let indices = data.indices?.value;
  
  // Force 16-bit array
  if (indices instanceof Uint32Array) {
    indices = new Uint16Array(indices);
  }

  return { vertices, indices };
}

interface WebGLUniforms {
  [key: string]: WebGLUniformLocation;
}

function drawScene(
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  uniforms: WebGLUniforms,
) {
  if (gl.canvas instanceof OffscreenCanvas) return;
  resizeCanvasToDisplaySize(gl.canvas);

  // Tell WebGL how to convert from clip space to pixels
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  // Clear the canvas.
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Tell it to use our program (pair of shaders)
  gl.useProgram(program);

  // Turn on the attribute
  // gl.enableVertexAttribArray(positionAttributeLocation);

  // Bind the position buffer.
  // gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
  // var size = 2; // 2 components per iteration
  // var type = gl.FLOAT; // the data is 32bit floats
  // var normalize = false; // don't normalize the data
  // var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
  // var offset = 0; // start at the beginning of the buffer
  // gl.vertexAttribPointer(
  //   positionAttributeLocation,
  //   size,
  //   type,
  //   normalize,
  //   stride,
  //   offset,
  // );

  // Compute the matrix
  // var matrix = m3.projection(gl.canvas.clientWidth, gl.canvas.clientHeight);
  // matrix = m3.translate(matrix, translation[0], translation[1]);
  // matrix = m3.rotate(matrix, angleInRadians);
  // matrix = m3.scale(matrix, scale[0], scale[1]);

  // Set the matrix.
  // gl.uniformMatrix3fv(matrixLocation, false, matrix);

  // set the resolution
  // gl.uniform2f(
  //   uniforms.resolutionUniformLocation,
  //   gl.canvas.width,
  //   gl.canvas.height,
  // );
  gl.uniform2f(
    uniforms.resolutionFUniformLocation,
    gl.canvas.width,
    gl.canvas.height,
  );

  // Draw the geometry.
  var primitiveType = gl.TRIANGLES;
  var offset = 0;
  var count = 6;
  gl.drawArrays(primitiveType, offset, count);
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasContext, setCanvasContext] = useState<string>("");

  // This function runs after the component renders.
  // It initializes our webgl context, shader program, and positionBuffer.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;
    else {
      setCanvasContext("webgl");
    }
    if (gl.canvas instanceof OffscreenCanvas) return;

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentShaderSource,
    );

    if (!vertexShader || !fragmentShader) {
      throw new Error("Failed to create shader :(");
    }

    const program = createProgram(gl, vertexShader, fragmentShader);

    if (!program) {
      throw new Error("Failed to create program :(");
    }

    // We get the location of our vertex shader attribute.
    const positionAttributeLocation = gl.getAttribLocation(
      program,
      "a_position",
    );

    const positionBuffer = gl.createBuffer();
    const indexBuffer = gl.createBuffer();

    // This binds my positionBuffer to the gl.ARRAY_BUFFER bind point.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)

    // three 2d points
    // var positions = [-1, -1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1];
    // Load ply
    const positions = plyData.vertices
    const indices = plyData.indices
    console.log(plyData);
    if (!indices) return;

    // Now we create a strongly typed array, and copy it to the GPU on the gl.ARRAY_BUFFER bind point.
    // gl.STATIC_DRAW is a hint to webgl that we won't change this buffer often, so it can optimize things.
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    // const resolutionUniformLocation = gl.getUniformLocation(
    //   program,
    //   "u_resolution",
    // );
    const resolutionFUniformLocation = gl.getUniformLocation(
      program,
      "u_resolutionF",
    );
    if (!resolutionFUniformLocation) return;

    // RENDERING ...

    // This makes sure the canvas pixels match the css pixel dimensions.
    resizeCanvasToDisplaySize(gl.canvas);

    // Here we're telling webgl what's our canvas dimensions so that it can convert from clip -> screen space.
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear the canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Tell it to use our program (pair of shaders)
    gl.useProgram(program);

    // Next we tell webgl how to take our position buffer and supply it as the attribute to our vertex shader.

    // Turn on the vertex shader attribute array?
    gl.enableVertexAttribArray(positionAttributeLocation);

    // Bind the position buffer. again???
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 3; // 2 components per iteration
    var type = gl.FLOAT; // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0; // start at the beginning of the buffer
    gl.vertexAttribPointer(
      positionAttributeLocation,
      size,
      type,
      normalize,
      stride,
      offset,
    );

    // set the resolution
    // gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
    gl.uniform2f(resolutionFUniformLocation, gl.canvas.width, gl.canvas.height);

    // Now we tell it to execute finally 😅
    const primitiveType = gl.TRIANGLES;
    offset = 0;
    const count = indices.length;
    const indexType = gl.UNSIGNED_SHORT;
    gl.drawElements(primitiveType, count, indexType, offset);
    console.log("rendered")

    // Create the observer
    // const observer = new ResizeObserver(() =>
    //   drawScene(gl, program, {
    //     resolutionFUniformLocation,
    //   }),
    // );
    // observer.observe(canvas);
  }, []); // Only runs once since we pass [] as depsList

  return (
    <div id="hero">
      <div className="infoTag">
        <p>Using {canvasContext ? canvasContext : "nothing"}</p>
      </div>
      <canvas ref={canvasRef} id="myCanvas" />
    </div>
  );
}
