class Sphere {
  constructor(r, res) {
    this.radius = r;
    this.resolution = res;
    this.globe = [];
  }
}

Sphere.prototype.compute = function(r = this.radius) {
  for (let i = 0; i <= this.resolution; i++) {
    this.globe[i] = [];
    const lat = map(i, 0, this.resolution, 0, PI);
    for (let j = 0; j <= this.resolution; j++) {
      const lon = map(j, 0, this.resolution, 0, TWO_PI);
      const x = r * sin(lat) * cos(lon);
      const y = r * sin(lat) * sin(lon);
      const z = r * cos(lat);
      this.globe[i][j] = createVector(x, y, z);
    }
  }
};

Sphere.prototype.draw = function() {
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
