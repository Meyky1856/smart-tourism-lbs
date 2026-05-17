import { routeNodes, routeEdges } from '../data/routeGraph.js'

export function distanceMeters(a, b) {
  const R = 6371000
  const lat1 = toRad(a.lat)
  const lat2 = toRad(b.lat)
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const sinLat = Math.sin(dLat / 2)
  const sinLng = Math.sin(dLng / 2)
  const h = sinLat * sinLat + Math.cos(lat1) * Math.cos(lat2) * sinLng * sinLng
  return 2 * R * Math.asin(Math.sqrt(h))
}

function toRad(value) {
  return value * Math.PI / 180
}

function buildAdjacency() {
  const graph = {}
  Object.keys(routeNodes).forEach((id) => { graph[id] = [] })
  routeEdges.forEach(([from, to]) => {
    const weight = distanceMeters(routeNodes[from], routeNodes[to])
    graph[from].push({ id: to, weight })
    graph[to].push({ id: from, weight })
  })
  return graph
}

export function findNearestNode(position) {
  let nearest = null
  let bestDistance = Infinity
  Object.values(routeNodes).forEach((node) => {
    const d = distanceMeters(position, node)
    if (d < bestDistance) {
      bestDistance = d
      nearest = node
    }
  })
  return nearest
}

export function calculateRoute(startNodeId, endNodeId) {
  if (!routeNodes[startNodeId] || !routeNodes[endNodeId]) return null

  const graph = buildAdjacency()
  const open = new Set([startNodeId])
  const cameFrom = {}
  const gScore = {}
  const fScore = {}

  Object.keys(routeNodes).forEach((id) => {
    gScore[id] = Infinity
    fScore[id] = Infinity
  })

  gScore[startNodeId] = 0
  fScore[startNodeId] = distanceMeters(routeNodes[startNodeId], routeNodes[endNodeId])

  while (open.size > 0) {
    const current = [...open].sort((a, b) => fScore[a] - fScore[b])[0]

    if (current === endNodeId) {
      const path = reconstructPath(cameFrom, current)
      const coordinates = path.map((id) => [routeNodes[id].lat, routeNodes[id].lng])
      return {
        path,
        coordinates,
        distance: Math.round(gScore[current]),
        nodeNames: path.map((id) => routeNodes[id].name)
      }
    }

    open.delete(current)

    graph[current].forEach((neighbor) => {
      const tentative = gScore[current] + neighbor.weight
      if (tentative < gScore[neighbor.id]) {
        cameFrom[neighbor.id] = current
        gScore[neighbor.id] = tentative
        fScore[neighbor.id] = tentative + distanceMeters(routeNodes[neighbor.id], routeNodes[endNodeId])
        open.add(neighbor.id)
      }
    })
  }

  return null
}

function reconstructPath(cameFrom, current) {
  const total = [current]
  while (cameFrom[current]) {
    current = cameFrom[current]
    total.unshift(current)
  }
  return total
}
