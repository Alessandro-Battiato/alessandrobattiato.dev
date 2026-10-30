let cached: boolean | null = null;

/** Whether the browser can create a WebGL context (false when disabled or unsupported). */
export function isWebGLAvailable(): boolean {
  if (cached === null) {
    try {
      const canvas = document.createElement("canvas");
      cached = Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
    } catch {
      cached = false;
    }
  }
  return cached;
}
