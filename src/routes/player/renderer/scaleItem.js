/**
 * Obsolete – kept temporarily for backward compatibility.
 * All new code should import mapSlideItems() from `layoutConfig.js`.
 */
export function scaleItem(item, scaleX, scaleY, offsetX = 0, offsetY = 0) {
  const scaled = { ...item };

  if (item.x      !== undefined) scaled.x      = item.x      * scaleX + offsetX;
  if (item.y      !== undefined) scaled.y      = item.y      * scaleY + offsetY;
  if (item.width  !== undefined) scaled.width  = item.width  * scaleX;
  if (item.height !== undefined) scaled.height = item.height * scaleY;
  if (item.radius !== undefined)
    scaled.radius = item.radius * ((scaleX + scaleY) / 2);

  return scaled;
}
