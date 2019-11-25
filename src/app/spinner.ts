export const images: string[] = [];

for (let initialOpacity = 10; initialOpacity >= 0; initialOpacity--) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '100');
  svg.setAttribute('height', '100');
  svg.setAttribute('preserveAspectRatio', 'xMidYMid');
  for (let degree = 0; degree < 10; degree++) {
    const opacity = (initialOpacity + degree) % 10;
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const tx = svg.createSVGTransform();
    tx.setRotate(degree * 36, 50, 50);
    g.transform.baseVal.appendItem(tx);
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('opacity', '' + (opacity / 10));
    rect.x.baseVal.value = 47;
    rect.y.baseVal.value = 27;
    rect.rx.baseVal.value = 3;
    rect.ry.baseVal.value = 6;
    rect.width.baseVal.value = 6;
    rect.height.baseVal.value = 12;
    rect.setAttribute('fill', '#3f51b5');
    g.appendChild(rect);
    svg.appendChild(g);
  }
  images.push(URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(svg)], { type: 'image/svg+xml' })));
}

export function getSpinnerImageOnTime(miliseconds: number) {
  return images[Math.round(miliseconds / 100) % 10];
}
