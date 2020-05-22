class SuperShape extends Sphere {
  constructor(r, res) {
    super(r, res);
  }
}

SuperShape.prototype.R = function(theta, n1, n2, n3, m, a, b) {
  let t1 = pow(abs((1.0 / a) * cos(m * theta / 4.0)), n2);
  let t2 = pow(abs((1.0 / b) * sin(m * theta / 4.0)), n3);
  let t3 = pow((t1 + t2), (-1.0 / n1));
  return t3;
};

SuperShape.prototype.compute = function(n11, n21, n31, m1, n12, n22, n32, m2, a = 1, b = 1) {
  for (let i = 0; i <= this.resolution; i++) {
    this.globe[i] = [];
    const lat = map(i, 0, this.resolution, -HALF_PI, HALF_PI);
    let r2 = this.R(lat, n12, n22, n32, m2, a, b);
    for (let j = 0; j <= this.resolution; j++) {
      const lon = map(j, 0, this.resolution, -PI, PI);
      let r1 = this.R(lon, n11, n21, n31, m1, a, b);
      const x = this.radius * r1 * cos(lon) * r2 * cos(lat);
      const y = this.radius * r1 * sin(lon) * r2 * cos(lat);
      const z = this.radius * r2 * sin(lat);
      this.globe[i][j] = createVector(x, y, z);
    }
  }
};

SuperShape.prototype.draw = function() {
  push();
  ambientLight(60, 60, 60);
  pointLight(255, 255, 255, width / 2, height / 2, 200);
  pointLight(255, 255, 255, -width /2, -height / 2, -200);
  pointLight(255, 255, 255, width / 2, -height / 2, 200);
  pointLight(255, 255, 255, -width / 2, height / 2, -200);
  stroke(strokeCP.value());
  ambientMaterial(figureCP.value());
  for (let i = 0; i < this.resolution; i++) {
    beginShape(TRIANGLE_STRIP);
    for (let j = 0; j <= this.resolution; j++) {
      const v1 = this.globe[i][j];
      vertex(v1.x, v1.y, v1.z);
      const v2 = this.globe[i + 1][j];
      vertex(v2.x, v2.y, v2.z);
    }
    endShape();
  }
  pop();
};
