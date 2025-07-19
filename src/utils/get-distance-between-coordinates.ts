export interface Coordinates {
    latitude: number;
    longitude: number;
}

export function getDistanceBetweenCoordinates(
    from: Coordinates,
    to: Coordinates
) {
    const R = 6371e3; // Raio da Terra em metros
    const φ1 = from.latitude * Math.PI / 180; // φ em radianos
    const φ2 = to.latitude * Math.PI / 180; // φ em radianos
    const Δφ = (to.latitude - from.latitude) * Math.PI / 180; // Δφ em radianos
    const Δλ = (to.longitude - from.longitude) * Math.PI / 180; // Δλ em radianos

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distância em metros
}