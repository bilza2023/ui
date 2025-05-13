export function scaleItem(item, scaleX, scaleY) {
  const scaled = { ...item };

  if (item.x !== undefined) scaled.x = item.x * scaleX;
  if (item.y !== undefined) scaled.y = item.y * scaleY;
  if (item.width !== undefined) scaled.width = item.width * scaleX;
  if (item.height !== undefined) scaled.height = item.height * scaleY;
  if (item.radius !== undefined) scaled.radius = item.radius * ((scaleX + scaleY) / 2);

  return scaled;
}
