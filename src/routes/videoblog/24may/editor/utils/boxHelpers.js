// returns the full canvas box
export function full(design) { 
    return { x: 0, y: 0, width: design.w, height: design.h }; 
  }
  // returns the i-th column of n
  export function col(i, n, design) { 
    const w = design.w / n;
    return { x: i * w, y: 0, width: w, height: design.h };
  }
  